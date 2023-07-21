import "@/styles/globals.css";
import { ThemeProvider } from "next-themes";
import type { AppProps } from "next/app";
import { useEffect } from "react";
import { AuthProvider } from "@/contexts/AuthContext";
import { AtendimentoProvider } from "@/contexts/AtendimentoContext";
import { SelectedOwnerProvider } from "../contexts/SelectedOwnerContext";
import { AnimalProvider } from "../contexts/AnimalContext";

export default function App({ Component, pageProps }: AppProps) {
  useEffect(() => {
    document.documentElement.classList.add("dark");
  }, []);
  return (
    <AuthProvider>
      <AtendimentoProvider>
        <ThemeProvider enableSystem={true} attribute="class">
          <Component {...pageProps} />
        </ThemeProvider>
      </AtendimentoProvider>
    </AuthProvider>
  );
}
