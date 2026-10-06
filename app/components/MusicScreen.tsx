"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";

type MusicScreenProps = {
  back: () => void;
};

type Category = "all" | "music" | "ambient";

type MusicItem = {
  title: string;
  file: string;
  image: string;
  category: "music" | "ambient";
};

const musicList: MusicItem[] = [
  // =========================
  // ミュージック
  // =========================

  {
    title: "ふわふわ",
    file: "/music/fuwafuwa.wav",
    image: "/もこもこ.png",
    category: "music",
  },

  {
    title: "パンケーキ",
    file: "/music/pancake.wav",
    image: "/パンケーキ.png",
    category: "music",
  },

  {
    title: "Chill",
    file: "/music/chill.mp3",
    image: "/街.png",
    category: "music",
  },

  {
    title: "LoFi",
    file: "/music/lofi.mp3",
    image: "/アロマ.png",
    category: "music",
  },

  {
    title: "Relax",
    file: "/music/relax.mp3",
    image: "/リラックス.png",
    category: "music",
  },

  {
    title: "静かな夜に",
    file: "/music/静かな夜に.mp3",
    image: "/夜.png",
    category: "music",
  },

  {
    title: "夕焼け",
    file: "/music/sunset.mp3",
    image: "/夕日.png",
    category: "music",
  },

  {
    title: "また明日",
    file: "/music/mataashita.mp3",
    image: "/また明日.png",
    category: "music",
  },

  {
    title: "Chill Lo-Fi",
    file: "/music/ChillLo-Fi.mp3",
    image: "/鳥.png",
    category: "music",
  },

  // =========================
  // 環境音
  // =========================

  {
    title: "雨音",
    file: "/music/雨音.mp3",
    image: "/雨.png",
    category: "ambient",
  },

  {
    title: "環境音",
    file: "/music/環境音.mp3",
    image: "/夜の森.png",
    category: "ambient",
  },

  {
    title: "波の音",
    file: "/music/波の音.mp3",
    image: "/波の音.png",
    category: "ambient",
  },

  {
    title: "そよ風",
    file: "/music/そよ風.mp3",
    image: "/そよ風.png",
    category: "ambient",
  },

  {
    title: "焚き火",
    file: "/music/たき火.mp3",
    image: "/火.png",
    category: "ambient",
  },
];

export default function MusicScreen({
  back,
}: MusicScreenProps) {
  const audioRef = useRef<HTMLAudioElement>(null);

  const [category, setCategory] =
    useState<Category>("all");

  const [playing, setPlaying] =
    useState("");

  const [isPaused, setIsPaused] =
    useState(false);

  const [volume, setVolume] =
    useState(0.5);

  // =========================
  // 現在再生中の曲
  // =========================

  const currentMusic = musicList.find(
    (music) => music.file === playing
  );

  // =========================
  // カテゴリーで絞り込み
  // =========================

  const filteredMusic =
    category === "all"
      ? musicList
      : musicList.filter(
          (music) =>
            music.category === category
        );

  // =========================
  // コンポーネント終了時
  // =========================

  useEffect(() => {
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.src = "";
      }
    };
  }, []);

  // =========================
  // 曲を再生
  // =========================

  async function playMusic(file: string) {
    if (!audioRef.current) return;

    // 同じ曲を押した場合
    if (playing === file) {
      if (audioRef.current.paused) {
        try {
          await audioRef.current.play();
          setIsPaused(false);
        } catch (error) {
          console.error(
            "音楽の再生に失敗しました:",
            error
          );
        }
      } else {
        audioRef.current.pause();
        setIsPaused(true);
      }

      return;
    }

    // 現在の音楽を停止
    audioRef.current.pause();

    // 新しい音楽を設定
    audioRef.current.src = file;
    audioRef.current.loop = true;
    audioRef.current.volume = volume;

    try {
      await audioRef.current.play();

      setPlaying(file);
      setIsPaused(false);
    } catch (error) {
      console.error(
        "音楽の再生に失敗しました:",
        error
      );
    }
  }

  // =========================
  // 一時停止・再開
  // =========================

  async function togglePause() {
    if (!audioRef.current) return;

    if (audioRef.current.paused) {
      try {
        await audioRef.current.play();
        setIsPaused(false);
      } catch (error) {
        console.error(
          "音楽の再開に失敗しました:",
          error
        );
      }
    } else {
      audioRef.current.pause();
      setIsPaused(true);
    }
  }

  // =========================
  // 停止
  // =========================

  function stopMusic() {
    if (!audioRef.current) return;

    audioRef.current.pause();
    audioRef.current.currentTime = 0;

    setPlaying("");
    setIsPaused(false);
  }

  // =========================
  // 音量変更
  // =========================

  function changeVolume(value: number) {
    setVolume(value);

    if (audioRef.current) {
      audioRef.current.volume = value;
    }
  }

  return (
    <div
      className="
        w-full
        h-full
        relative
        overflow-hidden
        bg-[url('/MusicBackGraund.png')]
        bg-cover
        bg-center
      "
    >
      {/* ========================= */}
      {/* 背景 */}
      {/* ========================= */}

      <div
        className="
          absolute
          inset-0
          bg-white/20
          pointer-events-none
        "
      />

      {/* ========================= */}
      {/* スクロールエリア */}
      {/* ========================= */}

      <div
        className="
          relative
          z-10
          w-full
          h-full
          overflow-y-auto
          overflow-x-hidden
          pb-40
        "
      >
        {/* ========================= */}
        {/* ホームボタン */}
        {/* ========================= */}

        <button
          type="button"
          onClick={back}
          className="
            absolute
            top-1
            left-4
            z-30
            p-0
            m-0
            border-0
            bg-transparent
            shadow-none
            outline-none
            appearance-none
            transition
            hover:scale-105
            active:scale-95
          "
        >
          <Image
            src="/ホームUI.png"
            alt="ホーム"
            width={100}
            height={50}
            className="
              block
              w-[100px]
              h-auto
              object-contain
            "
            priority
          />
        </button>

        {/* ========================= */}
        {/* 音楽タイトル */}
        {/* ========================= */}

        <div
          className="
            relative
            z-10
            flex
            justify-center
            pt-8
            pointer-events-none
          "
        >
          <Image
            src="/音楽UI.png"
            alt="音楽"
            width={300}
            height={100}
            className="
              w-[100px]
              h-auto
              object-contain
            "
            priority
          />
        </div>

        {/* ========================= */}
        {/* カテゴリー */}
        {/* ========================= */}

        <div
          className="
            relative
            z-10
            flex
            justify-center
            items-center
            gap-2
            px-3
            mt-3
            mb-5
            flex-wrap
          "
        >
          <button
            type="button"
            onClick={() => setCategory("all")}
            className={`
              rounded-full
              border
              px-4
              py-1.5
              text-sm
              font-semibold
              shadow-sm
              transition

              ${
                category === "all"
                  ? "bg-[#c9e6ba] border-[#91b77f] text-[#40583a]"
                  : "bg-white/85 border-[#c5dcb8] text-[#64755d]"
              }
            `}
          >
            全て
          </button>

          <button
            type="button"
            onClick={() => setCategory("music")}
            className={`
              rounded-full
              border
              px-4
              py-1.5
              text-sm
              font-semibold
              shadow-sm
              transition

              ${
                category === "music"
                  ? "bg-[#c9e6ba] border-[#91b77f] text-[#40583a]"
                  : "bg-white/85 border-[#c5dcb8] text-[#64755d]"
              }
            `}
          >
            🎵 ミュージック
          </button>

          <button
            type="button"
            onClick={() => setCategory("ambient")}
            className={`
              rounded-full
              border
              px-4
              py-1.5
              text-sm
              font-semibold
              shadow-sm
              transition

              ${
                category === "ambient"
                  ? "bg-[#c9e6ba] border-[#91b77f] text-[#40583a]"
                  : "bg-white/85 border-[#c5dcb8] text-[#64755d]"
              }
            `}
          >
            🌿 環境音
          </button>
        </div>

        {/* ========================= */}
        {/* 音楽一覧 */}
        {/* ========================= */}

        <div
          className="
            relative
            z-10
            w-full
            px-3
            pb-8
          "
        >
          <div
            className="
              grid
              grid-cols-2
              gap-x-4
              gap-y-6
              max-w-[600px]
              mx-auto
            "
          >
            {filteredMusic.map((music) => {
              const isPlaying =
                playing === music.file;

              return (
                <div
                  key={music.file}
                  className={`
                    w-full
                    min-w-0
                    rounded-[26px]
                    overflow-hidden
                    border-b-2
                    border-[#b8cfae]
                    shadow-md
                    transition-all
                    duration-200

                    ${
                      isPlaying
                        ? "bg-[#f1faec]/95 shadow-lg"
                        : "bg-white/85"
                    }
                  `}
                >
                  {/* 曲の画像 */}

                  <div
                    className="
                      p-3
                      pb-1
                    "
                  >
                    <div
                      className="
                        w-full
                        aspect-square
                        overflow-hidden
                        rounded-[22px]
                      "
                    >
                      <img
                        src={music.image}
                        alt={music.title}
                        className="
                          block
                          w-full
                          h-full
                          object-cover
                        "
                      />
                    </div>
                  </div>

                  {/* 曲情報 */}

                  <div
                    className="
                      px-3
                      pt-2
                      pb-3
                      text-center
                    "
                  >
                    <p
                      className="
                        mb-1.5
                        text-xs
                        text-[#76916b]
                      "
                    >
                      {music.category === "ambient"
                        ? "🌿 環境音"
                        : "🎵 ミュージック"}
                    </p>

                    <p
                      className="
                        mb-2
                        truncate
                        text-base
                        font-semibold
                        text-[#4d6545]
                      "
                    >
                      {music.title}
                    </p>

                    {/* 再生ボタン */}

                    <button
                      type="button"
                      onClick={() =>
                        playMusic(music.file)
                      }
                      className={`
                        block
                        w-[88%]
                        mx-auto
                        rounded-full
                        py-1.5
                        text-xs
                        font-bold
                        shadow-sm
                        transition

                        ${
                          isPlaying
                            ? "bg-[#91b980] text-white"
                            : "bg-[#cbe7bd] text-[#496341]"
                        }
                      `}
                    >
                      {isPlaying
                        ? isPaused
                          ? "▶ 再開"
                          : "Ⅱ 一時停止"
                        : "▶ 再生"}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* ========================= */}
      {/* 再生中UI */}
      {/* ========================= */}

      {currentMusic && (
        <div
          className="
            fixed
            bottom-0
            left-0
            right-0
            z-50
            px-3
            pb-3
            pointer-events-none
          "
        >
          <div
            className="
              pointer-events-auto
              max-w-[600px]
              mx-auto
              rounded-[28px]
              border
              border-[#b5d5a7]
              bg-[#f5faef]/95
              backdrop-blur-xl
              shadow-[0_-4px_20px_rgba(100,130,80,0.25)]
              p-3
            "
          >
            <div
              className="
                flex
                items-center
                gap-3
              "
            >
              <img
                src={currentMusic.image}
                alt={currentMusic.title}
                className="
                  w-14
                  h-14
                  rounded-2xl
                  object-cover
                  flex-shrink-0
                "
              />

              <div
                className="
                  flex-1
                  min-w-0
                "
              >
                <p
                  className="
                    text-xs
                    text-[#79906f]
                    mb-1
                  "
                >
                  {isPaused
                    ? "一時停止中"
                    : "再生中"}
                </p>

                <p
                  className="
                    truncate
                    font-bold
                    text-[#4c6544]
                  "
                >
                  {currentMusic.title}
                </p>
              </div>

              <button
                type="button"
                onClick={togglePause}
                className="
                  w-11
                  h-11
                  rounded-full
                  bg-[#c5e2b7]
                  text-[#496341]
                  text-lg
                  font-bold
                  shadow-sm
                  flex
                  items-center
                  justify-center
                  flex-shrink-0
                "
              >
                {isPaused ? "▶" : "Ⅱ"}
              </button>

              <button
                type="button"
                onClick={stopMusic}
                className="
                  w-11
                  h-11
                  rounded-full
                  bg-[#80a96f]
                  text-white
                  font-bold
                  shadow-sm
                  flex
                  items-center
                  justify-center
                  flex-shrink-0
                "
              >
                ■
              </button>
            </div>

            {/* 音量 */}

            <div
              className="
                flex
                items-center
                gap-3
                mt-3
                px-1
              "
            >
              <span className="text-base">
                🔊
              </span>

              <input
                type="range"
                min="0"
                max="1"
                step="0.01"
                value={volume}
                onChange={(e) =>
                  changeVolume(
                    Number(e.target.value)
                  )
                }
                className="
                  flex-1
                  accent-[#88ad78]
                "
              />

              <span
                className="
                  w-9
                  text-right
                  text-xs
                  text-[#62795a]
                "
              >
                {Math.round(volume * 100)}
              </span>
            </div>
          </div>
        </div>
      )}

      {/* ========================= */}
      {/* Audio */}
      {/* ========================= */}

      <audio
        ref={audioRef}
        preload="auto"
      />
    </div>
  );
}