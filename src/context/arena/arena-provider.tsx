import { useEffect, useState } from "react";
import { ArenaContext, type GameState } from "./arena-context";

const playerHeight = 50;

export function ArenaProvider({ children }: { children: React.ReactNode }) {
  const [playerGap, setPlayerGap] = useState(0);
  const [gameState, setGameState] = useState<GameState>("not-started");
  const [distance, setDistance] = useState(2000);
  const [isCameraMove, setIsCameraMove] = useState(false);
  const [winner, setWinner] = useState<string>();
  const [currentFaster, _setCurrentFaster] = useState(0);
  const [isCountdown, setIsCountdown] = useState(false);
  const [players, _setPlayers] = useState<string[]>([]);

  const setPlayers = (names: string[]) => {
    if (!names?.length) {
      _setPlayers([]);
      return;
    }

    const uniqueArr: string[] = [...new Set(names)];
    const cleanNames = uniqueArr
      .map((name) => name.trim())
      .filter((name) => !!name);

    _setPlayers(cleanNames);
  };

  const setCurrentFaster = (current: number) => {
    _setCurrentFaster((prev) => {
      if (current > prev) return current;
      return prev;
    });
  };

  const startCountdown = () => {
    setIsCountdown(true);
  };

  const retry = () => {
    setGameState("not-started");
    setWinner(undefined);
    _setCurrentFaster(0);
    setIsCameraMove(false);
    setIsCountdown(false);
  };

  useEffect(() => {
    if (!isCountdown) return;

    if (gameState !== "not-started") {
      setIsCountdown(false);
    }
  }, [gameState, isCountdown]);

  return (
    <ArenaContext.Provider
      value={{
        playerHeight,
        playerGap,
        gameState,
        distance,
        winner,
        players,
        isCameraMove,
        currentFaster,
        isCountdown,

        setPlayerGap,
        setGameState,
        setDistance,
        setWinner,
        setPlayers,
        setIsCameraMove,
        setCurrentFaster,
        startCountdown,
        retry,
      }}
    >
      {children}
    </ArenaContext.Provider>
  );
}
