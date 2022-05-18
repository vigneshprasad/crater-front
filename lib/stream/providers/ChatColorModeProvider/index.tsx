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
            primaryLight: "#FFFFFF",
            primaryBackground: "#EDEDED",
            textPlaceholder: "#969696",
            primaryDarkSecondary: "#FFFFFF",
            iconColor: "#333333",
            textPrimary: "#333333",
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
