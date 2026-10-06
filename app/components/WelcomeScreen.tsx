"use client";

type WelcomeScreenProps = {
  onStart: () => void;
};

export default function WelcomeScreen({ onStart }: WelcomeScreenProps) {
  return (
    <div
      className="relative h-full w-full overflow-hidden bg-cover bg-center"
      style={{
        backgroundImage: "url('/roomGreen.png')",
      }}
    >
      {/* ロゴ */}
      <div className="absolute left-1/2 top-[-15px] z-20 -translate-x-1/2">
        <img
          src="/ロゴアイコン.png"
          alt="アプリロゴ"
          width={280}
          height={140}
          className="block h-auto w-[280px] object-contain"
        />
      </div>

      {/* 女の子 */}
      <div
        className="
          absolute
          left-1/2
          top-[61%]
          z-10
          -translate-x-1/2
          -translate-y-1/2
        "
      >
        <img
          src="/galeGreen.png"
          alt="女の子"
          width={280}
          height={290}
          className="block object-contain"
        />
      </div>

      {/* スタートボタン */}
      <div
        className="
          absolute
          bottom-[80px]
          left-1/2
          z-20
          w-[320px]
          -translate-x-1/2
          px-5
        "
      >
        <button
          type="button"
          onClick={onStart}
          aria-label="スタート"
          className="
            block
            w-full
            border-0
            bg-transparent
            p-0
            shadow-none
            outline-none
            transition
            hover:scale-105
            active:scale-95
          "
        >
          <img
            src="/スタートボタンUI.png"
            alt="スタート"
            className="block h-auto w-full object-contain"
          />
        </button>
      </div>
    </div>
  );
}