import "../styles/globals.css";
import { PusherProvider } from "@harelpls/use-pusher";

const config = {
  // required config props
  clientKey: "b0fffd0f6692eadd6d60",
  appId: "1155455",
  cluster: "us2",
  useTLS: true,
};

function MyApp({ Component, pageProps }) {
  return (
    <PusherProvider {...config}>
      <Component {...pageProps} />
    </PusherProvider>
  );
}

export default MyApp;
