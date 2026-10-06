"use client";

import { useState } from "react";

import WelcomeScreen from "./components/WelcomeScreen";
import HomeScreen from "./components/HomeScreen";
import ChatScreen from "./components/ChatScreen";
import MusicScreen from "./components/MusicScreen";
import DiaryScreen from "./components/DiaryScreen";

import ClockScreen from "./components/ClockScreen";
import TriviaScreen from "./components/TriviaScreen";
import WeatherScreen from "./components/WeatherScreen";
import MeditationScreen from "./components/MeditationScreen";
import RecipeScreen from "./components/RecipeScreen";
import CustomScreen from "./components/CustomScreen";
import BackgroundScreen from "./components/BackgroundScreen";
import SettingsScreen from "./components/SettingsScreen";

export default function Home() {
  const [screen, setScreen] = useState<
    | "welcome"
    | "home"
    | "chat"
    | "music"
    | "diary"
    | "clock"
    | "trivia"
    | "weather"
    | "meditation"
    | "recipe"
    | "custom"
    | "background"
    | "settings"
  >("welcome");

  return (
    <main className="min-h-screen bg-[#dfe8df] flex justify-center">

      {/* スマホサイズ */}
      <div
        className="
          w-full
          max-w-[430px]
          h-screen
          relative
          overflow-hidden
          shadow-2xl
          bg-white
        "
      >

        {/* =========================
            Welcome
           ========================= */}

        {screen === "welcome" && (
          <WelcomeScreen
            onStart={() => setScreen("home")}
          />
        )}

        {/* =========================
            Home
           ========================= */}

        {screen === "home" && (
          <HomeScreen
            back={() => setScreen("welcome")}

            openChat={() =>
              setScreen("chat")
            }

            openMusic={() =>
              setScreen("music")
            }

            openDiary={() =>
              setScreen("diary")
            }

            openClock={() =>
              setScreen("clock")
            }

            openTrivia={() =>
              setScreen("trivia")
            }

            openWeather={() =>
              setScreen("weather")
            }

            openMeditation={() =>
              setScreen("meditation")
            }

            openRecipe={() =>
              setScreen("recipe")
            }

            openCustom={() =>
              setScreen("custom")
            }

            openBackground={() =>
              setScreen("background")
            }

            openSettings={() =>
              setScreen("settings")
            }
          />
        )}

        {/* =========================
            Chat
           ========================= */}

        {screen === "chat" && (
          <ChatScreen
            back={() =>
              setScreen("home")
            }
          />
        )}

        {/* =========================
            Music
           ========================= */}

        {screen === "music" && (
          <MusicScreen
            back={() =>
              setScreen("home")
            }
          />
        )}

        {/* =========================
            Diary
           ========================= */}

        {screen === "diary" && (
          <DiaryScreen
            back={() =>
              setScreen("home")
            }
          />
        )}

        {/* =========================
            Clock
           ========================= */}

        {screen === "clock" && (
          <ClockScreen
            back={() =>
              setScreen("home")
            }
          />
        )}

        {/* =========================
            Trivia
           ========================= */}

        {screen === "trivia" && (
          <TriviaScreen
            back={() =>
              setScreen("home")
            }
          />
        )}

        {/* =========================
            Weather
           ========================= */}

        {screen === "weather" && (
          <WeatherScreen
            back={() =>
              setScreen("home")
            }
          />
        )}

        {/* =========================
            Meditation
           ========================= */}

        {screen === "meditation" && (
          <MeditationScreen
            back={() =>
              setScreen("home")
            }
          />
        )}

        {/* =========================
            Recipe
           ========================= */}

        {screen === "recipe" && (
          <RecipeScreen
            back={() =>
              setScreen("home")
            }
          />
        )}

        {/* =========================
            Custom
           ========================= */}

        {screen === "custom" && (
          <CustomScreen
            back={() =>
              setScreen("home")
            }
          />
        )}

        {/* =========================
            Background
           ========================= */}

        {screen === "background" && (
          <BackgroundScreen
            back={() =>
              setScreen("home")
            }
          />
        )}

        {/* =========================
            Settings
           ========================= */}

        {screen === "settings" && (
          <SettingsScreen
            back={() =>
              setScreen("home")
            }
          />
        )}

      </div>

    </main>
  );
}