import Head from "next/head";
import styles from "../styles/Home.module.css";
import React, { useState } from "react";
import { useChannel, useEvent } from "@harelpls/use-pusher";

export default function Home() {
  const beatColours = { 0: "#eb6123" };
  const sfxColours = { 0: "#eb6123" };
  const [colour, setColour] = useState("#000");
  const channel = useChannel("sound-festival");
  function sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }
  useEvent(channel, "incoming", async ({ beat, sfx }) => {
    setColour(beat ? beatColours[beat] : sfxColours[sfx]);
    await sleep(2000);
    setColour("#000");
  });
  return <div style={{ backgroundColor: colour, height: "100vh" }}></div>;
}
