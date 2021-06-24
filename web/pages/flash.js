import Head from "next/head";
import styles from "../styles/Home.module.css";
import React, { useState } from "react";
import { useChannel, useEvent } from "@harelpls/use-pusher";

export default function Home() {
  const beatColours = { 0: "#eb6123", 1: "#a633d6", 2: "#33d6a6" };
  const sfxColours = {
    0: "#5bc0de",
    1: "#ec3750",
    2: "#a633d6",
    3: "#ec3750",
    4: "#ff8c37",
    5: "#f1c40f",
    6: "#a633d6",
    7: "#33d6a6",
    8: "#338eda",
    9: "#a633d6",
    10: '#5bc0de',
    11: '#338eda'
  };
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
