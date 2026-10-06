"use client";

type MeditationScreenProps = {
  back: () => void;
};

export default function MeditationScreen({
  back,
}: MeditationScreenProps) {
  return (
    <div className="relative flex h-full w-full flex-col overflow-hidden bg-[#e8f0e9]">
      {/* 上部ヘッダー */}
      <div className="relative z-20 flex h-[90px] shrink-0 items-center">
        {/* ホームボタン */}
        <button
          type="button"
          onClick={back}
          className="absolute left-4 top-3 bg-transparent border-0 p-0"
          aria-label="ホームへ戻る"
        >
          <img
            src="/ホームUI.png"
            alt="ホーム"
            className="h-auto w-[100px]"
          />
        </button>

        {/* タイトル */}
        <h1 className="w-full text-center text-[28px] font-bold text-[#557548]">
          瞑想
        </h1>
      </div>

      {/* 瞑想画像 */}
      <div className="relative min-h-0 flex-1 overflow-y-auto">
        <img
          src="/瞑想画像.png"
          alt="瞑想の説明"
          className="block h-auto min-h-full w-full object-cover object-top"
        />
      </div>
    </div>
  );
}