"use client";

import Image from "next/image";
import { useState } from "react";

type HomeScreenProps = {
  back: () => void;

  openChat: () => void;
  openMusic: () => void;
  openDiary: () => void;

  openClock?: () => void;
  openTrivia?: () => void;
  openWeather?: () => void;
  openMeditation?: () => void;
  openRecipe?: () => void;
  openCustom?: () => void;
  openBackground?: () => void;
  openSettings?: () => void;
};

type AppType =
  | "clock"
  | "trivia"
  | "weather"
  | "meditation"
  | "recipe"
  | "custom"
  | "background"
  | "settings"
  | null;

type AppInfo = {
  icon: string;
  title: string;
};

const appInfo: Record<
  Exclude<AppType, null>,
  AppInfo
> = {
  clock: {
    icon: "🕐",
    title: "時計",
  },

  trivia: {
    icon: "💡",
    title: "豆知識",
  },

  weather: {
    icon: "☀️",
    title: "天気",
  },

  meditation: {
    icon: "🧘",
    title: "瞑想",
  },

  recipe: {
    icon: "🍳",
    title: "レシピ",
  },

  custom: {
    icon: "✨",
    title: "カスタム",
  },

  background: {
    icon: "🖼️",
    title: "背景画像変更",
  },

  settings: {
    icon: "⚙️",
    title: "設定",
  },
};

export default function HomeScreen({
  back,
  openChat,
  openMusic,
  openDiary,
  openClock,
  openTrivia,
  openWeather,
  openMeditation,
  openRecipe,
  openCustom,
  openBackground,
  openSettings,
}: HomeScreenProps) {
  const [isOtherMenuOpen, setIsOtherMenuOpen] =
    useState(false);

  const [selectedApp, setSelectedApp] =
    useState<AppType>(null);

  // =========================
  // その他のアプリを開く
  // =========================

  function handleOpenApp(
    app: AppType,
    openFunction?: () => void
  ) {
    setIsOtherMenuOpen(false);

    if (openFunction) {
      openFunction();
      return;
    }

    setSelectedApp(app);
  }

  // =========================
  // 時計の仮画面
  // =========================

  if (selectedApp === "clock") {
    return (
      <div
        className="
          w-full
          h-full
          relative
          bg-[url('/homeBackground.png')]
          bg-cover
          bg-center
          overflow-hidden
        "
      >
        <button
          type="button"
          onClick={() => setSelectedApp(null)}
          className="
            absolute
            top-6
            left-6
            z-50
            px-4
            py-2
            rounded-full
            bg-white/90
            border
            border-[#6f9168]
            text-[#496744]
            font-bold
            shadow
            hover:scale-105
            active:scale-95
            transition
          "
        >
          ← 戻る
        </button>

        <div
          className="
            w-full
            h-full
            flex
            items-center
            justify-center
            px-5
          "
        >
          <div
            className="
              w-full
              max-w-[380px]
              bg-white/90
              rounded-[35px]
              shadow-xl
              border
              border-[#d8e9cf]
              p-8
              text-center
            "
          >
            <div className="text-[55px]">
              🕐
            </div>

            <h1
              className="
                text-[28px]
                font-bold
                text-[#52734d]
                mt-2
              "
            >
              時計
            </h1>

            <div
              className="
                text-[45px]
                font-bold
                text-[#52734d]
                mt-6
              "
            >
              時計
            </div>

            <p
              className="
                mt-4
                text-[#789274]
              "
            >
              時計の画面です
            </p>
          </div>
        </div>
      </div>
    );
  }

  // =========================
  // その他アプリの仮画面
  // =========================

  if (selectedApp !== null) {
    const currentAppInfo =
      appInfo[selectedApp];

    return (
      <div
        className="
          w-full
          h-full
          relative
          bg-[url('/homeBackground.png')]
          bg-cover
          bg-center
          overflow-hidden
        "
      >
        <button
          type="button"
          onClick={() => setSelectedApp(null)}
          className="
            absolute
            top-6
            left-6
            z-50
            px-4
            py-2
            rounded-full
            bg-white/90
            border
            border-[#6f9168]
            text-[#496744]
            font-bold
            shadow
            hover:scale-105
            active:scale-95
            transition
          "
        >
          ← 戻る
        </button>

        <div
          className="
            w-full
            h-full
            flex
            items-center
            justify-center
            px-5
          "
        >
          <div
            className="
              bg-white/90
              rounded-[35px]
              shadow-xl
              border
              border-[#d8e9cf]
              p-10
              text-center
            "
          >
            <div className="text-[70px]">
              {currentAppInfo.icon}
            </div>

            <h1
              className="
                mt-4
                text-2xl
                font-bold
                text-[#52734d]
              "
            >
              {currentAppInfo.title}
            </h1>

            <p
              className="
                mt-3
                text-[#789274]
              "
            >
              この機能の画面を
              <br />
              ここに作っていきます。
            </p>
          </div>
        </div>
      </div>
    );
  }

  // =========================
  // ホーム画面
  // =========================

  return (
    <div
      className="
        w-full
        h-full
        relative
        overflow-hidden
      "
    >
      {/* =========================
          ホーム背景動画
         ========================= */}

      <video
        className="
          absolute
          inset-0
          z-0
          w-full
          h-full
          object-cover
        "
        src="/背景動画.MP4"
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
      />

      {/* 背景を少しだけ見やすくする */}
      <div
        className="
          absolute
          inset-0
          z-10
          bg-white/10
          pointer-events-none
        "
      />

      {/* =========================
          ホーム画面の中身
         ========================= */}

      <div
        className="
          relative
          z-20
          w-full
          h-full
        "
      >
        {/* =========================
            戻るボタン
           ========================= */}

        <div
          className="
            absolute
            top-6
            left-6
            z-40
          "
        >
          <button
            type="button"
            onClick={back}
            className="
              bg-black/30
              px-4
              py-2
              rounded-full
              text-white
              hover:bg-black/50
              transition
            "
          >
            ← 戻る
          </button>
        </div>

        {/* =========================
            その他ボタン
           ========================= */}

        <button
          type="button"
          onClick={() =>
            setIsOtherMenuOpen((prev) => !prev)
          }
          style={{
            position: "absolute",
            top: "24px",
            right: "24px",
            width: "64px",
            height: "64px",
            zIndex: 9999,
          }}
          className="
            rounded-full
            bg-white/90
            backdrop-blur-sm
            shadow-xl
            border-[3px]
            border-[#6f8f68]
            flex
            items-center
            justify-center
            hover:scale-110
            active:scale-95
            transition
          "
          aria-label="その他のアプリ"
        >
          <span className="text-[30px]">
            ☰
          </span>
        </button>

        {/* =========================
            その他アプリメニュー
           ========================= */}

        {isOtherMenuOpen && (
          <div
            style={{
              position: "absolute",
              top: "98px",
              right: "24px",
              zIndex: 9998,
            }}
            className="
              w-[330px]
              max-w-[calc(100vw-32px)]
              bg-white/95
              backdrop-blur-md
              rounded-[28px]
              shadow-2xl
              border
              border-[#cbdcc5]
              p-4
            "
          >
            <div
              className="
                flex
                items-center
                justify-between
                mb-3
                px-2
              "
            >
              <h2
                className="
                  text-lg
                  font-bold
                  text-[#52734d]
                "
              >
                その他のアプリ
              </h2>

              <button
                type="button"
                onClick={() =>
                  setIsOtherMenuOpen(false)
                }
                className="
                  border-0
                  bg-[#edf4e9]
                  w-8
                  h-8
                  rounded-full
                  text-[#5d7657]
                  hover:scale-110
                  transition
                "
                aria-label="メニューを閉じる"
              >
                ×
              </button>
            </div>

            <div
              className="
                grid
                grid-cols-2
                gap-3
              "
            >
              {/* 時計 */}

              <button
                type="button"
                onClick={() =>
                  handleOpenApp(
                    "clock",
                    openClock
                  )
                }
                className="
                  h-[90px]
                  rounded-2xl
                  bg-[#eef7ea]
                  border
                  border-[#c9ddc2]
                  flex
                  flex-col
                  items-center
                  justify-center
                  gap-1
                  hover:scale-105
                  transition
                "
              >
                <span className="text-[30px]">
                  🕐
                </span>

                <span
                  className="
                    text-sm
                    font-bold
                    text-[#52734d]
                  "
                >
                  時計
                </span>
              </button>

              {/* 豆知識 */}

              <button
                type="button"
                onClick={() =>
                  handleOpenApp(
                    "trivia",
                    openTrivia
                  )
                }
                className="
                  h-[90px]
                  rounded-2xl
                  bg-[#fff7df]
                  border
                  border-[#eadba9]
                  flex
                  flex-col
                  items-center
                  justify-center
                  gap-1
                  hover:scale-105
                  transition
                "
              >
                <span className="text-[30px]">
                  💡
                </span>

                <span
                  className="
                    text-sm
                    font-bold
                    text-[#806b37]
                  "
                >
                  豆知識
                </span>
              </button>

              {/* 天気 */}

              <button
                type="button"
                onClick={() =>
                  handleOpenApp(
                    "weather",
                    openWeather
                  )
                }
                className="
                  h-[90px]
                  rounded-2xl
                  bg-[#eaf5fb]
                  border
                  border-[#c5dfe9]
                  flex
                  flex-col
                  items-center
                  justify-center
                  gap-1
                  hover:scale-105
                  transition
                "
              >
                <span className="text-[30px]">
                  ☀️
                </span>

                <span
                  className="
                    text-sm
                    font-bold
                    text-[#52717d]
                  "
                >
                  天気
                </span>
              </button>

              {/* 瞑想 */}

              <button
                type="button"
                onClick={() =>
                  handleOpenApp(
                    "meditation",
                    openMeditation
                  )
                }
                className="
                  h-[90px]
                  rounded-2xl
                  bg-[#f3ecfa]
                  border
                  border-[#d9cbe7]
                  flex
                  flex-col
                  items-center
                  justify-center
                  gap-1
                  hover:scale-105
                  transition
                "
              >
                <span className="text-[30px]">
                  🧘
                </span>

                <span
                  className="
                    text-sm
                    font-bold
                    text-[#725d82]
                  "
                >
                  瞑想
                </span>
              </button>

              {/* レシピ */}

              <button
                type="button"
                onClick={() =>
                  handleOpenApp(
                    "recipe",
                    openRecipe
                  )
                }
                className="
                  h-[90px]
                  rounded-2xl
                  bg-[#fff0e7]
                  border
                  border-[#ead2c1]
                  flex
                  flex-col
                  items-center
                  justify-center
                  gap-1
                  hover:scale-105
                  transition
                "
              >
                <span className="text-[30px]">
                  🍳
                </span>

                <span
                  className="
                    text-sm
                    font-bold
                    text-[#805f4d]
                  "
                >
                  レシピ
                </span>
              </button>

              {/* カスタム */}

              <button
                type="button"
                onClick={() =>
                  handleOpenApp(
                    "custom",
                    openCustom
                  )
                }
                className="
                  h-[90px]
                  rounded-2xl
                  bg-[#f0f0f0]
                  border
                  border-[#d2d2d2]
                  flex
                  flex-col
                  items-center
                  justify-center
                  gap-1
                  hover:scale-105
                  transition
                "
              >
                <span className="text-[30px]">
                  ✨
                </span>

                <span
                  className="
                    text-sm
                    font-bold
                    text-[#666666]
                  "
                >
                  カスタム
                </span>
              </button>

              {/* 背景画像変更 */}

              <button
                type="button"
                onClick={() =>
                  handleOpenApp(
                    "background",
                    openBackground
                  )
                }
                className="
                  h-[90px]
                  rounded-2xl
                  bg-[#e9f5f0]
                  border
                  border-[#c7ded3]
                  flex
                  flex-col
                  items-center
                  justify-center
                  gap-1
                  hover:scale-105
                  transition
                "
              >
                <span className="text-[30px]">
                  🖼️
                </span>

                <span
                  className="
                    text-sm
                    font-bold
                    text-[#527567]
                  "
                >
                  背景画像
                </span>
              </button>

              {/* 設定 */}

              <button
                type="button"
                onClick={() =>
                  handleOpenApp(
                    "settings",
                    openSettings
                  )
                }
                className="
                  h-[90px]
                  rounded-2xl
                  bg-[#eeeeee]
                  border
                  border-[#d2d2d2]
                  flex
                  flex-col
                  items-center
                  justify-center
                  gap-1
                  hover:scale-105
                  transition
                "
              >
                <span className="text-[30px]">
                  ⚙️
                </span>

                <span
                  className="
                    text-sm
                    font-bold
                    text-[#666666]
                  "
                >
                  設定
                </span>
              </button>
            </div>
          </div>
        )}

        {/* =========================
            タスクバー
           ========================= */}

        <div
          className="
            absolute
            -bottom-[30px]
            left-1/2
            -translate-x-1/2
            w-[400px]
            h-[200px]
            z-30
          "
        >
          <Image
            src="/タスクバー.png"
            alt="タスクバー"
            fill
            sizes="400px"
            className="object-cover"
            priority
            unoptimized
          />

          {/* =========================
              アプリアイコン
             ========================= */}

          <div
            className="
              absolute
              top-[30px]
              left-0
              w-full
              flex
              justify-around
              items-start
              px-8
            "
          >
            {/* チャット */}

            <button
              type="button"
              onClick={openChat}
              className="
                border-0
                bg-transparent
                p-0
                m-0
                appearance-none
                outline-none
                shadow-none
                hover:scale-110
                active:scale-95
                transition
                flex
                flex-col
                items-center
                justify-center
                cursor-pointer
              "
            >
              <Image
                src="/トーク用アイコン.png"
                alt="チャット"
                width={80}
                height={80}
                priority
                unoptimized
                className="block"
              />

              <span
                className="
                  mt-1
                  text-[14px]
                  font-medium
                  text-[#52734d]
                  whitespace-nowrap
                "
              >
                チャット
              </span>
            </button>

            {/* 音楽 */}

            <button
              type="button"
              onClick={openMusic}
              className="
                border-0
                bg-transparent
                p-0
                m-0
                appearance-none
                outline-none
                shadow-none
                hover:scale-110
                active:scale-95
                transition
                flex
                flex-col
                items-center
                justify-center
                cursor-pointer
              "
            >
              <Image
                src="/音楽アイコン.png"
                alt="音楽"
                width={80}
                height={80}
                priority
                unoptimized
                className="block"
              />

              <span
                className="
                  mt-1
                  text-[14px]
                  font-medium
                  text-[#52734d]
                  whitespace-nowrap
                "
              >
                音楽
              </span>
            </button>

            {/* 日記 */}

            <button
              type="button"
              onClick={openDiary}
              className="
                border-0
                bg-transparent
                p-0
                m-0
                appearance-none
                outline-none
                shadow-none
                hover:scale-110
                active:scale-95
                transition
                flex
                flex-col
                items-center
                justify-center
                cursor-pointer
              "
            >
              <Image
                src="/記録アイコン.png"
                alt="日記"
                width={80}
                height={80}
                priority
                unoptimized
                className="block"
              />

              <span
                className="
                  mt-1
                  text-[14px]
                  font-medium
                  text-[#52734d]
                  whitespace-nowrap
                "
              >
                日記
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}