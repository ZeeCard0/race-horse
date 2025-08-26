import { useArena, defaultDistance } from "@/context/arena";
import { useEffect, useRef, useState } from "react";
import { useDebounceValue } from "usehooks-ts";

export default function GameSettings() {
  const { distance, speed, isSearchParamReaded, setDistance } = useArena();

  const [trackLong, setTrackLong] = useState(distance);
  const [trackSpeed, setTrackSpeed] = useState();

  const waitDataFromArena = useRef<boolean>(true);

  const [trackLongDebounced] = useDebounceValue(trackLong, 200);

  const resetDistance = () => {
    setTrackLong(defaultDistance);
  };

  useEffect(() => {
    setDistance(trackLongDebounced);
  }, [trackLongDebounced]);

  useEffect(() => {
    if (!isSearchParamReaded || !waitDataFromArena.current) {
      return;
    }

    setTrackLong(distance);
    waitDataFromArena.current = false;
  }, [distance, isSearchParamReaded]);

  return (
    <>
      <div className="flex flex-wrap basis-full md:basis-[60%] items-start justify-center md:justify-end gap-4 font-mono">
        <div className="flex flex-col items-center max-w-xs bg-gray-700 rounded-2xl shadow-md shadow-gray-600 overflow-hidden">
          <div className="pt-4 pb-2 px-4 bg-gray-800 w-full">
            <h2 className="text-sm font-medium tracking-widest">
              Track Length
            </h2>
            <p className="text-xs text-gray-400 font-mono">
              Control the distance the players must race
            </p>
          </div>
          <div className="flex grow p-4 gap-2 w-full">
            <input
              type="range"
              className="grow no"
              min={1000}
              max={5000}
              step={100}
              value={trackLong}
              onChange={(e) => setTrackLong(parseInt(e.target.value))}
            />
            <span>{trackLong}m</span>
          </div>
          <button
            className="bg-gray-600 text-gray-300 px-4 py-2 rounded-full hover:bg-gray-800 hover:drop-shadow-md transition-colors text-xs mb-4"
            onClick={resetDistance}
          >
            Reset
          </button>
        </div>
        <div className="relative flex flex-col items-center max-w-xs bg-gray-700 rounded-2xl shadow-md shadow-gray-600 overflow-hidden">
          <div className="pt-4 pb-2 px-4 bg-gray-800 w-full">
            <h2 className="text-sm font-medium tracking-widest">Horse Speed</h2>
            <p className="text-xs text-gray-400 font-mono">
              Control the distance the players must race
            </p>
          </div>
          <div className="flex grow p-4 gap-2 w-full">
            <div className="relative grow">
              <input
                type="range"
                className="w-full"
                min={1000}
                max={5000}
                step={100}
                //   value={trackLong}
                //   onChange={(e) => setTrackLong(parseInt(e.target.value))}
              />
              <input
                type="range"
                className="-scale-100 w-full"
                min={1000}
                max={5000}
                step={100}
                //   value={trackLong}
                //   onChange={(e) => setTrackLong(parseInt(e.target.value))}
              />
            </div>
            <span>{trackLong}m</span>
          </div>
          <button
            className="bg-gray-600 text-gray-300 px-4 py-2 rounded-full hover:bg-gray-800 hover:drop-shadow-md transition-colors text-xs mb-4"
            onClick={resetDistance}
          >
            Reset
          </button>
        </div>
      </div>
    </>
  );
}
