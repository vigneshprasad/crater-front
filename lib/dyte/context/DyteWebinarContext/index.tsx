import { AxiosError } from "axios";
import { useSession } from "next-auth/client";
import {
  createContext,
  PropsWithChildren,
  useContext,
  useMemo,
  useEffect,
  useState,
} from "react";

import DyteApiClient from "@/dyte/api";
import { DyteParticpant } from "@/dyte/types/dyte";

interface IDyteWebinarState {
  loading: boolean;
  error?: unknown;
  dyteParticipant?: DyteParticpant;
}

export const DyteWebinarContext = createContext({} as IDyteWebinarState);

type IProviderProps = PropsWithChildren<{
  id: string;
}>;

export function DyteWebinarProvider({
  id,
  ...rest
}: IProviderProps): JSX.Element {
  const [session] = useSession();
  const [dyteParticipant, setDyteParticipant] = useState<
    DyteParticpant | undefined
  >(undefined);
  const [error, setError] = useState<AxiosError | undefined>(undefined);

  useEffect(() => {
    const apiCall = async (): Promise<void> => {
      const [data, serverError] = await DyteApiClient().postDyteWebinarConnect(
        id
      );

      if (serverError) {
        setDyteParticipant(undefined);
        setError(serverError);
      }

      if (data) {
        setDyteParticipant(data);
        setError(undefined);
      }
    };
    if (session && session.user) {
      apiCall();
    }
  }, [id, session]);

  const value = useMemo(
    () => ({
      dyteParticipant,
      error,
      loading: !dyteParticipant && !error,
    }),
    [dyteParticipant, error]
  );

  return <DyteWebinarContext.Provider value={value} {...rest} />;
}

export default function useDyteWebinar(): IDyteWebinarState {
  const context = useContext(DyteWebinarContext);

  if (!context) {
    throw new Error("Please use DyteWebinarProvider in tree.");
  }

  return context;
}
