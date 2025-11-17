"use client";

import { useState, useRef, useEffect } from "react";
import axios from "axios";

type Message = {
  id: string;
  role: "user" | "assistant";
  content: string;
};

export default function ChatPage() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const bottomRef = useRef<HTMLDivElement | null>(null);

  // Auto-scroll on new message
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = async () => {
    if (!input.trim() || loading) return;

    const newUserMessage: Message = {
      id: crypto.randomUUID(),
      role: "user",
      content: input,
    };

    setMessages((prev) => [...prev, newUserMessage]);
    setInput("");
    setLoading(true);

    try {
      const res = await axios.post("/api/chat", {
        message: input,
        history: messages, // optional
      }, {withCredentials: true});

      const aiMessage: Message = {
        id: crypto.randomUUID(),
        role: "assistant",
        content: res.data.reply,
      };

      setMessages((prev) => [...prev, aiMessage]);
    } catch (err) {
      const errorMessage: Message = {
        id: crypto.randomUUID(),
        role: "assistant",
        content: "❗ Something went wrong. Please try again.",
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) =>  
    e.key === "Enter" && !e.shiftKey ? (e.preventDefault(), sendMessage()) : null;

  return (
    <div className="flex-1">
        <div className="flex flex-col max-w-5xl mx-auto justify-center h-screen max-h-screen">
      {/* Chat window */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 ">
        {messages.map((msg) => (
          <div
            key={msg.id}
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
    </div>
  );
}
