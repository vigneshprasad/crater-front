import {
  createContext,
  Dispatch,
  PropsWithChildren,
  SetStateAction,
  useContext,
  useMemo,
  useState,
} from "react";

export interface AsideNavState {
  opened: boolean;
  setOpened: Dispatch<SetStateAction<boolean>>;
}

const AsideNavContext = createContext({} as AsideNavState);

export type IAppNavbarProviderProps = PropsWithChildren<unknown>;

export function AsideNavProvider({
  ...props
}: IAppNavbarProviderProps): JSX.Element {
  const [opened, setOpened] = useState(false);

  const value = useMemo(
    () => ({
      opened,
      setOpened,
    }),
    [opened, setOpened]
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
