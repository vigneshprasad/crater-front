import { RefObject, useMemo, useContext, useRef, createContext } from "react";

interface BaseLayoutState {
  scrollRef: RefObject<HTMLDivElement>;
}

export const BaseLayoutContext = createContext({} as BaseLayoutState);

type IProps = {
  children?: React.ReactNode | undefined;
};

export function BaseLayoutProvider({ ...rest }: IProps): JSX.Element {
  const scrollRef = useRef<HTMLDivElement>(null);
  const value = useMemo(() => ({ scrollRef }), [scrollRef]);
  return <BaseLayoutContext.Provider value={value} {...rest} />;
}

export function useBaseLayout(): BaseLayoutState {
  const context = useContext(BaseLayoutContext);

  if (!context) {
    throw Error("user BaseLayout Provider in tree");
  }

  return context;
}
