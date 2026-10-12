"use client";

import React, { useEffect, useRef, useState } from "react";
import { Sparkles, ArrowUp, X, Bot, User } from "lucide-react";
import { answerRadeaQuery } from "@/lib/radeaKnowledge";

// Mocked retrieval: the answer is built synchronously from the CV, so this
// delay is presentation only. 7.2s of skeleton plus the staggered reveal
// below lands on about eight seconds end to end.
const THINK_MS = 7200;
const WORD_STAGGER_MS = 10;
const WORD_STAGGER_CAP_MS = 500;

interface Message {
  id: number;
  role: "user" | "assistant";
  content: string;
}

// Shaped like the answer bubble it will become, so the swap at the end of
// the wait does not jump the layout.
function AnswerSkeleton() {
  return (
    <div className="flex gap-2" role="status" aria-live="polite">
      <div className="w-5 h-5 rounded-full bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center text-zinc-600 dark:text-zinc-400 shrink-0 mt-0.5">
        <Sparkles className="w-3 h-3" />
      </div>
      <div className="flex-1 min-w-0 p-2.5 rounded-xl bg-zinc-100 dark:bg-zinc-800/80 border border-zinc-200/60 dark:border-zinc-700/60">
        <div className="flex flex-col gap-2">
          {["w-[92%]", "w-[78%]", "w-[54%]"].map((width) => (
            <span
              key={width}
              className={`relative block h-2 rounded-full overflow-hidden bg-zinc-300/70 dark:bg-zinc-700/70 ${width}`}
            >
              <span className="absolute inset-0 animate-shimmer motion-reduce:animate-none bg-[linear-gradient(90deg,transparent,rgba(255,255,255,0.85),transparent)] dark:bg-[linear-gradient(90deg,transparent,rgba(255,255,255,0.14),transparent)]" />
            </span>
          ))}
        </div>

        <div className="mt-2.5 flex items-center gap-2">
          <span className="text-[11px] text-zinc-500 dark:text-zinc-400">
            Menyusun jawaban dari CV
          </span>
          <span className="flex-1 h-px bg-zinc-300 dark:bg-zinc-700 overflow-hidden relative">
            <span
              className="absolute inset-y-0 left-0 w-full origin-left scale-x-0 bg-zinc-500 dark:bg-zinc-400 motion-reduce:animate-none"
              style={{ animation: `scale-x-fill ${THINK_MS}ms linear forwards` }}
            />
          </span>
        </div>
      </div>
    </div>
  );
}

// Words fade up in reading order. Newlines stay inside their own span so the
// bubble's existing whitespace-pre-line still breaks the lines.
function RevealedText({ text }: { text: string }) {
  return (
    <>
      {text.split(" ").map((word, i) => (
        <span
          key={i}
          className="inline animate-rise-in motion-reduce:animate-none"
          style={{
            animationDelay: `${Math.min(i * WORD_STAGGER_MS, WORD_STAGGER_CAP_MS)}ms`,
          }}
        >
          {word}{" "}
        </span>
      ))}
    </>
  );
}

export function FloatingAskBar() {
  const [query, setQuery] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 0,
      role: "assistant",
      content:
        "Halo! Saya asisten AI I Wayan Radea. Anda dapat menanyakan seputar keahlian, pengalaman freelance, proyek (Portalink & Whip), atau kontak Radea berdasarkan CV.",
    },
  ]);
  const [isThinking, setIsThinking] = useState(false);
  const [revealingId, setRevealingId] = useState<number | null>(null);
  const nextId = useRef(1);
  const thinkTimer = useRef<number | undefined>(undefined);
  const scrollerRef = useRef<HTMLDivElement>(null);

  useEffect(() => () => window.clearTimeout(thinkTimer.current), []);

  // Keep the newest message in view. The answer runs longer than the panel,
  // so without this its opening lines sit above the fold unread.
  useEffect(() => {
    const el = scrollerRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [messages, isThinking]);

  const ask = (text: string) => {
    const q = text.trim();
    if (!q) return;

    window.clearTimeout(thinkTimer.current);
    const userId = nextId.current++;

    setIsOpen(true);
    setMessages((prev) => [...prev, { id: userId, role: "user", content: q }]);
    setQuery("");
    setRevealingId(null);
    setIsThinking(true);

    thinkTimer.current = window.setTimeout(() => {
      const answerId = nextId.current++;
      setMessages((prev) => [
        ...prev,
        { id: answerId, role: "assistant", content: answerRadeaQuery(q) },
      ]);
      setRevealingId(answerId);
      setIsThinking(false);
    }, THINK_MS);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    ask(query);
  };

  const quickQuestions = [
    "Apa itu Portalink?",
    "Apa itu Whip?",
    "Keahlian teknis?",
    "Pengalaman kerja?",
    "Kontak & Email?",
  ];

  return (
    <div className="fixed bottom-4 sm:bottom-6 left-1/2 -translate-x-1/2 z-50 w-[calc(100%-2rem)] sm:max-w-md pointer-events-none flex flex-col items-center">
      {/* Response / Chat popup */}
      {isOpen && (
        <div className="pointer-events-auto w-full mb-2.5 sm:mb-3 rounded-2xl border border-zinc-200/90 dark:border-zinc-800 bg-white/95 dark:bg-zinc-900/95 backdrop-blur-xl shadow-2xl p-3.5 sm:p-4 flex flex-col gap-3 max-h-[380px] overflow-hidden transition-all animate-in fade-in slide-in-from-bottom-2 duration-200">
          {/* Header */}
          <div className="flex items-center justify-between border-b border-zinc-200/70 dark:border-zinc-800 pb-2">
            <div className="flex items-center gap-2">
              <div className="w-5 h-5 rounded-md bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 flex items-center justify-center">
                <Bot className="w-3 h-3" />
              </div>
              <span className="text-xs font-medium text-zinc-900 dark:text-zinc-100 truncate">
                Radea AI Assistant (Knowledge: CV)
              </span>
            </div>

            <button
              onClick={() => setIsOpen(false)}
              className="p-1 rounded-md text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-200 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors cursor-pointer"
              aria-label="Tutup percakapan"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Messages scroll area */}
          <div
            ref={scrollerRef}
            className="flex-1 overflow-y-auto flex flex-col gap-2.5 pr-1 text-xs"
          >
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex gap-2 ${
                  msg.role === "user" ? "justify-end" : "justify-start"
                }`}
              >
                {msg.role === "assistant" && (
                  <div className="w-5 h-5 rounded-full bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center text-zinc-600 dark:text-zinc-400 shrink-0 mt-0.5">
                    <Sparkles className="w-3 h-3" />
                  </div>
                )}
                <div
                  className={`p-2.5 rounded-xl max-w-[85%] leading-relaxed whitespace-pre-line ${
                    msg.role === "user"
                      ? "bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-900 font-medium"
                      : "bg-zinc-100 dark:bg-zinc-800/80 text-zinc-800 dark:text-zinc-200 border border-zinc-200/60 dark:border-zinc-700/60"
                  }`}
                >
                  {msg.id === revealingId ? (
                    <RevealedText text={msg.content} />
                  ) : (
                    msg.content
                  )}
                </div>
                {msg.role === "user" && (
                  <div className="w-5 h-5 rounded-full bg-zinc-200 dark:bg-zinc-700 flex items-center justify-center text-zinc-700 dark:text-zinc-300 shrink-0 mt-0.5">
                    <User className="w-3 h-3" />
                  </div>
                )}
              </div>
            ))}

            {isThinking && <AnswerSkeleton />}
          </div>

          {/* Quick suggestions */}
          <div className="flex flex-wrap gap-1.5 pt-1 border-t border-zinc-200/60 dark:border-zinc-800">
            {quickQuestions.map((q) => (
              <button
                key={q}
                onClick={() => ask(q)}
                className="px-2 py-0.5 rounded-md text-[11px] font-mono bg-zinc-100 hover:bg-zinc-200 dark:bg-zinc-800 dark:hover:bg-zinc-700 text-zinc-700 dark:text-zinc-300 transition-colors cursor-pointer"
              >
                {q}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Floating Input Pill */}
      <form
        onSubmit={handleSubmit}
        className="pointer-events-auto w-full flex items-center gap-2.5 p-2 pl-3.5 rounded-2xl border border-zinc-200/90 dark:border-zinc-800 bg-white/95 dark:bg-zinc-900/95 backdrop-blur-xl shadow-lg transition-all focus-within:ring-2 focus-within:ring-zinc-400 dark:focus-within:ring-zinc-600"
      >
        <button
          type="button"
          onClick={() => setIsOpen((prev) => !prev)}
          className="text-zinc-400 hover:text-zinc-700 dark:text-zinc-500 dark:hover:text-zinc-300 cursor-pointer"
          aria-label="Toggle assistant"
        >
          <Sparkles className="w-4 h-4 shrink-0" />
        </button>

        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => setIsOpen(true)}
          placeholder="Ask Radea..."
          className="flex-1 bg-transparent text-xs font-mono text-zinc-900 dark:text-zinc-100 placeholder:text-zinc-400 dark:placeholder:text-zinc-500 focus:outline-none"
        />

        <button
          type="submit"
          aria-label="Send query"
          className="w-7 h-7 rounded-xl bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 flex items-center justify-center shrink-0 hover:bg-zinc-800 dark:hover:bg-zinc-200 transition-colors cursor-pointer"
        >
          <ArrowUp className="w-3.5 h-3.5" />
        </button>
      </form>
    </div>
  );
}