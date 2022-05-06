import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { DefaultTheme, ThemeProvider } from "styled-components";

import useAuth from "@/auth/context/AuthContext";

interface ProviderProps {
  children: React.ReactNode | React.ReactNode[];
  host?: string;
}

interface IChatColorModeState {
  colorMode: string;
  toggleColorMode: () => void;
}

export const ChatColorModeContext = createContext({} as IChatColorModeState);

export function ChatColorModeProvider({
  children,
  host,
}: ProviderProps): JSX.Element {
  const [colorMode, setColorMode] = useState<string>();
  const { user } = useAuth();

  useEffect(() => {
    const mode = localStorage.getItem("chatColorMode") || "dark";
    setColorMode(mode);
  }, []);

  const toggleColorMode = useCallback(() => {
    const newColorMode =
      user?.pk === host && colorMode === "dark" ? "light" : "dark";
    setColorMode(newColorMode);
    localStorage.setItem("chatColorMode", newColorMode);
  }, [colorMode, user, host]);

  const setTheme = useCallback(
    (theme: DefaultTheme): DefaultTheme => {
      if (colorMode === "light") {
        return {
          ...theme,
          colors: {
            ...theme.colors,
            slate: "#868686",
            white: ["#9146FF", "#b9b9b9"],
            black: [
              "#333333",
              "#1B1D21",
              "#E6E6E6",
              "#242731",
              "#191B20",
              "#EDEDED",
              "#18181A",
              "#000000",
            ],
            chatColors: [
              "#6308BA",
              "#1C91B5",
              "#D39409",
              "#15AF04",
              "#D34242",
              "#2752CC",
            ],
          },
        };
      }

      return theme;
    },
    [colorMode]
  );

  const value: IChatColorModeState = useMemo(
    () => ({
      colorMode: colorMode ?? "dark",
      toggleColorMode,
    }),
    [colorMode, toggleColorMode]
  );

  return (
    <ChatColorModeContext.Provider value={value}>
      <ThemeProvider theme={setTheme}>{children}</ThemeProvider>
    </ChatColorModeContext.Provider>
  );
}

export default function useChatColorMode(): IChatColorModeState {
  const context = useContext(ChatColorModeContext);

  if (!context) {
    throw new Error("You need to wrap ChatColorModeProvider.");
  }

  return context;
}
