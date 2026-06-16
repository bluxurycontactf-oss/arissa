"use client";

import { useEffect, useRef, useState, FormEvent } from "react";
import { MessageCircle, X, Send, Sparkles } from "lucide-react";
import { API_URL } from "@/lib/api";

type ChatMessage = {
  role: "user" | "assistant";
  content: string;
};

const STORAGE_KEY = "arissa_support_conversation";

const WELCOME: ChatMessage = {
  role: "assistant",
  content: "Bonjour ! Je suis Arissa, votre agent support. Posez-moi une question sur votre compte, vos agents ou vos abonnements.",
};

export default function SupportChat() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([WELCOME]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const conversationId = useRef<string | undefined>(undefined);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    conversationId.current = localStorage.getItem(STORAGE_KEY) ?? undefined;
  }, []);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, open]);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const text = input.trim();
    if (!text || loading) return;

    setMessages((prev) => [...prev, { role: "user", content: text }]);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch(`${API_URL}/api/support/chat`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: text, conversationId: conversationId.current }),
      });

      if (!res.ok) throw new Error("request failed");

      const data = (await res.json()) as { conversationId: string; reply: string };
      conversationId.current = data.conversationId;
      localStorage.setItem(STORAGE_KEY, data.conversationId);

      setMessages((prev) => [...prev, { role: "assistant", content: data.reply }]);
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: "Désolé, je n'arrive pas à joindre le service d'assistance pour le moment. Réessayez plus tard.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-4">
      {open && (
        <div className="gradient-border glow flex h-[28rem] w-[22rem] max-w-[calc(100vw-3rem)] flex-col overflow-hidden rounded-3xl bg-surface">
          <div className="flex items-center gap-3 border-b border-border-soft bg-surface-light px-5 py-4">
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-primary to-primary-2">
              <Sparkles size={16} className="text-white" />
            </div>
            <div className="flex-1">
              <p className="font-display text-sm font-semibold">Arissa</p>
              <p className="text-xs text-muted">Agent support client</p>
            </div>
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="text-muted transition-colors hover:text-foreground"
              aria-label="Fermer le chat"
            >
              <X size={18} />
            </button>
          </div>

          <div ref={scrollRef} className="flex-1 space-y-3 overflow-y-auto px-4 py-4">
            {messages.map((message, i) => (
              <div
                key={i}
                className={`max-w-[85%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed ${
                  message.role === "user"
                    ? "ml-auto bg-gradient-to-r from-primary to-primary-2 text-white"
                    : "bg-surface-light text-foreground/90 border border-border-soft"
                }`}
              >
                {message.content}
              </div>
            ))}
            {loading && (
              <div className="max-w-[85%] rounded-2xl border border-border-soft bg-surface-light px-4 py-2.5 text-sm text-muted">
                Arissa écrit...
              </div>
            )}
          </div>

          <form onSubmit={handleSubmit} className="flex items-center gap-2 border-t border-border-soft p-3">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Écrivez votre message..."
              className="flex-1 rounded-full border border-border-soft bg-surface-light px-4 py-2.5 text-sm outline-none transition-colors focus:border-primary/60"
            />
            <button
              type="submit"
              disabled={loading || !input.trim()}
              className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gradient-to-r from-primary to-primary-2 text-white shadow-lg shadow-primary/25 transition-all hover:scale-[1.05] disabled:opacity-50 disabled:hover:scale-100"
              aria-label="Envoyer"
            >
              <Send size={16} />
            </button>
          </form>
        </div>
      )}

      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-r from-primary to-primary-2 text-white shadow-lg shadow-primary/30 transition-all hover:scale-105"
        aria-label="Ouvrir le chat support"
      >
        {open ? <X size={22} /> : <MessageCircle size={22} />}
      </button>
    </div>
  );
}
