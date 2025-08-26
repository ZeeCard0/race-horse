import { useDebounceCallback } from "usehooks-ts";
import { Icon } from "@iconify/react";
import { useRef, useState, type ButtonHTMLAttributes } from "react";
import { useArena } from "@/context/arena";
import { cleanNames, cn } from "@/lib/utils";
import { useGameUI } from "@/context/game-ui";

export default function ListName() {
  const [lastSort, setLastSort] = useState("ASC");
  const { setPlayers, retry } = useArena();
  const { rawNames, setRawNames } = useGameUI();

  const textRef = useRef<HTMLTextAreaElement>(null);

  const setRawNameDebounced = useDebounceCallback(setRawNames, 250);

  const shuffle = () => {
    if (!textRef.current?.value) return;

    const names = cleanNames(rawNames.split("\n"));
    names.sort(() => Math.random() - 0.5);

    setPlayers(names);

    const stringNames = names.join("\n");
    textRef.current.value = stringNames;
    setRawNames(stringNames);
  };

  const sort = () => {
    if (!textRef.current?.value) return;

    const names = cleanNames(rawNames.split("\n"));
    if (lastSort === "ASC") {
      names.sort((a, b) => a.localeCompare(b));
      setLastSort("DESC");
    } else {
      names.sort((a, b) => b.localeCompare(a));
      setLastSort("ASC");
    }

    setPlayers(names);

    const stringNames = names.join("\n");
    textRef.current.value = stringNames;
    setRawNames(stringNames);
  };

  const removeDuplicate = () => {
    if (!textRef.current?.value) return;

    const names = cleanNames(rawNames.split("\n"));
    const uniqueNames = [...new Set(names)];
    const stringNames = uniqueNames.join("\n");
    textRef.current.value = stringNames;
    setRawNames(stringNames);
  };

  const newGame = () => {
    if (!textRef.current?.value) return;
    textRef.current.value = "";
    setRawNames("");
    setPlayers([]);
    retry();
  };

  return (
    <div className="flex gap-2">
      <div className="flex flex-col h-full  w-xs bg-gray-700 rounded-2xl shadow-md shadow-gray-600 overflow-hidden">
        <div className="pt-4 pb-2 px-4 bg-gray-800">
          <div className="text-sm font-medium tracking-widest font-mono ">
            Name List
          </div>
          <div className="text-xs text-gray-400 font-mono">
            Use Enter to separate names.
          </div>
        </div>
        <div className="grow">
          <textarea
            ref={textRef}
            id="name-list"
            defaultValue={rawNames}
            className="focus:outline-none py-2 px-4 h-full min-h-60 w-full resize-none placeholder:text-gray-600 font-mono"
            placeholder={`Player 1\nPlayer 2\nPlayer 3`}
            onChange={(e) => {
              setRawNameDebounced(e.target.value);
            }}
          />
        </div>
      </div>
      <div className="flex flex-col gap-3">
        <ActionButton
          text="New Race"
          icon={<Icon icon="mdi:horse-variant-fast" />}
          onClick={newGame}
          className="border-2 border-gray-600/20"
        />
        <ActionButton
          text="Shuffle"
          icon={<Icon icon="solar:shuffle-outline" />}
          onClick={shuffle}
          disabled={!rawNames.length}
        />
        <ActionButton
          text="Sort"
          icon={
            lastSort === "ASC" ? (
              <Icon icon="solar:sort-from-top-to-bottom-outline" />
            ) : (
              <Icon icon="solar:sort-from-bottom-to-top-outline" />
            )
          }
          onClick={sort}
          disabled={!rawNames.length}
        />
        <ActionButton
          text="Duplicate"
          icon={<Icon icon="solar:trash-bin-minimalistic-outline" />}
          onClick={removeDuplicate}
          disabled={!rawNames.length}
        />
      </div>
    </div>
  );
}

interface ActionButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  text: string;
  icon: React.ReactNode;
}

function ActionButton({
  text,
  icon,
  className,
  disabled,
  ...props
}: ActionButtonProps) {
  return (
    <button
      className={cn(
        "flex items-center justify-center gap-1 py-2 px-4 text-sm font-mono rounded-full text-gray-400 transition-colors",
        {
          "bg-gray-600/20 hover:bg-gray-600": !disabled,
          "bg-gray-600/50 opacity-30": disabled,
        },
        className
      )}
      disabled={disabled}
      {...props}
    >
      {icon} {text}
    </button>
  );
}
