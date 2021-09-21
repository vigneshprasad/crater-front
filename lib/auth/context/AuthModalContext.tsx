import {
  createContext,
  PropsWithChildren,
  useCallback,
  useContext,
  useMemo,
  useState,
} from "react";

interface IAuthModalState {
  visible: boolean;
  onClose: () => void;
  openModal: () => void;
}

export const AuthModalContext = createContext<IAuthModalState>(
  {} as IAuthModalState
);

type IProviderProps = PropsWithChildren<{
  initial?: boolean;
}>;

export function AuthModalProvider({
  initial,
  children,
}: IProviderProps): JSX.Element {
  const [visible, setVisible] = useState(initial ?? false);

  const onClose = useCallback((): void => {
    setVisible(false);
  }, [setVisible]);

  const openModal = useCallback(() => {
    setVisible(true);
  }, [setVisible]);

  const value: IAuthModalState = useMemo(
    () => ({
      visible,
      onClose,
      openModal,
    }),
    [visible, onClose, openModal]
  );
  return (
    <AuthModalContext.Provider value={value}>
      {children}
    </AuthModalContext.Provider>
  );
}

export default function useAuthModal(): IAuthModalState {
  const context = useContext(AuthModalContext);

  if (!context) {
    throw new Error("You need to wrap AuthModalProvider.");
  }

  return context;
}
