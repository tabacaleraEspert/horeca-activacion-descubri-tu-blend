"use client";

import BlendQuiz from "@/components/BlendQuiz";
import Preloader from "@/components/Preloader";
import { BLEND_GAME } from "@/games/blend/config";
import { IDOLO_GAME } from "@/games/idolo/config";
import type { GameId } from "@/lib/types";

// Las configs tienen componentes y funciones: se resuelven del lado cliente.
const GAMES = { blend: BLEND_GAME, idolo: IDOLO_GAME };

export default function AppClient({ gameId = "blend" }: { gameId?: GameId }) {
  const game = GAMES[gameId];
  return (
    <>
      <Preloader {...game.preload} />
      <BlendQuiz game={game} />
    </>
  );
}
