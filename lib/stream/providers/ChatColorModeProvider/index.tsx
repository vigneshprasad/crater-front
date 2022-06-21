import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { DefaultTheme, ThemeProvider } from "styled-components";

interface ProviderProps {
  children: React.ReactNode | React.ReactNode[];
}

type ColorModes = "dark" | "light";

interface IChatColorModeState {
  colorMode: ColorModes;
  toggleColorMode: () => void;
}

export const ChatColorModeContext = createContext({} as IChatColorModeState);

export function ChatColorModeProvider({
  children,
}: ProviderProps): JSX.Element {
  const [colorMode, setColorMode] = useState<ColorModes>("dark");

  useEffect(() => {
    const mode =
      (localStorage.getItem("chatColorMode") as ColorModes) || "dark";
    setColorMode(mode);
  }, []);

  const toggleColorMode = useCallback(() => {
    const newColorMode = colorMode === "dark" ? "light" : "dark";
    setColorMode(newColorMode);
    localStorage.setItem("chatColorMode", newColorMode);
  }, [colorMode]);

  const setTheme = useCallback(
    (theme: DefaultTheme): DefaultTheme => {
      if (colorMode === "light") {
        return {
          ...theme,
          colors: {
            ...theme.colors,
            primaryDark: "#EDEDED",
            inputDefaultBg: "#EDEDED",
            primaryLight: "#FFFFFF",
            primaryBackground: "#FFFFFF",
            textPlaceholder: "#969696",
            primaryDarkSecondary: "#F5F5F5",
            iconColor: "#333333",
            textPrimary: "#333333",
            chatColors: ["#1C91B5", "#D39409", "#15AF04", "#D34242", "#2752CC"],
          },
          borders: {
            ...theme.borders,
            input: "#EDEDED",
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
