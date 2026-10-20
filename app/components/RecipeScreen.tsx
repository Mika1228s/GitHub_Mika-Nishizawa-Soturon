"use client";

import { useState, useEffect } from "react";

type RecipeScreenProps = {
  back: () => void;
};

type Recipe = {
  id: number;
  title: string;
  image: string;
};

const recipeList: Recipe[] = [
  { id: 1, title: "あさり味噌汁でぐっすり快眠", image: "/あさり味噌汁でぐっすり快眠.png" },
  { id: 2, title: "ウズラの卵", image: "/ウズラの卵.jpg" },
  { id: 3, title: "カニ缶とアボカドの栄養サラダ", image: "/カニ缶とアボカドの栄養サラダ.png" },
  { id: 4, title: "わかめスープ", image: "/かわいいわかめスープレシピ帖.png" },
  { id: 5, title: "とうもろこしで体すっきり", image: "/とうもろこしで体すっきり健康ガイド.png" },
  { id: 6, title: "ほうれん草とツナの中華炒め", image: "/ほうれん草とツナの中華炒めレシピ.png" },
  { id: 7, title: "ラタトゥイユ", image: "/ラタトゥイユ.jpg" },
  { id: 8, title: "鶏ハムでビタミンB6", image: "/鶏ハムでビタミンB6レシピ_VEVENT.png" },
  { id: 9, title: "鶏肉の水炊き", image: "/鶏肉の水炊き.jpg" },
  { id: 10, title: "豚肉と納豆の温玉丼", image: "/豚肉と納豆の温玉丼レシピ%20恒一.png" },
];

export default function RecipeScreen({ back }: RecipeScreenProps) {
  const [selectedRecipe, setSelectedRecipe] = useState<Recipe | null>(null);
  const [imageError, setImageError] = useState(false);

  const openRecipe = (recipe: Recipe) => {
    setSelectedRecipe(recipe);
    setImageError(false);
  };

  const closeRecipe = () => {
    setSelectedRecipe(null);
    setImageError(false);
  };

  useEffect(() => {
    if (!selectedRecipe) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        closeRecipe();
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [selectedRecipe]);

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
      {/* ヘッダー */}
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
            className="block h-auto w-[100px] object-contain"
          />
        </button>

        <h1 className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 whitespace-nowrap text-[30px] font-bold text-[#557548]">
          レシピ
        </h1>
      </header>

      {/* レシピ一覧 */}
      <main
        className="
          relative
          z-10
          min-h-0
          flex-1
          overflow-x-hidden
          overflow-y-auto
          px-2
          pb-6
          pt-3
        "
      >
        <div className="flex w-full flex-col gap-2">
          {recipeList.map((recipe) => (
            <div
              key={recipe.id}
              className="
                flex
                min-h-[88px]
                w-full
                items-center
                justify-between
                rounded-[24px]
                border
                border-[#c8dcae]
                bg-[#eef5df]/95
                px-4
                py-3
                shadow-sm
              "
            >
              <div className="flex min-w-0 flex-1 items-center pr-2">
                <span className="break-words text-[18px] font-medium text-[#557548]">
                  {recipe.title}
                </span>
              </div>

              <button
                type="button"
                onClick={() => openRecipe(recipe)}
                className="
                  flex
                  h-[58px]
                  w-[58px]
                  shrink-0
                  items-center
                  justify-center
                  rounded-full
                  border
                  border-[#a9c77d]
                  bg-[#f5faea]
                  text-[30px]
                  leading-none
                  text-[#557548]
                  shadow-sm
                  transition-transform
                  active:scale-90
                "
                aria-label={`${recipe.title}を見る`}
              >
                ➤
              </button>
            </div>
          ))}
        </div>

        <div className="h-8" />
      </main>

      {/* レシピ画像表示：豆知識画面と同じ配置方式 */}
      {selectedRecipe && (
        <div
          onClick={closeRecipe}
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            width: "100%",
            height: "100%",
            zIndex: 9999,
            backgroundColor: "#e8f0df",
            overflow: "hidden",
          }}
        >
          {/* レシピ画像 */}
          {imageError ? (
            <div
              style={{
                position: "absolute",
                inset: 0,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                padding: "24px",
                textAlign: "center",
                color: "#557548",
                overflowWrap: "anywhere",
              }}
            >
              <p style={{ fontSize: "20px", fontWeight: "bold" }}>
                画像を表示できません
              </p>
              <p style={{ marginTop: "12px", fontSize: "14px" }}>
                publicフォルダ内のファイル名と保存場所を確認してください。
              </p>
              <p style={{ marginTop: "8px", fontSize: "12px" }}>
                {selectedRecipe.image}
              </p>
            </div>
          ) : (
            <img
              key={selectedRecipe.image}
              src={selectedRecipe.image}
              alt={selectedRecipe.title}
              onError={() => setImageError(true)}
              onClick={(event) => event.stopPropagation()}
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
                objectFit: "contain",
                objectPosition: "center center",
                display: "block",
                margin: 0,
                padding: 0,
              }}
            />
          )}

          {/* ×ボタン：アプリ画面の右上 */}
          <button
            type="button"
            onClick={(event) => {
              event.stopPropagation();
              closeRecipe();
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
              boxSizing: "border-box",
              borderRadius: "9999px",
              border: "1px solid #777777",
              backgroundColor: "rgba(255, 255, 255, 0.95)",
              color: "#557548",
              fontSize: "34px",
              fontWeight: "400",
              lineHeight: "1",
              padding: 0,
              margin: 0,
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
