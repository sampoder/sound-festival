import React from "react";
import {
  Box,
  Container,
  Heading,
  Grid,
  Link,
  Badge,
  Button,
  Text,
} from "theme-ui";

export default function Home() {
  let moods = [
    {
      emoji: "🎃",
      color: "orange",
      number: "0",
    },
    {
      emoji: "⚡️",
      color: "purple",
      number: "1",
    },
    {
      emoji: "😎",
      color: "yellow",
      number: "2",
    },
  ];
  let sfx = [
    {
      emoji: "⏮",
      color: "blue",
      number: "0",
    },
    {
      emoji: "🥁",
      color: "red",
      number: "1",
    },
    {
      emoji: "🤖",
      color: "cyan",
      number: "2",
    },
    {
      emoji: "💥",
      color: "yellow",
      number: "3",
    },
    {
      emoji: "🤞",
      color: "purple",
      number: "4",
    },
    {
      emoji: "🔔",
      color: "orange",
      number: "5",
    },
    {
      emoji: "🦅",
      color: "blue",
      number: "6",
    },
    {
      emoji: "💸",
      color: "green",
      number: "7",
    },
    {
      emoji: "🎶",
      color: "red",
      number: "8",
    },
    {
      emoji: "🎸",
      color: "cyan",
      number: "10", // Skip Kahoot
    },
    {
      emoji: "💨",
      color: "green",
      number: "11", // Skip Kahoot
    },
  ];
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        alignContent: "center",
        minHeight: "100vh",
      }}
    >
      <Container py={"24px"}>
        <Grid columns={[1, 2]}>
          <Box
            sx={{
              display: "flex",
              alignContent: "flex-end",
              alignItems: "flex-end",
              justifyContent: "flex-start",
              justifyItems: "flex-start",
            }}
          >
            <Heading as="h1" sx={{ marginBlockEnd: "0em", lineHeight: "1" }}>
              Sound Festival on Twitch!
            </Heading>
          </Box>
          <Box
            sx={{
              display: "flex",
              alignContent: "flex-end",
              alignItems: "flex-end",
              justifyContent: ["flex-start", "flex-end"],
              justifyItems: ["flex-start", "flex-end"],
            }}
          >
            <Button sx={{ bg: "muted" }} as="a" href="https://www.twitch.tv/hackclubhq">No Longer Live</Button>
            <Button sx={{ bg: "blue", ml: "6px" }} as="a" href="https://github.com/sampoder">GitHub</Button>
          </Box>
        </Grid>

        <Grid columns={[3, 4]} mt={3}>
          <Box
            sx={{
              bg: "muted",
              textAlign: "center",
              borderRadius: "18px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Heading as="h1" sx={{ fontSize: ["1.4em", "3em"] }}>
              Mood:
            </Heading>
          </Box>
          {moods.map((x) => (
            <Box
              sx={{
                bg: x.color,
                textAlign: "center",
                borderRadius: "18px",
                cursor: "pointer",
                transition:
                  "transform .125s ease-in-out, box-shadow .125s ease-in-out",
                ":focus,:hover": {
                  boxShadow: "elevated",
                  transform: "scale(1.0625)",
                },
              }}
              pt={4}
              pb={3}
              onClick={() => {
                fetch(`/api/event?beat=${x.number}`);
              }}
            >
              <Heading as="h1" sx={{ fontSize: ["4em", "5em"] }}>
                {x.emoji}
              </Heading>
            </Box>
          ))}
          <Box
            sx={{
              bg: "muted",
              textAlign: "center",
              borderRadius: "18px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Heading as="h1" sx={{ fontSize: ["1.4em", "3em"] }}>
              SFXs:
            </Heading>
          </Box>
          {sfx.map((x) => (
            <Box
              sx={{
                bg: x.color,
                textAlign: "center",
                borderRadius: "18px",
                cursor: "pointer",
                transition:
                  "transform .125s ease-in-out, box-shadow .125s ease-in-out",
                ":focus,:hover": {
                  boxShadow: "elevated",
                  transform: "scale(1.0625)",
                },
              }}
              pt={4}
              pb={3}
              onClick={async () => {
                let res = await fetch(`/api/event?sfx=${x.number}`).then((r) => r.json());
                console.log(res)
                if(res.error){
                  alert(`Sorry! ${res.error}. Please try again in a bit, I do this to ensure no ears are hurt` )
                }
              }}
            >
              <Heading as="h1" sx={{ fontSize: ["4em", "5em"] }}>
                {x.emoji}
              </Heading>
            </Box>
          ))}
        </Grid>
      </Container>
    </Box>
  );
}
