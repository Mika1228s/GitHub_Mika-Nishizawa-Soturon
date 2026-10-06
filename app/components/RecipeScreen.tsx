"use client";

import { useState } from "react";

type RecipeScreenProps = {
  back: () => void;
};

type Recipe = {
  id: number;
  title: string;
  image: string;
};

const recipeList: Recipe[] = [
  {
    id: 1,
    title: "レシピ1",
    image: "/recipe/レシピ1.png",
  },
  {
    id: 2,
    title: "レシピ2",
    image: "/recipe/レシピ2.png",
  },
  {
    id: 3,
    title: "レシピ3",
    image: "/recipe/レシピ3.png",
  },
  {
    id: 4,
    title: "レシピ4",
    image: "/recipe/レシピ4.png",
  },
  {
    id: 5,
    title: "レシピ5",
    image: "/recipe/レシピ5.png",
  },
  {
    id: 6,
    title: "レシピ6",
    image: "/recipe/レシピ6.png",
  },
  {
    id: 7,
    title: "レシピ7",
    image: "/recipe/レシピ7.png",
  },
  {
    id: 8,
    title: "レシピ8",
    image: "/recipe/レシピ8.png",
  },
  {
    id: 9,
    title: "レシピ9",
    image: "/recipe/レシピ9.png",
  },
  {
    id: 10,
    title: "レシピ10",
    image: "/recipe/レシピ10.png",
  },
];

export default function RecipeScreen({
  back,
}: RecipeScreenProps) {
  const [selectedRecipe, setSelectedRecipe] =
    useState<Recipe | null>(null);

  return (
    <div className="relative flex h-full w-full min-h-0 flex-col overflow-hidden bg-[url('/homeBackground.png')] bg-cover bg-center bg-no-repeat">
      
      {/* =========================
          上部
      ========================= */}
      <div className="relative z-20 h-[90px] shrink-0">
        
        {/* ホームボタン */}
        <button
          type="button"
          onClick={back}
          className="absolute left-4 top-3 z-30 border-0 bg-transparent p-0"
          aria-label="ホームへ戻る"
        >
          <img
            src="/ホームUI.png"
            alt="ホーム"
            className="h-auto w-[100px]"
          />
        </button>

        {/* タイトル */}
        <h1 className="flex h-full items-center justify-center pt-1 text-[30px] font-bold text-[#557548]">
          レシピ
        </h1>
      </div>

      {/* =========================
          レシピ一覧
      ========================= */}
      <div className="min-h-0 flex-1 overflow-x-hidden overflow-y-auto px-2 pb-6">
        <div className="flex w-full flex-col gap-2">
          
          {recipeList.map((recipe) => (
            <div
              key={recipe.id}
              className="flex min-h-[88px] w-full items-center justify-between rounded-[24px] border border-[#c8dcae] bg-[#eef5df]/95 px-4 py-3 shadow-sm"
            >
              {/* レシピ名 */}
              <div className="flex items-center">
                <span className="text-[21px] font-medium text-[#557548]">
                  {recipe.title}
                </span>
              </div>

              {/* ➤ボタン */}
              <button
                type="button"
                onClick={() => setSelectedRecipe(recipe)}
                className="flex h-[58px] w-[58px] shrink-0 items-center justify-center rounded-full border border-[#a9c77d] bg-[#f5faea] text-[30px] leading-none text-[#557548] shadow-sm transition-transform active:scale-90"
                aria-label={`${recipe.title}を見る`}
              >
                ➤
              </button>
            </div>
          ))}

        </div>
      </div>

      {/* =========================
          レシピ画像
      ========================= */}
      {selectedRecipe && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 p-3">
          
          {/* 閉じるボタン */}
          <button
            type="button"
            onClick={() => setSelectedRecipe(null)}
            className="absolute right-4 top-4 z-[110] flex h-[50px] w-[50px] items-center justify-center rounded-full bg-white text-[32px] font-bold leading-none text-[#557548] shadow-lg"
            aria-label="閉じる"
          >
            ×
          </button>

          {/* 画像 */}
          <div className="flex max-h-[94vh] max-w-[94vw] items-center justify-center overflow-hidden rounded-2xl bg-white shadow-2xl">
            <img
              src={selectedRecipe.image}
              alt={selectedRecipe.title}
              className="block max-h-[94vh] max-w-[94vw] object-contain"
            />
          </div>
        </div>
      )}
    </div>
  );
}