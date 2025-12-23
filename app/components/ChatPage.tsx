"use client";

import { useState, useRef, useEffect } from "react";
import axios from "axios";
import { API_URL } from "../config/env";
import { useParams } from "next/navigation";
import { useGetPreviousChats, useSendMessage } from "../hooks/useChat";
import { useQueryClient } from "@tanstack/react-query";
import { FaArrowLeft } from "react-icons/fa6";
import { useRouter } from "next/navigation"
import { useDocumentStore } from "../store/documentStore";

export type Message = {
  role: "user" | "assistant";
  content: string;
};

export default function ChatPage() {
  const params = useParams()
  const id = params.id as string;
  const route = useRouter()
  const [input, setInput] = useState("");
  const { data: savedMessages = [], isLoading, isError } = useGetPreviousChats(id)
  const bottomRef = useRef<HTMLDivElement | null>(null);
  const { currentDocument } = useDocumentStore()
  const sendChatMessage = useSendMessage(id)
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [savedMessages]);

  const sendMessage = async () => {
    if (!input.trim() || sendChatMessage.isPending) return;

    setInput("");
    
    sendChatMessage.mutate(input)

  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) =>
    e.key === "Enter" && !e.shiftKey ? (e.preventDefault(), sendMessage()) : null;
  const returnToDocument = (id: string) => {
    route.push(`/documents/${id}`)
  }
  return (
    <section className="flex-1 max-h-screen h-screen">
      <div className="bg-white/10 h-18 fixed w-full shadow-sm  p-5 flex items-center">
        <button className="hover:bg-gray-300 p-2 rounded-md" onClick={() => returnToDocument(id)}><FaArrowLeft className="scale-125" /></button>
        <h1 className="text-lg font-semibold ml-4">{currentDocument?.fileName}</h1>
      </div>
      <div className="flex flex-col max-w-5xl mx-auto justify-center h-full pt-18">
        {/* Chat window */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4 ">
          {savedMessages.length > 0 ? (
            savedMessages.map((msg: Message, idx: string) => (
              <div
                key={msg.role + idx}
                className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"
                  }`}
              >
                <div
                  className={`max-w-[75%] rounded-lg px-4 py-3 text-sm whitespace-pre-wrap ${msg.role === "user"
                    ? "bg-gray-800 text-white"
                    : "bg-gray-200 text-gray-900"
                    }`}
                >
                  {msg.content}
                </div>
              </div>
            ))) : (
            <div className="text-center text-gray-500 py-12">
              <p className="text-lg">No messages yet</p>
              <p className="text-sm mt-2">Start the conversation by typing below!</p>
            </div>)}

          {sendChatMessage.isPending && (
            <div className="flex justify-start">
              <div className="bg-gray-200 px-4 py-2 rounded-lg text-sm italic">
                AI is typing…
              </div>
            </div>
          )}


          <div ref={bottomRef} />
        </div>

        {/* Input area */}
        <div className="shadow-stone-400 p-4 bg-white">
          <div className="flex gap-4 items-end">
            <textarea
              className="flex-1 border rounded-lg p-3 text-sm resize-none h-24 focus:outline-none focus:ring-2 focus:ring-slate-800"
              placeholder="Type your message… (Shift+Enter for new line)"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              disabled={sendChatMessage.isPending}
              onKeyDown={handleKeyDown}
            />
            <button
              onClick={sendMessage}
              disabled={sendChatMessage.isPending}
              className="px-4 py-2 rounded-lg bg-slate-800 text-white disabled:bg-slate-500"
            >
              Send
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
