import Head from "next/head";
import styles from "../styles/Home.module.css";
import React, { useState } from "react";
import { useChannel, useEvent } from "@harelpls/use-pusher";

export default function Home() {
  const colours = { spooky: "#eb6123" };
  const [colour, setColour] = useState("#000");
  const channel = useChannel("sound-festival");
  function sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }
  useEvent(channel, "mood-change", async ({ type }) => {
    setColour(colours[type]);
    await sleep(2000);
    setColour("#000");
  });
  return <div style={{ backgroundColor: colour, height: "100vh" }}></div>;
}
