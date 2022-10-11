import {
  createContext,
  PropsWithChildren,
  useContext,
  useEffect,
  useMemo,
} from "react";
import useSWR from "swr";

import useAuth from "@/auth/context/AuthContext";
import { API_URL_CONSTANTS } from "@/common/constants/url.constants";
import { postFetcher } from "@/common/utils/fetcher";
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
  const { user } = useAuth();
  const {
    data: dyteParticipant,
    error,
    mutate,
  } = useSWR<DyteParticpant>(
    user?.apiToken && id
      ? API_URL_CONSTANTS.integrations.dyte.connect(id)
      : null,
    postFetcher,
    {
      revalidateOnMount: false,
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
    }
  );

  useEffect(() => {
    if (user?.apiToken && !dyteParticipant) {
      mutate();
    }
  }, [user, dyteParticipant, mutate]);

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
