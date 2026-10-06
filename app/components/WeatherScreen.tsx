"use client";

import { useEffect, useState } from "react";

type WeatherScreenProps = {
  back: () => void;
};

type CurrentWeather = {
  temperature_2m: number;
  apparent_temperature: number;
  weather_code: number;
  precipitation_probability?: number;
};

type DailyWeather = {
  time: string[];
  weather_code: number[];
  temperature_2m_max: number[];
  temperature_2m_min: number[];
  precipitation_probability_max: number[];
};

type WeatherData = {
  current: CurrentWeather;
  daily: DailyWeather;
};

type WeatherInfo = {
  icon: string;
  text: string;
};

/* ==========================================
   天気コード → 天気アイコン・名前
========================================== */

function getWeatherInfo(code: number): WeatherInfo {
  if (code === 0) {
    return {
      icon: "☀️",
      text: "快晴",
    };
  }

  if (code === 1) {
    return {
      icon: "🌤️",
      text: "晴れ",
    };
  }

  if (code === 2) {
    return {
      icon: "⛅",
      text: "くもり時々晴れ",
    };
  }

  if (code === 3) {
    return {
      icon: "☁️",
      text: "くもり",
    };
  }

  if (code === 45 || code === 48) {
    return {
      icon: "🌫️",
      text: "霧",
    };
  }

  if (code >= 51 && code <= 57) {
    return {
      icon: "🌦️",
      text: "霧雨",
    };
  }

  if (code >= 61 && code <= 67) {
    return {
      icon: "🌧️",
      text: "雨",
    };
  }

  if (code >= 71 && code <= 77) {
    return {
      icon: "❄️",
      text: "雪",
    };
  }

  if (code >= 80 && code <= 82) {
    return {
      icon: "🌦️",
      text: "にわか雨",
    };
  }

  if (code === 85 || code === 86) {
    return {
      icon: "🌨️",
      text: "にわか雪",
    };
  }

  if (code >= 95 && code <= 99) {
    return {
      icon: "⛈️",
      text: "雷雨",
    };
  }

  return {
    icon: "🌤️",
    text: "晴れ",
  };
}

/* ==========================================
   日付表示
========================================== */

function formatDate(dateString: string) {
  const date = new Date(
    `${dateString}T00:00:00+09:00`
  );

  const weekdays = [
    "日",
    "月",
    "火",
    "水",
    "木",
    "金",
    "土",
  ];

  return {
    month: date.getMonth() + 1,
    day: date.getDate(),
    weekday: weekdays[date.getDay()],
  };
}

/* ==========================================
   WeatherScreen
========================================== */

export default function WeatherScreen({
  back,
}: WeatherScreenProps) {
  const [weather, setWeather] =
    useState<WeatherData | null>(null);

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState("");

  /* ==========================================
     天気情報を取得
  ========================================== */

  useEffect(() => {
    async function fetchWeather() {
      try {
        setLoading(true);
        setError("");

        /* --------------------------------------
           上田市の位置を取得
        -------------------------------------- */

        const locationResponse =
          await fetch(
            "https://geocoding-api.open-meteo.com/v1/search?name=Ueda%2C%20Nagano%2C%20Japan&count=1&language=ja&format=json"
          );

        if (!locationResponse.ok) {
          throw new Error(
            "場所の取得に失敗しました"
          );
        }

        const locationData =
          await locationResponse.json();

        if (
          !locationData.results ||
          locationData.results.length === 0
        ) {
          throw new Error(
            "上田市が見つかりませんでした"
          );
        }

        const latitude =
          locationData.results[0].latitude;

        const longitude =
          locationData.results[0].longitude;

        /* --------------------------------------
           上田市の天気を取得
        -------------------------------------- */

        const weatherResponse =
          await fetch(
            `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,apparent_temperature,weather_code,precipitation_probability&daily=weather_code,temperature_2m_max,temperature_2m_min,precipitation_probability_max&timezone=Asia%2FTokyo&forecast_days=7`
          );

        if (!weatherResponse.ok) {
          throw new Error(
            "天気情報の取得に失敗しました"
          );
        }

        const weatherData =
          await weatherResponse.json();

        setWeather(weatherData);
      } catch (err) {
        console.error(err);

        setError(
          "天気情報を取得できませんでした。時間をおいてもう一度お試しください。"
        );
      } finally {
        setLoading(false);
      }
    }

    fetchWeather();
  }, []);

  return (
    /*
    ==================================================
    ここが他の画面と同じ大事な部分

    fixed
    390px
    max-w

    は使わない。

    親が用意しているスマホ画面の大きさを
    そのまま使う。
    ==================================================
    */

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
      {/* ==========================================
          中身だけスクロール

          画面そのものは動かない。
          ========================================== */}

      <div
        className="
          min-h-0
          flex-1
          overflow-x-hidden
          overflow-y-auto
        "
        style={{
          WebkitOverflowScrolling: "touch",
          overscrollBehavior: "contain",
        }}
      >
        <div
          className="
            w-full
            px-3
            pb-10
          "
        >
          {/* ==========================================
              上部
          ========================================== */}

          <header
            className="
              relative
              h-[82px]
              w-full
              shrink-0
            "
          >
            {/* ========================================
                ホームUI

                画像の後ろに四角い背景を作らない
            ======================================== */}

            <button
              type="button"
              onClick={back}
              aria-label="ホームに戻る"
              className="
                absolute
                left-1
                top-5
                z-20
                m-0
                flex
                h-auto
                w-auto
                items-center
                justify-center
                border-0
                bg-transparent
                p-0
                shadow-none
                outline-none
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

            {/* ========================================
                天気タイトル
            ======================================== */}

            <h1
              className="
                absolute
                left-1/2
                top-[36px]
                -translate-x-1/2
                whitespace-nowrap
                text-[24px]
                font-bold
                tracking-wide
                text-[#4f6958]
              "
            >
              🌤️ 天気
            </h1>
          </header>

          {/* ==========================================
              場所
          ========================================== */}

          <div
            className="
              mb-4
              flex
              justify-center
            "
          >
            <p
              className="
                text-[17px]
                font-medium
                text-[#607466]
              "
            >
              📍 長野県 上田市
            </p>
          </div>

          {/* ==========================================
              読み込み中
          ========================================== */}

          {loading && (
            <div
              className="
                rounded-[28px]
                bg-white/75
                px-5
                py-10
                text-center
                shadow-sm
              "
            >
              <div
                className="
                  mb-3
                  text-4xl
                "
              >
                🌤️
              </div>

              <p
                className="
                  text-sm
                  font-medium
                  text-[#687a6c]
                "
              >
                天気を読み込んでいます…
              </p>
            </div>
          )}

          {/* ==========================================
              エラー
          ========================================== */}

          {!loading && error && (
            <div
              className="
                rounded-[28px]
                bg-white/75
                px-5
                py-8
                text-center
                shadow-sm
              "
            >
              <div
                className="
                  mb-3
                  text-4xl
                "
              >
                😢
              </div>

              <p
                className="
                  text-sm
                  leading-6
                  text-[#687a6c]
                "
              >
                {error}
              </p>

              <button
                type="button"
                onClick={() =>
                  window.location.reload()
                }
                className="
                  mt-5
                  rounded-full
                  bg-[#dcefe1]
                  px-5
                  py-2
                  text-sm
                  font-bold
                  text-[#55705e]
                "
              >
                もう一度読み込む
              </button>
            </div>
          )}

          {/* ==========================================
              天気表示
          ========================================== */}

          {!loading &&
            !error &&
            weather && (
              <>
                {/* ====================================
                    今日の天気
                ==================================== */}

                <section
                  className="
                    mb-6
                    overflow-hidden
                    rounded-[28px]
                    bg-white/75
                    shadow-sm
                  "
                >
                  {/* ------------------------------------
                      今日の天気メイン
                  ------------------------------------ */}

                  <div
                    className="
                      px-5
                      pb-5
                      pt-5
                      text-center
                    "
                  >
                    <p
                      className="
                        text-[18px]
                        font-medium
                        text-[#68786d]
                      "
                    >
                      今日の天気
                    </p>

                    {/* 天気アイコン */}

                    <div
                      className="
                        mt-5
                        text-[48px]
                        leading-none
                      "
                    >
                      {
                        getWeatherInfo(
                          weather.current
                            .weather_code
                        ).icon
                      }
                    </div>

                    {/* 天気 */}

                    <p
                      className="
                        mt-4
                        text-[20px]
                        font-medium
                        text-[#52685a]
                      "
                    >
                      {
                        getWeatherInfo(
                          weather.current
                            .weather_code
                        ).text
                      }
                    </p>

                    {/* 現在気温 */}

                    <p
                      className="
                        mt-2
                        text-[27px]
                        font-medium
                        text-[#53675a]
                      "
                    >
                      {Math.round(
                        weather.current
                          .temperature_2m
                      )}
                      ℃
                    </p>

                    {/* 体感温度 */}

                    <p
                      className="
                        mt-3
                        text-[17px]
                        text-[#718075]
                      "
                    >
                      体感温度{" "}
                      {Math.round(
                        weather.current
                          .apparent_temperature
                      )}
                      ℃
                    </p>
                  </div>

                  {/* ====================================
                      降水確率・最高最低
                  ==================================== */}

                  <div
                    className="
                      grid
                      grid-cols-2
                      bg-[#edf7ef]/80
                    "
                  >
                    {/* 降水確率 */}

                    <div
                      className="
                        px-2
                        py-5
                        text-center
                      "
                    >
                      <p
                        className="
                          text-[16px]
                          text-[#74857a]
                        "
                      >
                        💧 降水確率
                      </p>

                      <p
                        className="
                          mt-3
                          text-[18px]
                          font-medium
                          text-[#5d7463]
                        "
                      >
                        {Math.round(
                          weather.current
                            .precipitation_probability ??
                            0
                        )}
                        %
                      </p>
                    </div>

                    {/* 最高・最低 */}

                    <div
                      className="
                        px-2
                        py-5
                        text-center
                      "
                    >
                      <p
                        className="
                          text-[16px]
                          text-[#74857a]
                        "
                      >
                        🌡️ 最高 / 最低
                      </p>

                      <p
                        className="
                          mt-3
                          whitespace-nowrap
                          text-[17px]
                          font-medium
                          text-[#5d7463]
                        "
                      >
                        {Math.round(
                          weather.daily
                            .temperature_2m_max[0]
                        )}
                        ℃

                        <span
                          className="
                            mx-1
                            text-[#a0aaa3]
                          "
                        >
                          /
                        </span>

                        {Math.round(
                          weather.daily
                            .temperature_2m_min[0]
                        )}
                        ℃
                      </p>
                    </div>
                  </div>
                </section>

                {/* ====================================
                    1週間の天気タイトル
                ==================================== */}

                <div
                  className="
                    mb-3
                    flex
                    items-center
                    justify-between
                    px-1
                  "
                >
                  <h2
                    className="
                      text-[22px]
                      font-bold
                      tracking-wide
                      text-[#53685a]
                    "
                  >
                    📅 1週間の天気
                  </h2>

                  <span
                    className="
                      text-[15px]
                      text-[#77867b]
                    "
                  >
                    7日間
                  </span>
                </div>

                {/* ====================================
                    7日間の天気

                    ここから下へスクロールできる。
                ==================================== */}

                <div
                  className="
                    flex
                    w-full
                    flex-col
                    gap-3
                  "
                >
                  {weather.daily.time.map(
                    (date, index) => {
                      const dateInfo =
                        formatDate(date);

                      const info =
                        getWeatherInfo(
                          weather.daily
                            .weather_code[
                            index
                          ]
                        );

                      const rain =
                        weather.daily
                          .precipitation_probability_max[
                          index
                        ] ?? 0;

                      const maxTemp =
                        weather.daily
                          .temperature_2m_max[
                          index
                        ];

                      const minTemp =
                        weather.daily
                          .temperature_2m_min[
                          index
                        ];

                      return (
                        <div
                          key={date}
                          className="
                            w-full
                            shrink-0
                            rounded-[24px]
                            bg-white/75
                            px-3
                            py-4
                            shadow-sm
                          "
                        >
                          <div
                            className="
                              flex
                              min-h-[72px]
                              items-center
                            "
                          >
                            {/* =========================
                                日付
                            ========================== */}

                            <div
                              className="
                                w-[55px]
                                shrink-0
                              "
                            >
                              <p
                                className="
                                  text-[13px]
                                  text-[#87948b]
                                "
                              >
                                {dateInfo.month}月
                              </p>

                              <p
                                className="
                                  text-[19px]
                                  font-bold
                                  leading-6
                                  text-[#596c5f]
                                "
                              >
                                {dateInfo.day}日
                              </p>

                              <p
                                className="
                                  mt-1
                                  text-[12px]
                                  text-[#7b897f]
                                "
                              >
                                {dateInfo.weekday}
                                曜日
                              </p>
                            </div>

                            {/* =========================
                                天気アイコン
                            ========================== */}

                            <div
                              className="
                                flex
                                w-[50px]
                                shrink-0
                                items-center
                                justify-center
                              "
                            >
                              <span
                                className="
                                  text-[31px]
                                  leading-none
                                "
                              >
                                {info.icon}
                              </span>
                            </div>

                            {/* =========================
                                天気・降水確率
                            ========================== */}

                            <div
                              className="
                                min-w-0
                                flex-1
                                px-1
                              "
                            >
                              <p
                                className="
                                  truncate
                                  text-[16px]
                                  font-medium
                                  text-[#5c6e62]
                                "
                              >
                                {info.text}
                              </p>

                              <p
                                className="
                                  mt-2
                                  whitespace-nowrap
                                  text-[13px]
                                  text-[#7d8b82]
                                "
                              >
                                💧 降水確率{" "}
                                {Math.round(
                                  rain
                                )}
                                %
                              </p>
                            </div>

                            {/* =========================
                                最高気温・最低気温
                            ========================== */}

                            <div
                              className="
                                w-[50px]
                                shrink-0
                                text-right
                              "
                            >
                              <p
                                className="
                                  text-[15px]
                                  font-medium
                                  text-[#5c6e62]
                                "
                              >
                                {Math.round(
                                  maxTemp
                                )}
                                ℃
                              </p>

                              <p
                                className="
                                  mt-1
                                  text-[12px]
                                  text-[#98a39c]
                                "
                              >
                                {Math.round(
                                  minTemp
                                )}
                                ℃
                              </p>
                            </div>
                          </div>
                        </div>
                      );
                    }
                  )}
                </div>

                {/* ====================================
                    一番下の余白
                ==================================== */}

                <div className="h-12" />
              </>
            )}
        </div>
      </div>
    </div>
  );
}