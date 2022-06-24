import {
  createContext,
  Dispatch,
  PropsWithChildren,
  SetStateAction,
  useContext,
  useMemo,
  useState,
} from "react";

interface ILearnModalState {
  visible: boolean;
  setVisible: Dispatch<SetStateAction<boolean>>;
}

const LearModalContext = createContext({} as ILearnModalState);

type ProviderProps = PropsWithChildren<{
  initial?: boolean;
}>;

export function LearnModalProvider({
  initial,
  children,
}: ProviderProps): JSX.Element {
  const [visible, setVisible] = useState(initial ?? false);

  const value = useMemo(() => ({ visible, setVisible }), [visible, setVisible]);
  return (
    <LearModalContext.Provider value={value}>
      {children}
    </LearModalContext.Provider>
  );
}

export default function useLearnModalContext(): ILearnModalState {
  const context = useContext(LearModalContext);

  if (!context) {
    throw new Error("You need to wrap LearnModalProvider.");
  }

  return context;
}
