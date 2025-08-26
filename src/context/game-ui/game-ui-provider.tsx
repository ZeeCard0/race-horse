import { useCallback, useEffect, useState } from "react";
import { GameUiContext } from "./game-ui-context";
import { useArena } from "../arena";
import { useDebounceCallback } from "usehooks-ts";

const defaultPlayers = `Player 1\nPlayer 2\nPlayer 3\nPlayer 4`;

export function GameUiProvider({ children }: { children: React.ReactNode }) {
  const [rawNames, setRawNames] = useState(defaultPlayers);

  const { players, setPlayers } = useArena();

  const setNames = useCallback(
    (names: string[]) => {
      setPlayers(names);
    },
    [players]
  );

  const setNamesDebounced = useDebounceCallback(setNames, 250);

  useEffect(() => {
    setNamesDebounced(rawNames.split("\n"));
  }, [rawNames]);

  return (
    <GameUiContext.Provider value={{ rawNames, setRawNames }}>
      {children}
    </GameUiContext.Provider>
  );
}
