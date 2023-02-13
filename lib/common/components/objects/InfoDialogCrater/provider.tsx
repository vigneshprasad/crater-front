import {
  createContext,
  PropsWithChildren,
  useContext,
  useMemo,
  useRef,
} from "react";

interface InfoDialogCraterState {
  dialogRef: React.RefObject<HTMLDivElement & HTMLDialogElement>;
}

export const InfoDialogCraterContext = createContext(
  {} as InfoDialogCraterState
);

type ProviderProps = PropsWithChildren<unknown>;

export function InfoDialogCraterStateProvider({
  children,
}: ProviderProps): JSX.Element {
  const dialogRef = useRef<HTMLDivElement & HTMLDialogElement>(null);
  const value = useMemo(() => ({ dialogRef }), [dialogRef]);
  return (
    <InfoDialogCraterContext.Provider value={value}>
      {children}
    </InfoDialogCraterContext.Provider>
  );
}

export default function useInfoCraterDialog(): InfoDialogCraterState {
  const context = useContext(InfoDialogCraterContext);

  if (!context) {
    throw new Error("You need to wrap InfoDialogCraterContext.");
  }

  return context;
}
