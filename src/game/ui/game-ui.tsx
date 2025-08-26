import { GameUiProvider } from "@/context/game-ui/game-ui-provider";
import UI from "./ui";

export default function GameUi() {
  return (
    <GameUiProvider>
      <UI />
    </GameUiProvider>
  );
}
