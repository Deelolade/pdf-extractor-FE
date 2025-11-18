"use client";

import { useState, useRef, useEffect } from "react";
import axios from "axios";
import { API_URL } from "../config/env";
import { useParams } from "next/navigation";
import { useChats } from "../hooks/useChat";
import { useQueryClient } from "@tanstack/react-query";
import { FaArrowLeft } from "react-icons/fa6";
import { useRouter } from "next/navigation"

type Message = {
  role: "user" | "assistant";
  content: string;
};

export default function ChatPage() {
  const params = useParams()
  const id = params.id as string;
const route = useRouter()
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const { data: savedMessages=[], isLoading, isError} = useChats(id)
  const queryClient = useQueryClient()
  const bottomRef = useRef<HTMLDivElement | null>(null);

  // Local optimistic messages (only unsaved ones)
  const [pendingMessages, setPendingMessages] = useState<Message[]>([]);
  const [isSending, setIsSending] = useState(false);

  // Combine saved + pending messages
  const allMessages = [...savedMessages, ...pendingMessages];
  // Auto-scroll on new message
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = async () => {
    if (!input.trim() || loading) return;

    const newUserMessage: Message = {
      role: "user",
      content: input,
    };

    setMessages((prev) => [...prev, newUserMessage]);
    setInput("");
    setLoading(true);

    try {
      const res = await axios.post(`${API_URL}/document/chat/${id}`, {
        message: input,
      }, {withCredentials: true});

      const aiMessage: Message = {
        role: "assistant",
        content: res.data.reply,
      };

      setMessages((prev) => [...prev, aiMessage]);
      queryClient.invalidateQueries({queryKey: ['chat', id]})
    } catch (err) {
      const errorMessage: Message = {
        role: "assistant",
        content: "Something went wrong. Please try again.",
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) =>  
    e.key === "Enter" && !e.shiftKey ? (e.preventDefault(), sendMessage()) : null;
  console.log(messages)
  const handleRouteToUpload =(id: string)=>{
    route.push(`/documents/${id}`)
  }
  return (
    <section className="flex-1 max-h-screen h-screen">
      <div className="bg-white/10 h-18 absolute w-[80%] shadow-2xl backdrop-blur-xl p-5 flex items-center">
        <button className="hover:bg-gray-300 p-2 rounded-md" onClick={()=> handleRouteToUpload(id)}><FaArrowLeft className="scale-125"/></button>
      </div>
        <div className="flex flex-col max-w-5xl mx-auto justify-center h-full">
      {/* Chat window */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 ">
        {savedMessages ?.map((msg:any, idx:any) => (
          <div
            key={idx}
            className={`flex ${
              msg.role === "user" ? "justify-end" : "justify-start"
            }`}
          >
            <div
              className={`max-w-[75%] rounded-lg px-4 py-3 text-sm whitespace-pre-wrap ${
                msg.role === "user"
                  ? "bg-blue-600 text-white"
                  : "bg-gray-200 text-gray-900"
              }`}
            >
              {msg.content}
            </div>
          </div>
        ))}

        {loading && (
          <div className="text-gray-600 text-sm italic">AI is typing…</div>
        )}

        <div ref={bottomRef} />
      </div>

      {/* Input area */}
      <div className="shadow-stone-400 p-4 bg-white">
        <div className="flex gap-4 items-end">
          <textarea
            className="flex-1 border rounded-lg p-3 text-sm resize-none h-24 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Type your message… (Shift+Enter for new line)"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
          />

          <button
            onClick={sendMessage}
            disabled={loading}
            className="px-4 py-2 rounded-lg bg-blue-600 text-white disabled:bg-blue-400"
          >
            Send
          </button>
        </div>
      </div>
    </div>
    </section>
  );
}
