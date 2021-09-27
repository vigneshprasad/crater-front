import { AnimationControls, useAnimation } from "framer-motion";
import {
  createContext,
  PropsWithChildren,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { useTheme } from "styled-components";

import useMediaQuery from "./useMediaQuery";

export type NavbarAnimState = "hidden" | "collapse" | "expanded";

export interface AsideNavState {
  mobileExpanded: boolean;
  visible: boolean;
  animate: AnimationControls;
  isMobile?: boolean;
  toggleNavBar: () => void;
}

const AsideNavContext = createContext({} as AsideNavState);

export type IAppNavbarProviderProps = PropsWithChildren<unknown>;

export function AsideNavProvider({
  ...props
}: IAppNavbarProviderProps): JSX.Element {
  const [expanded, setExpaned] = useState(false);
  const { breakpoints } = useTheme();
  const { matches: isMobile } = useMediaQuery(`(max-width: ${breakpoints[0]})`);
  const animate = useAnimation();

  useEffect(() => {
    if (isMobile !== undefined) {
      animate.start(isMobile ? "hidden" : "collapsed");
    }
  }, [isMobile, animate]);

  const toggleNavBar = useCallback(() => {
    if (isMobile) {
      if (expanded) {
        animate.start("hidden");
        setExpaned(false);
      } else {
        console.log(expanded);
        animate.start("expanded");
        setExpaned(true);
      }
    }
  }, [isMobile, animate, expanded, setExpaned]);

  const value = useMemo(
    () => ({
      visible: true,
      animate,
      isMobile,
      toggleNavBar,
      mobileExpanded: expanded,
    }),
    [animate, isMobile, toggleNavBar, expanded]
  );

  return <AsideNavContext.Provider value={value} {...props} />;
}

export default function useAsideNavState(): AsideNavState {
  const context = useContext(AsideNavContext);

  if (!context) {
    throw new Error("Please use AsideNavProvider in tree.");
  }

  return context;
}
