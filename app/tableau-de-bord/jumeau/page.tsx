"use client";

import { useEffect, useRef, useState, FormEvent } from "react";
import { Send, Sparkles, Bot } from "lucide-react";
import { apiFetch } from "@/lib/api";

type ChatMessage = {
  role: "user" | "assistant";
  content: string;
};

const STORAGE_KEY = "arissa_agent_conversation";

const WELCOME: ChatMessage = {
  role: "assistant",
  content:
    "Bonjour, je suis votre jumeau numérique. Décrivez-moi votre activité, un problème à résoudre ou une stratégie à construire — je raisonne avec votre mémoire et vos documents pour vous proposer un plan concret.",
};

export default function JumeauPage() {
  const [messages, setMessages] = useState<ChatMessage[]>([WELCOME]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const conversationId = useRef<string | undefined>(undefined);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    conversationId.current = localStorage.getItem(STORAGE_KEY) ?? undefined;
  }, []);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages]);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const text = input.trim();
    if (!text || loading) return;

    setMessages((prev) => [...prev, { role: "user", content: text }]);
    setInput("");
    setLoading(true);
    setError(null);

    try {
      const res = await apiFetch(`/api/agent/chat`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: text, conversationId: conversationId.current }),
      });

      const data = (await res.json()) as { conversationId?: string; reply?: string; error?: string };

      if (!res.ok || !data.reply) {
        throw new Error(data.error || "Le jumeau numérique n'a pas pu répondre.");
      }

      conversationId.current = data.conversationId;
      if (data.conversationId) localStorage.setItem(STORAGE_KEY, data.conversationId);

      setMessages((prev) => [...prev, { role: "assistant", content: data.reply! }]);
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="font-display text-2xl sm:text-3xl font-semibold">Jumeau numérique</h1>
        <p className="text-muted mt-1">
          Posez vos questions business, tech, immobilier, marketing, finance ou éducation — votre jumeau raisonne et
          construit des plans d&apos;action avec votre mémoire et vos documents.
        </p>
      </div>

      <div className="gradient-border glow rounded-3xl flex flex-col h-[70vh] overflow-hidden">
        <div className="flex items-center gap-3 border-b border-border-soft bg-surface-light px-5 py-4">
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-primary to-primary-2">
            <Sparkles size={16} className="text-white" />
          </div>
          <div>
            <p className="font-display text-sm font-semibold">Arissa</p>
            <p className="text-xs text-muted">Jumeau numérique &amp; agent autonome</p>
          </div>
        </div>

        <div ref={scrollRef} className="flex-1 space-y-4 overflow-y-auto px-5 py-5">
          {messages.map((message, i) => (
            <div
              key={i}
              className={`flex gap-3 ${message.role === "user" ? "justify-end" : "justify-start"}`}
            >
              {message.role === "assistant" && (
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-primary to-primary-2">
                  <Bot size={14} className="text-white" />
                </div>
              )}
              <div
                className={`max-w-[80%] rounded-2xl px-4 py-3 text-sm leading-relaxed whitespace-pre-wrap ${
                  message.role === "user"
                    ? "bg-gradient-to-r from-primary to-primary-2 text-white"
                    : "bg-surface-light border border-border-soft text-foreground/90"
                }`}
              >
                {message.content}
              </div>
            </div>
          ))}
          {loading && (
            <div className="flex gap-3 justify-start">
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-primary to-primary-2">
                <Bot size={14} className="text-white" />
              </div>
              <div className="max-w-[80%] rounded-2xl border border-border-soft bg-surface-light px-4 py-3 text-sm text-muted">
                Votre jumeau réfléchit...
              </div>
            </div>
          )}
          {error && (
            <p className="text-sm text-red-400">
              {error} {error.includes("authentication") || error.includes("API")
                ? "Vérifiez que ANTHROPIC_API_KEY est configurée sur le backend."
                : ""}
            </p>
          )}
        </div>

        <form onSubmit={handleSubmit} className="flex items-center gap-2 border-t border-border-soft p-4">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Décrivez votre objectif ou posez votre question..."
            className="flex-1 rounded-full border border-border-soft bg-surface-light px-5 py-3 text-sm outline-none transition-colors focus:border-primary/60"
          />
          <button
            type="submit"
            disabled={loading || !input.trim()}
            className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-gradient-to-r from-primary to-primary-2 text-white shadow-lg shadow-primary/25 transition-all hover:scale-[1.05] disabled:opacity-50 disabled:hover:scale-100"
            aria-label="Envoyer"
          >
            <Send size={16} />
          </button>
        </form>
      </div>
    </div>
  );
}
