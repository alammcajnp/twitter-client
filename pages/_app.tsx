import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { Inter, Quicksand } from "next/font/google";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { Toaster } from "react-hot-toast";

const inter = Inter({ subsets: ["latin"] });
const quicksand = Quicksand({ subsets: ["latin"] });

export default function App({ Component, pageProps }: AppProps) {
  return (
    <div className={quicksand.className}>
      <GoogleOAuthProvider clientId="1000911571615-fv5lbtfqtorigv6eaqeqgohgfe8ie1ea.apps.googleusercontent.com">
        <Component {...pageProps} />
        <Toaster />
      </GoogleOAuthProvider>
    </div>
  );
}
