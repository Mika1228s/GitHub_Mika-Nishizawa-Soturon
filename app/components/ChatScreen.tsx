"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";

type ChatScreenProps = {
  back: () => void;
};

type Message = {
  id: number;
  role: "user" | "ai";
  text: string;
  time: string;
};

export default function ChatScreen({
  back,
}: ChatScreenProps) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const bottomRef = useRef<HTMLDivElement>(null);

  function getTime() {
    return new Date().toLocaleTimeString("ja-JP", {
      hour: "2-digit",
      minute: "2-digit",
    });
  }

  // 初回読み込み
  useEffect(() => {
    const saved = localStorage.getItem("chat-history");

    if (saved) {
      setMessages(JSON.parse(saved));
    } else {
      setMessages([
        {
          id: 1,
          role: "ai",
          text: "こんにちは🌿 今日もお疲れさま。何でも話してね。",
          time: getTime(),
        },
      ]);
    }
  }, []);

  // 保存＋スクロール
  useEffect(() => {
    if (messages.length === 0) return;

    localStorage.setItem(
      "chat-history",
      JSON.stringify(messages)
    );

    bottomRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, [messages]);

  async function sendMessage() {
    if (loading) return;

    if (input.trim() === "") return;

    const userMessage = input;

    setMessages((prev) => [
      ...prev,
      {
        id: Date.now(),
        role: "user",
        text: userMessage,
        time: getTime(),
      },
    ]);

    setInput("");

    setLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: userMessage,
        }),
      });

      if (!res.ok) {
        throw new Error("通信エラー");
      }

      const data = await res.json();

      setMessages((prev) => [
        ...prev,
        {
          id: Date.now() + 1,
          role: "ai",
          text: data.reply,
          time: getTime(),
        },
      ]);
    } catch (error) {
      console.error(error);

      setMessages((prev) => [
        ...prev,
        {
          id: Date.now() + 1,
          role: "ai",
          text: "ごめんね🌿 今ちょっと調子が悪いみたい...",
          time: getTime(),
        },
      ]);
    }

    setLoading(false);
  }

  function handleKeyDown(
    e: React.KeyboardEvent<HTMLInputElement>
  ) {
    if (e.key === "Enter" && !loading) {
      sendMessage();
    }
  }

  return (    <div className="w-full h-full flex flex-col bg-[url('/homeBackground.png')] bg-cover bg-center">

      {/* ヘッダー */}
      <div className="h-20 bg-white/70 backdrop-blur flex items-center px-4 shadow">

        <button
          onClick={back}
          className="text-black font-bold"
        >
          ← ホーム
        </button>

        <div className="flex-1 flex justify-center items-center gap-3">

          <Image
            src="/girlIcon.png"
            alt="AI"
            width={45}
            height={45}
            className="rounded-full"
          />

          <div>
            <p className="font-bold text-black">
              女の子
            </p>

            <p className="text-xs text-gray-500">
              オンライン
            </p>
          </div>

        </div>

      </div>

      {/* 会話一覧 */}
      <div className="flex-1 overflow-y-auto px-4 py-5 space-y-5">

        {messages.map((message) => (

          <div
            key={message.id}
            className={`flex ${
              message.role === "user"
                ? "justify-end"
                : "justify-start"
            }`}
          >

            {message.role === "ai" ? (

              <div className="flex flex-col items-start">

                <div className="flex items-center gap-2 mb-2">

                  <Image
                    src="/girlIcon.png"
                    alt="AI"
                    width={42}
                    height={42}
                    className="rounded-full"
                  />

                  <span className="font-semibold text-black">
                    女の子
                  </span>

                </div>

               <div
  style={{
    backgroundColor: "#ffffff",
    padding: "16px 20px",
    borderRadius: "20px",
    minWidth: "120px",
    maxWidth: "280px",
    display: "inline-block",
    boxShadow: "0 4px 12px rgba(0,0,0,0.12)",
  }}
>
  <p
    style={{
      color: "#2f4f4f",
      whiteSpace: "pre-wrap",
      wordBreak: "break-word",
      margin: 0,
      lineHeight: "1.7",
    }}
  >
    {message.text}
  </p>
</div>

                <p className="text-[10px] text-gray-500 mt-1 ml-2">
                  {message.time}
                </p>

              </div>

            ) : (

              <div className="flex flex-col items-end">

                <div className="flex items-center gap-2 mb-2">

                  <span className="font-semibold text-black">
                    あなた
                  </span>

                  <Image
                    src="/userIcon.png"
                    alt="User"
                    width={42}
                    height={42}
                    className="rounded-full"
                  />

                </div>

                <div
                  className="
                    bg-[#9BD89B]
                    rounded-[20px]
                    shadow-lg
                    px-5
                    py-4
                    min-w-[120px]
                    max-w-[280px]
                    w-fit
                  "
                >
                  <p className="text-white whitespace-pre-wrap break-words leading-relaxed">
                    {message.text}
                  </p>
                </div>

                <p className="text-[10px] text-gray-500 mt-1 mr-2">
                  {message.time}
                </p>

              </div>

            )}

          </div>

        ))}

        {loading && (

          <div className="flex justify-start">

            <div className="flex flex-col items-start">

              <div className="flex items-center gap-2 mb-2">

                <Image
                  src="/girlIcon.png"
                  alt="AI"
                  width={42}
                  height={42}
                  className="rounded-full"
                />

                <span className="font-semibold text-black">
                  女の子
                </span>

              </div>

              <div
                className="
                  bg-white
                  rounded-[20px]
                  shadow-lg
                  px-5
                  py-4
                  min-w-[120px]
                "
              >
                <p className="text-gray-500">
                  考え中...
                </p>
              </div>

            </div>

          </div>

        )}

        <div ref={bottomRef} />

      </div>

      {/* 入力欄 */}
      <div className="p-4 bg-white/70 backdrop-blur flex gap-3">

        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="メッセージを入力..."
          disabled={loading}
          className="
            flex-1
            h-[55px]
            rounded-full
            px-5
            bg-white
            text-black
            outline-none
            shadow-lg
            disabled:opacity-50
          "
        />

        <button
          onClick={sendMessage}
          disabled={loading}
          className="
            w-24
            rounded-full
            bg-[#5f8f5f]
            text-white
            font-bold
            shadow-lg
            disabled:bg-gray-400
            transition
          "
        >
          {loading ? "..." : "送信"}
        </button>

      </div>

    </div>

  );
}