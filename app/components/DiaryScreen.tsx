"use client";

import { useEffect, useState } from "react";

type DiaryScreenProps = {
  back: () => void;
};

type Diary = {
  id: number;
  title: string;
  content: string;
  date: string;
};

export default function DiaryScreen({
  back,
}: DiaryScreenProps) {
  const [diaries, setDiaries] = useState<Diary[]>([]);
  const [isWriting, setIsWriting] = useState(false);

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const [selectedDiary, setSelectedDiary] =
    useState<Diary | null>(null);

  // =========================
  // 保存されている日記を読み込む
  // =========================

  useEffect(() => {
    const saved = localStorage.getItem("diary-history");

    if (saved) {
      try {
        setDiaries(JSON.parse(saved));
      } catch {
        setDiaries([]);
      }
    }
  }, []);

  // =========================
  // 日記を保存
  // =========================

  function saveDiary() {
    if (
      title.trim() === "" &&
      content.trim() === ""
    ) {
      alert("日記を書いてください");
      return;
    }

    const today = new Date();

    const date =
      today.getFullYear() +
      "/" +
      String(today.getMonth() + 1).padStart(2, "0") +
      "/" +
      String(today.getDate()).padStart(2, "0");

    const newDiary: Diary = {
      id: Date.now(),
      title:
        title.trim() === ""
          ? "無題の日記"
          : title,
      content,
      date,
    };

    const updatedDiaries = [
      newDiary,
      ...diaries,
    ];

    setDiaries(updatedDiaries);

    localStorage.setItem(
      "diary-history",
      JSON.stringify(updatedDiaries)
    );

    setTitle("");
    setContent("");

    setIsWriting(false);
  }

  // =========================
  // 日記を書く画面
  // =========================

  if (isWriting) {
    return (
      <div
        className="
          w-full
          h-full
          relative
          flex
          flex-col
          bg-[url('/homeBackground.png')]
          bg-cover
          bg-center
          overflow-hidden
        "
      >
        {/* =====================
            ヘッダー
           ===================== */}

        <div
          className="
            h-[100px]
            shrink-0
            flex
            items-center
            justify-between
            px-5
            bg-white/75
            backdrop-blur-md
            border-b
            border-[#b8d7a8]
          "
        >
          <button
            onClick={() => {
              setIsWriting(false);
              setTitle("");
              setContent("");
            }}
            className="
              px-4
              py-2
              rounded-full
              border
              border-[#6f9168]
              bg-white/80
              text-[#496744]
              font-bold
              shadow
              whitespace-nowrap
            "
          >
            ← 戻る
          </button>

          <h1
            className="
              text-[28px]
              font-bold
              text-[#52734d]
              whitespace-nowrap
            "
          >
            日記を書く
          </h1>

          <div className="w-[70px]" />
        </div>

        {/* =====================
            入力エリア
           ===================== */}

        <div
          className="
            flex-1
            overflow-y-auto
            overflow-x-hidden
            px-5
            py-6
          "
        >
          <div
            className="
              w-full
              min-h-[560px]
              bg-white/90
              rounded-[32px]
              shadow-xl
              border
              border-[#d8e9cf]
              p-6
              flex
              flex-col
              gap-5
            "
          >
            {/* タイトル */}

            <div>
              <p
                className="
                  text-sm
                  text-[#698765]
                  font-bold
                  mb-2
                "
              >
                タイトル
              </p>

              <input
                value={title}
                onChange={(e) =>
                  setTitle(e.target.value)
                }
                placeholder="今日のタイトル"
                className="
                  w-full
                  h-[58px]
                  rounded-2xl
                  bg-[#f3f9ee]
                  px-5
                  text-[#3f593b]
                  outline-none
                  border
                  border-[#c9dfbd]
                  text-lg
                "
              />
            </div>

            {/* 本文 */}

            <div className="flex-1 flex flex-col">
              <p
                className="
                  text-sm
                  text-[#698765]
                  font-bold
                  mb-2
                "
              >
                今日あったこと
              </p>

              <textarea
                value={content}
                onChange={(e) =>
                  setContent(e.target.value)
                }
                placeholder="今日あったことや、感じたことを書いてみよう..."
                className="
                  w-full
                  flex-1
                  min-h-[330px]
                  resize-none
                  rounded-3xl
                  bg-[#f8fcf5]
                  px-5
                  py-5
                  text-[#405b3c]
                  outline-none
                  border
                  border-[#c9dfbd]
                  text-base
                  leading-relaxed
                "
              />
            </div>

            {/* 保存 */}

            <button
              onClick={saveDiary}
              className="
                w-full
                h-[62px]
                shrink-0
                rounded-full
                bg-[#8fb982]
                text-white
                text-lg
                font-bold
                shadow-lg
                hover:scale-[1.02]
                transition
              "
            >
              保存する
            </button>
          </div>
        </div>
      </div>
    );
  }

  // =========================
  // 日記詳細画面
  // =========================

  if (selectedDiary) {
    return (
      <div
        className="
          w-full
          h-full
          relative
          flex
          flex-col
          bg-[url('/homeBackground.png')]
          bg-cover
          bg-center
          overflow-hidden
        "
      >
        {/* ヘッダー */}

        <div
          className="
            h-[100px]
            shrink-0
            flex
            items-center
            justify-between
            px-5
            bg-white/75
            backdrop-blur-md
          "
        >
          <button
            onClick={() =>
              setSelectedDiary(null)
            }
            className="
              px-4
              py-2
              rounded-full
              border
              border-[#6f9168]
              bg-white/80
              text-[#496744]
              font-bold
              shadow
            "
          >
            ← 戻る
          </button>

          <h1
            className="
              text-[30px]
              font-bold
              text-[#52734d]
            "
          >
            日記
          </h1>

          <div className="w-[70px]" />
        </div>

        {/* 詳細 */}

        <div
          className="
            flex-1
            overflow-y-auto
            overflow-x-hidden
            px-5
            py-6
          "
        >
          <div
            className="
              w-full
              min-h-[500px]
              bg-white/90
              rounded-[30px]
              shadow-xl
              border
              border-[#d8e9cf]
              p-6
            "
          >
            <p
              className="
                text-xs
                text-[#789274]
                mb-4
              "
            >
              {selectedDiary.date}
            </p>

            <h2
              className="
                text-2xl
                font-bold
                text-[#486444]
                mb-6
              "
            >
              {selectedDiary.title}
            </h2>

            <div
              className="
                whitespace-pre-wrap
                text-[#536b4e]
                leading-[2]
                text-base
              "
            >
              {selectedDiary.content}
            </div>
          </div>
        </div>
      </div>
    );
  }

  // =========================
  // 日記一覧画面
  // =========================

  return (
    <div
      className="
        w-full
        h-full
        relative
        flex
        flex-col
        bg-[url('/homeBackground.png')]
        bg-cover
        bg-center
        overflow-hidden
      "
    >
      {/* =====================
          ヘッダー
         ===================== */}

      <div
        className="
          h-[110px]
          shrink-0
          flex
          items-center
          justify-between
          px-5
          bg-white/70
          backdrop-blur-md
          border-b
          border-[#d8e9cf]
        "
      >
        {/* ホームボタン */}

        <button
          onClick={back}
          className="
            px-4
            py-2
            rounded-full
            border
            border-[#6f9168]
            bg-white/80
            text-[#496744]
            font-bold
            shadow
            whitespace-nowrap
          "
        >
          ← ホーム
        </button>

        {/* タイトル */}

        <div
          className="
            flex-1
            flex
            items-center
            justify-center
            gap-2
          "
        >
          <span className="text-[34px]">
            📖
          </span>

          <h1
            className="
              text-[36px]
              font-bold
              text-[#52734d]
              tracking-wider
            "
          >
            日記
          </h1>
        </div>

        {/* 左右バランス用 */}

        <div className="w-[80px]" />
      </div>

      {/* =====================
          日記一覧
         ===================== */}

      <div
        className="
          flex-1
          overflow-y-auto
          overflow-x-hidden
          px-4
          pt-5
          pb-[120px]
          space-y-4
        "
      >
        {/* 日記がない場合 */}

        {diaries.length === 0 && (
          <div
            className="
              w-full
              bg-white/85
              rounded-[28px]
              px-6
              py-8
              text-center
              shadow-lg
              border
              border-[#d8e9cf]
            "
          >
            <p
              className="
                text-lg
                font-bold
                text-[#607d5b]
              "
            >
              まだ日記がありません
            </p>

            <p
              className="
                text-sm
                text-[#82947d]
                mt-2
              "
            >
              右下の鉛筆ボタンから
              <br />
              今日の日記を書いてみよう🌿
            </p>
          </div>
        )}

        {/* =====================
            保存された日記
           ===================== */}

        {diaries.map((diary) => (
          <button
            key={diary.id}
            onClick={() =>
              setSelectedDiary(diary)
            }
            className="
              w-full
              text-left
              bg-white/90
              rounded-[28px]
              shadow-lg
              border
              border-[#d5e6cb]
              px-6
              py-5
              hover:scale-[1.01]
              transition
            "
          >
            {/* 上段 */}

            <div
              className="
                flex
                justify-between
                items-center
                gap-3
                mb-3
              "
            >
              <h2
                className="
                  text-lg
                  font-bold
                  text-[#4d6c48]
                  truncate
                "
              >
                {diary.title}
              </h2>

              <p
                className="
                  text-xs
                  text-[#82947d]
                  whitespace-nowrap
                "
              >
                {diary.date}
              </p>
            </div>

            {/* 本文 */}

            <p
              className="
                text-sm
                text-[#657860]
                line-clamp-2
                leading-relaxed
              "
            >
              {diary.content}
            </p>
          </button>
        ))}
      </div>

      {/* =====================
          日記を書くボタン
          アプリ画面の右下
         ===================== */}

      <button
        onClick={() => setIsWriting(true)}
        style={{
          position: "absolute",
          right: "18px",
          bottom: "18px",
          width: "78px",
          height: "78px",
          zIndex: 9999,
        }}
        className="
          rounded-full
          bg-[#c8e5b9]
          border-[4px]
          border-[#2f2f2f]
          shadow-2xl
          flex
          items-center
          justify-center
          text-[34px]
          hover:scale-110
          active:scale-95
          transition
        "
        aria-label="日記を書く"
      >
        ✏️
      </button>
    </div>
  );
}