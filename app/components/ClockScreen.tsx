"use client";

import { useEffect, useRef, useState } from "react";

type ClockScreenProps = {
  back: () => void;
};

type Alarm = {
  id: number;
  time: string;
  enabled: boolean;
};

function pad(number: number) {
  return String(number).padStart(2, "0");
}

export default function ClockScreen({ back }: ClockScreenProps) {
  const [now, setNow] = useState(new Date());

  // =========================
  // アラーム
  // =========================
  const [alarms, setAlarms] = useState<Alarm[]>([
    {
      id: 1,
      time: "07:00",
      enabled: true,
    },
    {
      id: 2,
      time: "08:30",
      enabled: false,
    },
  ]);

  // アラーム追加画面
  const [showAddAlarm, setShowAddAlarm] = useState(false);

  // 新しく設定する時間
  const [newAlarmTime, setNewAlarmTime] =
    useState("09:00");

  // =========================
  // タイマー
  // =========================
  const [timerSeconds, setTimerSeconds] =
    useState(0);

  const [timerRunning, setTimerRunning] =
    useState(false);

  const [timerInput, setTimerInput] =
    useState(5);

  // =========================
  // ストップウォッチ
  // =========================
  const [stopwatchSeconds, setStopwatchSeconds] =
    useState(0);

  const [stopwatchRunning, setStopwatchRunning] =
    useState(false);

  // =========================
  // アラーム音
  // =========================
  const alarmAudioRef =
    useRef<HTMLAudioElement>(null);

  const lastAlarmCheckRef =
    useRef("");

  // =========================
  // 現在時刻
  // =========================
  useEffect(() => {
    const interval = setInterval(() => {
      setNow(new Date());
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  // =========================
  // タイマー
  // =========================
  useEffect(() => {
    if (!timerRunning) {
      return;
    }

    const interval = setInterval(() => {
      setTimerSeconds((prev) => {
        if (prev <= 1) {
          setTimerRunning(false);

          if (
            typeof window !== "undefined" &&
            "Notification" in window &&
            Notification.permission === "granted"
          ) {
            new Notification("タイマー終了", {
              body: "おつかれさまでした🌱",
            });
          }

          return 0;
        }

        return prev - 1;
      });
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, [timerRunning]);

  // =========================
  // ストップウォッチ
  // =========================
  useEffect(() => {
    if (!stopwatchRunning) {
      return;
    }

    const interval = setInterval(() => {
      setStopwatchSeconds((prev) => prev + 1);
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, [stopwatchRunning]);

  // =========================
  // アラーム確認
  // =========================
  useEffect(() => {
    const currentTime =
      `${pad(now.getHours())}:${pad(now.getMinutes())}`;

    alarms.forEach((alarm) => {
      if (!alarm.enabled) {
        return;
      }

      if (alarm.time !== currentTime) {
        return;
      }

      const alarmKey =
        `${alarm.id}-${currentTime}-${now.toDateString()}`;

      if (
        lastAlarmCheckRef.current === alarmKey
      ) {
        return;
      }

      lastAlarmCheckRef.current = alarmKey;

      if (alarmAudioRef.current) {
        alarmAudioRef.current.currentTime = 0;

        alarmAudioRef.current
          .play()
          .catch(() => {});
      }

      if (
        typeof window !== "undefined" &&
        "Notification" in window &&
        Notification.permission === "granted"
      ) {
        new Notification("⏰ アラーム", {
          body: `${alarm.time} になりました`,
        });
      }
    });
  }, [now, alarms]);

  // =========================
  // 時計表示
  // =========================
  const hours = pad(now.getHours());
  const minutes = pad(now.getMinutes());

  const dateText =
    now.toLocaleDateString("ja-JP", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      weekday: "short",
    });

  // =========================
  // 次のアラーム
  // =========================
  const nextAlarm = [...alarms]
    .filter((alarm) => alarm.enabled)
    .sort((a, b) =>
      a.time.localeCompare(b.time)
    )[0];

  function getSleepText() {
    if (!nextAlarm) {
      return "アラームは設定されていません";
    }

    const [
      alarmHour,
      alarmMinute,
    ] = nextAlarm.time
      .split(":")
      .map(Number);

    const alarmDate = new Date(now);

    alarmDate.setHours(
      alarmHour,
      alarmMinute,
      0,
      0
    );

    if (alarmDate <= now) {
      alarmDate.setDate(
        alarmDate.getDate() + 1
      );
    }

    const difference =
      alarmDate.getTime() -
      now.getTime();

    const hoursLeft =
      Math.floor(
        difference / 1000 / 60 / 60
      );

    const minutesLeft =
      Math.floor(
        (difference / 1000 / 60) % 60
      );

    return `おやすみまで あと ${hoursLeft} 時間 ${minutesLeft} 分`;
  }

  // =========================
  // アラームON/OFF
  // =========================
  function toggleAlarm(id: number) {
    setAlarms((prev) =>
      prev.map((alarm) =>
        alarm.id === id
          ? {
              ...alarm,
              enabled: !alarm.enabled,
            }
          : alarm
      )
    );
  }

  // =========================
  // アラーム時間変更
  // =========================
  function changeAlarmTime(
    id: number,
    time: string
  ) {
    setAlarms((prev) =>
      prev.map((alarm) =>
        alarm.id === id
          ? {
              ...alarm,
              time,
            }
          : alarm
      )
    );
  }

  // =========================
  // ★ アラーム追加画面を開く
  // =========================
  function openAddAlarm() {
    setNewAlarmTime("09:00");
    setShowAddAlarm(true);
  }

  // =========================
  // ★ アラーム追加
  // =========================
  function addAlarm() {
    if (!newAlarmTime) {
      return;
    }

    const newAlarm: Alarm = {
      id: Date.now(),
      time: newAlarmTime,
      enabled: true,
    };

    setAlarms((prev) => {
      return [...prev, newAlarm];
    });

    // 追加画面を閉じる
    setShowAddAlarm(false);

    // 通知許可は追加処理とは別にする
    if (
      typeof window !== "undefined" &&
      "Notification" in window &&
      Notification.permission === "default"
    ) {
      Notification.requestPermission().catch(
        () => {}
      );
    }
  }

  // =========================
  // アラーム削除
  // =========================
  function deleteAlarm(id: number) {
    setAlarms((prev) =>
      prev.filter(
        (alarm) => alarm.id !== id
      )
    );
  }

  // =========================
  // タイマー開始
  // =========================
  function startTimer() {
    if (timerSeconds === 0) {
      setTimerSeconds(
        timerInput * 60
      );
    }

    setTimerRunning(true);

    if (
      typeof window !== "undefined" &&
      "Notification" in window &&
      Notification.permission === "default"
    ) {
      Notification.requestPermission().catch(
        () => {}
      );
    }
  }

  // =========================
  // タイマー停止
  // =========================
  function stopTimer() {
    setTimerRunning(false);
  }

  // =========================
  // タイマーリセット
  // =========================
  function resetTimer() {
    setTimerRunning(false);
    setTimerSeconds(0);
  }

  // =========================
  // タイマー表示
  // =========================
  const timerMinutes =
    Math.floor(
      timerSeconds / 60
    );

  const timerRemainingSeconds =
    timerSeconds % 60;

  // =========================
  // 画面
  // =========================
  return (
    <div
      className="
        relative
        h-screen
        w-full
        overflow-y-auto
        bg-[url('/homeBackground.png')]
        bg-cover
        bg-center
        text-[#53683f]
      "
    >
      {/* 背景を少し明るくする */}
      <div
        className="
          pointer-events-none
          absolute
          inset-0
          bg-white/20
        "
      />

      {/* =========================
          全体
      ========================= */}
      <div
        className="
          relative
          z-10
          mx-auto
          min-h-screen
          w-full
          max-w-[820px]
        "
      >
        {/* =========================
            ヘッダー
        ========================= */}
        <div
          className="
            sticky
            top-0
            z-40
            flex
            h-[58px]
            items-center
            justify-between
            border-b
            border-[#cbd89a]
            bg-white/75
            px-3
            backdrop-blur-md
          "
        >
          <button
            type="button"
            onClick={back}
            className="
              cursor-pointer
              rounded-full
              border
              border-[#c8d596]
              bg-white
              px-3
              py-1.5
              text-sm
              text-[#607344]
              shadow-sm
              transition
              active:scale-95
            "
          >
            ← ホーム
          </button>

          <div
            className="
              absolute
              left-1/2
              -translate-x-1/2
              text-xl
              font-bold
              text-[#647642]
            "
          >
            ◷ 時計
          </div>

          <div className="w-[70px]" />
        </div>

        {/* =========================
            コンテンツ
        ========================= */}
        <div
          className="
            px-2
            pb-20
            pt-3
            sm:px-5
          "
        >
          {/* =========================
              現在時刻
          ========================= */}
          <section
            className="
              relative
              mx-auto
              max-w-[650px]
              overflow-hidden
              rounded-[40px]
              border
              border-[#cfdb9d]
              bg-white/45
              px-3
              py-5
              text-center
            "
          >
            <div
              className="
                pointer-events-none
                absolute
                left-4
                top-4
                text-xl
              "
            >
              ☁️
            </div>

            <div
              className="
                pointer-events-none
                absolute
                right-4
                top-4
                text-xl
              "
            >
              ✨
            </div>

            <p
              className="
                text-base
                tracking-[0.12em]
                text-[#627342]
              "
            >
              {dateText}
            </p>

            <div
              className="
                mt-1
                text-xs
                tracking-[0.3em]
                text-[#a9b77c]
              "
            >
              ● ● ● ● ● ● ● ●
            </div>

            <div
              className="
                mt-2
                flex
                items-center
                justify-center
                gap-1
                text-[#789448]
              "
            >
              <span
                className="
                  text-[58px]
                  font-light
                  leading-none
                  sm:text-[82px]
                "
              >
                {hours}
              </span>

              <span
                className="
                  text-[38px]
                  font-light
                  sm:text-[60px]
                "
              >
                :
              </span>

              <span
                className="
                  text-[58px]
                  font-light
                  leading-none
                  sm:text-[82px]
                "
              >
                {minutes}
              </span>
            </div>

            <p
              className="
                mt-2
                text-sm
                text-[#667847]
              "
            >
              すてきな一日になりますように🌱
            </p>
          </section>

          {/* =========================
              次のアラーム
          ========================= */}
          <div
            className="
              mx-auto
              mt-[-4px]
              max-w-[470px]
              rounded-full
              border
              border-[#d3dda5]
              bg-white/80
              px-3
              py-2
              text-center
            "
          >
            <p className="text-sm">
              🌙 {getSleepText()}
            </p>
          </div>

          {/* =========================
              アラーム
          ========================= */}
          <section
            className="
              mx-auto
              mt-5
              max-w-[700px]
            "
          >
            {/* タイトル */}
            <div
              className="
                mb-2
                flex
                items-center
                gap-2
              "
            >
              <span className="text-2xl">
                ⏰
              </span>

              <h2
                className="
                  text-2xl
                  font-semibold
                "
              >
                アラーム
              </h2>
            </div>

            {/* =========================
                アラーム一覧
            ========================= */}
            <div className="space-y-2">
              {alarms.map((alarm) => (
                <div
                  key={alarm.id}
                  className="
                    flex
                    items-center
                    rounded-[18px]
                    border
                    border-[#d4dfa7]
                    bg-white/75
                    px-3
                    py-2
                    shadow-sm
                  "
                >
                  {/* 時間 */}
                  <input
                    type="time"
                    value={alarm.time}
                    onChange={(e) =>
                      changeAlarmTime(
                        alarm.id,
                        e.target.value
                      )
                    }
                    className="
                      min-w-0
                      flex-1
                      border-0
                      bg-transparent
                      p-0
                      text-[26px]
                      font-light
                      text-[#53683f]
                      outline-none
                      focus:ring-0
                      sm:text-[34px]
                    "
                    aria-label="アラーム時間"
                  />

                  {/* ON/OFF */}
                  <button
                    type="button"
                    onClick={() =>
                      toggleAlarm(alarm.id)
                    }
                    className={`
                      relative
                      mr-2
                      h-9
                      w-[72px]
                      shrink-0
                      cursor-pointer
                      rounded-full
                      border
                      transition
                      ${
                        alarm.enabled
                          ? "border-[#91a95d] bg-[#a9c76e]"
                          : "border-[#d5d5c8] bg-[#ecece5]"
                      }
                    `}
                  >
                    <span
                      className={`
                        absolute
                        top-1/2
                        h-7
                        w-7
                        -translate-y-1/2
                        rounded-full
                        bg-white
                        shadow
                        transition-all
                        ${
                          alarm.enabled
                            ? "right-1"
                            : "left-1"
                        }
                      `}
                    />

                    <span
                      className={`
                        absolute
                        top-1/2
                        -translate-y-1/2
                        text-[11px]
                        font-bold
                        ${
                          alarm.enabled
                            ? "left-2 text-white"
                            : "right-2 text-[#777]"
                        }
                      `}
                    >
                      {alarm.enabled
                        ? "ON"
                        : "OFF"}
                    </span>
                  </button>

                  {/* 削除 */}
                  <button
                    type="button"
                    onClick={() =>
                      deleteAlarm(alarm.id)
                    }
                    className="
                      shrink-0
                      cursor-pointer
                      rounded-full
                      px-2
                      py-1
                      text-xs
                      text-[#b47d72]
                      transition
                      hover:bg-[#fff0ed]
                    "
                  >
                    削除
                  </button>
                </div>
              ))}
            </div>

            {/* ==================================================
                ★ アラーム追加ボタン
            ================================================== */}
            <button
              type="button"
              aria-label="アラームを追加"
              onClick={(event) => {
                event.preventDefault();
                event.stopPropagation();

                openAddAlarm();
              }}
              className="
                relative
                z-30
                mt-2
                flex
                w-full
                cursor-pointer
                items-center
                gap-3
                rounded-[18px]
                border
                border-[#cbd89a]
                bg-white/90
                px-3
                py-2.5
                text-left
                text-base
                text-[#53683f]
                shadow-sm
                transition
                hover:bg-white
                active:scale-[0.98]
              "
            >
              <span
                className="
                  flex
                  h-9
                  w-9
                  shrink-0
                  items-center
                  justify-center
                  rounded-full
                  border
                  border-dashed
                  border-[#aebe7d]
                  text-2xl
                  leading-none
                  text-[#71864e]
                "
              >
                ＋
              </span>

              <span>
                アラームを追加
              </span>
            </button>

            {/* ==================================================
                ★ アラーム追加画面
                fixedではなく、この場所に表示
            ================================================== */}
            {showAddAlarm && (
              <div
                className="
                  relative
                  z-50
                  mt-3
                  rounded-[24px]
                  border-2
                  border-[#cbd89a]
                  bg-[#fffdf5]
                  p-4
                  shadow-[0_10px_35px_rgba(80,100,50,0.2)]
                "
              >
                {/* タイトル */}
                <div
                  className="
                    text-center
                    text-xl
                    font-bold
                    text-[#617443]
                  "
                >
                  ⏰ アラームを追加
                </div>

                <p
                  className="
                    mt-2
                    text-center
                    text-sm
                    text-[#7d8d5d]
                  "
                >
                  好きな時間を選んでください
                </p>

                {/* 時間 */}
                <div
                  className="
                    mt-4
                    flex
                    justify-center
                  "
                >
                  <input
                    autoFocus
                    type="time"
                    value={newAlarmTime}
                    onChange={(e) =>
                      setNewAlarmTime(
                        e.target.value
                      )
                    }
                    className="
                      w-[190px]
                      rounded-2xl
                      border-2
                      border-[#cbd89a]
                      bg-white
                      px-4
                      py-3
                      text-center
                      text-3xl
                      font-light
                      text-[#53683f]
                      outline-none
                      focus:border-[#91ae5c]
                    "
                    aria-label="新しいアラームの時間"
                  />
                </div>

                {/* ボタン */}
                <div
                  className="
                    mt-4
                    flex
                    justify-center
                    gap-2
                  "
                >
                  <button
                    type="button"
                    onClick={() => {
                      setShowAddAlarm(false);
                    }}
                    className="
                      cursor-pointer
                      rounded-full
                      border
                      border-[#cbd89a]
                      bg-white
                      px-5
                      py-2.5
                      text-sm
                      text-[#657744]
                    "
                  >
                    キャンセル
                  </button>

                  <button
                    type="button"
                    onClick={(event) => {
                      event.preventDefault();
                      event.stopPropagation();

                      addAlarm();
                    }}
                    className="
                      cursor-pointer
                      rounded-full
                      bg-[#91ae5c]
                      px-6
                      py-2.5
                      text-sm
                      font-bold
                      text-white
                      shadow-sm
                      transition
                      hover:bg-[#819f50]
                      active:scale-95
                    "
                  >
                    追加する
                  </button>
                </div>
              </div>
            )}
          </section>

          {/* =========================
              タイマー
          ========================= */}
          <section
            className="
              mx-auto
              mt-5
              max-w-[700px]
            "
          >
            <div
              className="
                mb-2
                flex
                items-center
                gap-2
              "
            >
              <span className="text-2xl">
                ⌛
              </span>

              <h2
                className="
                  text-2xl
                  font-semibold
                "
              >
                タイマー
              </h2>
            </div>

            <div
              className="
                rounded-[20px]
                border
                border-[#d4dfa7]
                bg-white/75
                p-4
                shadow-sm
              "
            >
              {/* タイマー時間 */}
              <div className="text-center">
                <p
                  className="
                    text-4xl
                    font-light
                    text-[#668044]
                  "
                >
                  {pad(timerMinutes)}:
                  {pad(timerRemainingSeconds)}
                </p>

                <p
                  className="
                    mt-1
                    text-sm
                    text-[#879766]
                  "
                >
                  集中したい時間を設定できます
                </p>
              </div>

              {/* 時間設定 */}
              {!timerRunning &&
                timerSeconds === 0 && (
                  <div
                    className="
                      mt-3
                      flex
                      justify-center
                    "
                  >
                    <select
                      value={timerInput}
                      onChange={(e) =>
                        setTimerInput(
                          Number(
                            e.target.value
                          )
                        )
                      }
                      className="
                        cursor-pointer
                        rounded-full
                        border
                        border-[#cbd89a]
                        bg-white
                        px-4
                        py-2
                        text-base
                        text-[#53683f]
                        outline-none
                      "
                    >
                      <option value={1}>
                        1分
                      </option>

                      <option value={5}>
                        5分
                      </option>

                      <option value={10}>
                        10分
                      </option>

                      <option value={25}>
                        25分
                      </option>

                      <option value={30}>
                        30分
                      </option>

                      <option value={60}>
                        60分
                      </option>
                    </select>
                  </div>
                )}

              {/* タイマーボタン */}
              <div
                className="
                  mt-3
                  flex
                  justify-center
                  gap-2
                "
              >
                {!timerRunning ? (
                  <button
                    type="button"
                    onClick={startTimer}
                    className="
                      cursor-pointer
                      rounded-full
                      bg-[#91ae5c]
                      px-5
                      py-2
                      text-sm
                      font-semibold
                      text-white
                    "
                  >
                    ▶ 開始
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={stopTimer}
                    className="
                      cursor-pointer
                      rounded-full
                      bg-[#e6b5a9]
                      px-5
                      py-2
                      text-sm
                      font-semibold
                      text-white
                    "
                  >
                    ⏸ 一時停止
                  </button>
                )}

                <button
                  type="button"
                  onClick={resetTimer}
                  className="
                    cursor-pointer
                    rounded-full
                    border
                    border-[#cbd89a]
                    bg-white
                    px-5
                    py-2
                    text-sm
                    text-[#657744]
                  "
                >
                  ↻ リセット
                </button>
              </div>
            </div>
          </section>

          {/* =========================
              ストップウォッチ
          ========================= */}
          <section
            className="
              mx-auto
              mt-4
              max-w-[700px]
            "
          >
            <div
              className="
                rounded-[20px]
                border
                border-[#d4dfa7]
                bg-white/75
                p-4
                shadow-sm
              "
            >
              <div
                className="
                  flex
                  items-center
                  gap-3
                "
              >
                <div
                  className="
                    flex
                    h-10
                    w-10
                    items-center
                    justify-center
                    rounded-full
                    border
                    border-[#dfe8ba]
                    bg-[#f8f6e9]
                  "
                >
                  🌱
                </div>

                <div>
                  <p
                    className="
                      text-lg
                      font-medium
                    "
                  >
                    ストップウォッチ
                  </p>

                  <p
                    className="
                      text-xs
                      text-[#7c8c59]
                    "
                  >
                    好きな時間だけ集中する
                  </p>
                </div>
              </div>

              <p
                className="
                  mt-3
                  text-center
                  text-4xl
                  font-light
                  text-[#668044]
                "
              >
                {pad(
                  Math.floor(
                    stopwatchSeconds / 60
                  )
                )}
                :
                {pad(
                  stopwatchSeconds % 60
                )}
              </p>

              <div
                className="
                  mt-3
                  flex
                  justify-center
                  gap-2
                "
              >
                {!stopwatchRunning ? (
                  <button
                    type="button"
                    onClick={() =>
                      setStopwatchRunning(
                        true
                      )
                    }
                    className="
                      cursor-pointer
                      rounded-full
                      bg-[#91ae5c]
                      px-5
                      py-2
                      text-sm
                      font-semibold
                      text-white
                    "
                  >
                    ▶ 開始
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={() =>
                      setStopwatchRunning(
                        false
                      )
                    }
                    className="
                      cursor-pointer
                      rounded-full
                      bg-[#e6b5a9]
                      px-5
                      py-2
                      text-sm
                      font-semibold
                      text-white
                    "
                  >
                    ⏸ 一時停止
                  </button>
                )}

                <button
                  type="button"
                  onClick={() => {
                    setStopwatchRunning(
                      false
                    );
                    setStopwatchSeconds(0);
                  }}
                  className="
                    cursor-pointer
                    rounded-full
                    border
                    border-[#cbd89a]
                    bg-white
                    px-5
                    py-2
                    text-sm
                    text-[#657744]
                  "
                >
                  ↻ リセット
                </button>
              </div>
            </div>
          </section>
        </div>
      </div>

      {/* アラーム音 */}
      <audio
        ref={alarmAudioRef}
        src="/alarm.mp3"
        preload="auto"
      />
    </div>
  );
}