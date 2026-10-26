"use client";

import BlendQuiz from "@/components/BlendQuiz";
import Preloader from "@/components/Preloader";

export default function AppClient() {
  return (
    <>
      <Preloader />
      <BlendQuiz />
    </>
  );
}
