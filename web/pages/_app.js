import "../styles/globals.css";
import { PusherProvider } from "@harelpls/use-pusher";
import { ThemeProvider } from "theme-ui";
import base from "@hackclub/theme";
import '@hackclub/theme/fonts/reg-bold.css'

let theme = base;

const colors = {
  darker: "#121217",
  dark: "#17171d",
  darkless: "#252429",

  black: "#1f2d3d",
  steel: "#273444",
  slate: "#3c4858",
  muted: "#8492a6",
  smoke: "#e0e6ed",
  snow: "#f9fafc",
  white: "#ffffff",

  red: "#ec3750",
  orange: "#ff8c37",
  yellow: "#f1c40f",
  green: "#33d6a6",
  cyan: "#5bc0de",
  blue: "#338eda",
  purple: "#a633d6",

  twitter: "#1da1f2",
  facebook: "#3b5998",
  instagram: "#e1306c",
};

theme.colors = {
  ...colors,
  text: colors.white,
  background: colors.dark,
  elevated: colors.darkless,
  sheet: colors.darkless,
  sunken: colors.darker,
  border: colors.darkless,
  placeholder: colors.slate,
  secondary: colors.muted,
  muted: colors.muted,
  accent: colors.cyan,
  modes: {
    dark: {
      text: colors.white,
      background: colors.dark,
      elevated: colors.darkless,
      sheet: colors.darkless,
      sunken: colors.darker,
      border: colors.darkless,
      placeholder: colors.slate,
      secondary: colors.muted,
      muted: colors.muted,
      accent: colors.cyan,
    },
  },
};
const config = {
  // required config props
  clientKey: "b0fffd0f6692eadd6d60",
  appId: "1155455",
  cluster: "us2",
  useTLS: true,
};

function MyApp({ Component, pageProps }) {
  return (
    <ThemeProvider theme={theme}>
      <PusherProvider {...config}>
        <Component {...pageProps} />
      </PusherProvider>
    </ThemeProvider>
  );
}

export default MyApp;
