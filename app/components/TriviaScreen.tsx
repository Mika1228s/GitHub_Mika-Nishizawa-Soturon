"use client";

import { useState } from "react";

type TriviaScreenProps = {
  back: () => void;
};

type TriviaItem = {
  id: number;
  number: string;
  title: string;
  image: string;
};

const triviaList: TriviaItem[] = [
  {
    id: 1,
    number: "豆知識１",
    title: "生活セルフケアの３つの柱",
    image: "/豆知識１.png",
  },
  {
    id: 2,
    number: "豆知識２",
    title: "セロトニンについて",
    image: "/豆知識２.png",
  },
  {
    id: 3,
    number: "豆知識３",
    title: "朝は明るい日差しを取り込もう",
    image: "/豆知識３.png",
  },
  {
    id: 4,
    number: "豆知識４",
    title: "笑うと楽しくなる",
    image: "/豆知識４.png",
  },
  {
    id: 5,
    number: "豆知識５",
    title: "音楽を聴いてみよう",
    image: "/豆知識５.png",
  },
  {
    id: 6,
    number: "豆知識６",
    title: "心の不安を軽くする色",
    image: "/豆知識６.png",
  },
];

export default function TriviaScreen({
  back,
}: TriviaScreenProps) {
  const [selectedTrivia, setSelectedTrivia] =
    useState<TriviaItem | null>(null);

  const [titleImageError, setTitleImageError] =
    useState(false);

  return (
    <div
      className="
        relative
        flex
        h-full
        w-full
        min-h-0
        flex-col
        overflow-hidden
        bg-[url('/homeBackground.png')]
        bg-cover
        bg-center
        bg-no-repeat
      "
    >
      {/* 背景を少し明るくする */}
      <div className="pointer-events-none absolute inset-0 bg-white/20" />

      {/* =========================================
          ヘッダー
      ========================================= */}
      <header
        className="
          relative
          z-20
          h-[90px]
          shrink-0
          border-b
          border-[#cbd9a7]
          bg-white/75
        "
      >
        {/* ホームボタン */}
        <button
          type="button"
          onClick={back}
          aria-label="ホームへ戻る"
          className="
            absolute
            left-3
            top-1/2
            z-30
            -translate-y-1/2
            border-0
            bg-transparent
            p-0
            active:scale-95
          "
        >
          <img
            src="/ホームUI.png"
            alt="ホーム"
            className="
              block
              h-auto
              w-[100px]
              object-contain
            "
          />
        </button>

        {/* 豆知識タイトル */}
        <div
          className="
            absolute
            left-1/2
            top-1/2
            flex
            -translate-x-1/2
            -translate-y-1/2
            items-center
            justify-center
          "
        >
          {!titleImageError ? (
            <img
              src="/豆知識UI.png"
              alt="豆知識"
              onError={() => setTitleImageError(true)}
              className="
                block
                max-h-[55px]
                w-[145px]
                object-contain
              "
            />
          ) : (
            <h1
              className="
                whitespace-nowrap
                text-[28px]
                font-bold
                text-[#557548]
              "
            >
              豆知識
            </h1>
          )}
        </div>
      </header>

      {/* =========================================
          豆知識一覧
      ========================================= */}
      <main
        className="
          relative
          z-10
          min-h-0
          flex-1
          overflow-x-hidden
          overflow-y-auto
          px-3
          pb-8
          pt-4
        "
      >
        <div className="mx-auto w-full max-w-[620px]">
          {/* 説明 */}
          <div
            className="
              mb-4
              rounded-[24px]
              border
              border-[#cbd9a7]
              bg-[#fffef7]/90
              px-4
              py-5
              text-center
              shadow-sm
            "
          >
            <p
              className="
                text-[17px]
                leading-relaxed
                text-[#557548]
              "
            >
              気になる豆知識を
              <br />
              タップして見てみよう🌱
            </p>
          </div>

          {/* 豆知識一覧 */}
          <div className="flex flex-col gap-3">
            {triviaList.map((trivia) => (
              <div
                key={trivia.id}
                className="
                  flex
                  min-h-[105px]
                  w-full
                  items-center
                  justify-between
                  rounded-[24px]
                  border
                  border-[#c9d9a3]
                  bg-[#eef5df]/95
                  px-4
                  py-4
                  shadow-sm
                "
              >
                {/* 番号・タイトル */}
                <div className="min-w-0 flex-1 pr-3">
                  <p
                    className="
                      text-[14px]
                      font-medium
                      text-[#82996b]
                    "
                  >
                    {trivia.number}
                  </p>

                  <p
                    className="
                      mt-2
                      break-words
                      text-[19px]
                      font-semibold
                      leading-snug
                      text-[#536b47]
                    "
                  >
                    {trivia.title}
                  </p>
                </div>

                {/* ➤ボタン */}
                <button
                  type="button"
                  onClick={() => {
                    setSelectedTrivia(trivia);
                  }}
                  aria-label={`${trivia.number}を開く`}
                  className="
                    flex
                    h-[54px]
                    w-[54px]
                    shrink-0
                    items-center
                    justify-center
                    rounded-full
                    border
                    border-[#a9c77d]
                    bg-[#f9fbe9]
                    text-[28px]
                    text-[#557548]
                    shadow-sm
                    transition-transform
                    active:scale-90
                  "
                >
                  ➤
                </button>
              </div>
            ))}
          </div>

          <div className="h-10" />
        </div>
      </main>

      {/* =====================================================
          豆知識画像表示画面
          背景：薄い緑
      ===================================================== */}
      {selectedTrivia && (
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            width: "100%",
            height: "100%",
            zIndex: 9999,

            // 画像の背景を薄い緑色にする
            backgroundColor: "#e8f0df",

            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            overflow: "hidden",
          }}
        >
          {/* 豆知識画像 */}
          <img
            src={selectedTrivia.image}
            alt={selectedTrivia.title}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "contain",
              display: "block",
            }}
          />

          {/* =====================================
              ×ボタン
              画面右上
          ===================================== */}
          <button
            type="button"
            onClick={() => {
              setSelectedTrivia(null);
            }}
            aria-label="閉じる"
            style={{
              position: "absolute",
              top: "12px",
              right: "12px",

              width: "52px",
              height: "52px",

              zIndex: 10000,

              display: "flex",
              alignItems: "center",
              justifyContent: "center",

              borderRadius: "9999px",
              border: "1px solid #777777",

              backgroundColor: "rgba(255, 255, 255, 0.95)",

              color: "#557548",
              fontSize: "34px",
              fontWeight: "400",
              lineHeight: "1",

              padding: 0,
              cursor: "pointer",

              boxShadow: "0 4px 12px rgba(0, 0, 0, 0.25)",
            }}
          >
            ×
          </button>
        </div>
      )}
    </div>
  );
}