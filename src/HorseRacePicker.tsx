"use client";
import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";

type HorseState = {
  name: string;
  pos: number;
  speed: number;
};

export default function HorseRacePicker() {
  const [participants, setParticipants] = useState<string[]>([]);
  const [inputName, setInputName] = useState<string>("");
  const [horses, setHorses] = useState<HorseState[]>([]);
  const [running, setRunning] = useState<boolean>(false);
  const [winner, setWinner] = useState<string | null>(null);
  const [cameraX, setCameraX] = useState<number>(0);

  const trackLength = 2000; // px
  const finishLine = trackLength;
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const addParticipant = () => {
    if (inputName.trim() && !participants.includes(inputName.trim())) {
      setParticipants([...participants, inputName.trim()]);
      setInputName("");
    }
  };

  const startRace = () => {
    if (participants.length < 2) return;

    const initHorses: HorseState[] = participants.map((p) => ({
      name: p,
      pos: 0,
      speed: Math.random() * 10 + 5,
    }));

    setHorses(initHorses);
    setWinner(null);
    setRunning(true);
    setCameraX(0);

    intervalRef.current = setInterval(() => {
      setHorses((prev) => {
        let newHorses = prev.map((h) => {
          const variation = (Math.random() - 0.5) * 4;
          const newSpeed = Math.max(2, h.speed + variation);
          return { ...h, pos: h.pos + newSpeed, speed: newSpeed };
        });

        // tentukan leader
        let leader = newHorses.reduce((a, b) => (a.pos > b.pos ? a : b));

        // cek finish
        if (leader.pos >= finishLine) {
          setWinner(leader.name);
          setRunning(false);
          if (intervalRef.current) clearInterval(intervalRef.current);
        }

        // update kamera
        const stopCameraX = finishLine - window.innerWidth * 0.8;
        const safeLeft = cameraX + window.innerWidth * 0.4;
        const safeRight = cameraX + window.innerWidth * 0.6;
        let newCameraX = cameraX;

        if (leader.pos > safeRight) {
          newCameraX = leader.pos - window.innerWidth * 0.6;
        } else if (leader.pos < safeLeft) {
          newCameraX = leader.pos - window.innerWidth * 0.4;
        }

        newCameraX = Math.min(newCameraX, stopCameraX);
        newCameraX = Math.max(newCameraX, 0);
        setCameraX(newCameraX);

        return newHorses;
      });
    }, 200);
  };

  useEffect(() => {
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, []);

  return (
    <div className="flex flex-col items-center p-6 space-y-6">
      <Card className="w-full max-w-2xl">
        <CardContent className="space-y-4">
          <div className="flex space-x-2">
            <Input
              placeholder="Masukkan nama peserta"
              value={inputName}
              onChange={(e) => setInputName(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && addParticipant()}
            />
            <Button onClick={addParticipant}>Tambah</Button>
          </div>
          <div className="flex flex-wrap gap-2">
            {participants.map((p) => (
              <span
                key={p}
                className="px-3 py-1 bg-gray-200 rounded-full text-sm"
              >
                {p}
              </span>
            ))}
          </div>
          <Button
            onClick={startRace}
            disabled={running || participants.length < 2}
          >
            Mulai Balapan
          </Button>
        </CardContent>
      </Card>

      {/* Arena */}
      <div className="relative w-full overflow-hidden border rounded-2xl shadow-lg h-[300px] bg-gradient-to-b from-green-300 to-yellow-200">
        <motion.div
          className="absolute top-0 left-0 h-full"
          animate={{ x: -cameraX }}
          transition={{ type: "spring", stiffness: 50, damping: 20 }}
          style={{ width: trackLength + 200 }}
        >
          {horses.map((h, i) => (
            <motion.div
              key={h.name}
              className="absolute flex items-center"
              style={{
                top: 50 + i * 60,
              }}
              animate={{ x: h.pos }}
              transition={{ ease: "linear", duration: 0.2 }}
            >
              <DotLottieReact
                src="https://lottie.host/a054c9e2-5cc9-4fec-bca4-bc8078d095cc/mbsdM5uutD.lottie"
                loop
                autoplay

                className="scale-[0.5]"
              />
              <span className="ml-2 bg-white px-2 py-1 rounded shadow">
                {h.name}
              </span>
            </motion.div>
          ))}

          {/* Garis Finish */}
          <div
            className="absolute top-0 bottom-0 w-2 bg-red-600"
            style={{ left: finishLine }}
          />
        </motion.div>
      </div>

      {winner && (
        <div className="text-2xl font-bold text-green-700">
          🎉 Pemenangnya adalah: {winner}!
        </div>
      )}
    </div>
  );
}
