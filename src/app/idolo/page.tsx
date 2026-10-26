import type { Metadata } from "next";
import AppClient from "../AppClient";

export const metadata: Metadata = {
  title: "Van Kiff · Premios Ídolo",
  description: "¿Qué blend sos? Activación Van Kiff · Premios Ídolo.",
  manifest: "/idolo.webmanifest",
};

export default function IdoloPage() {
  return <AppClient gameId="idolo" />;
}
