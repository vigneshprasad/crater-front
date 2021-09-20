import { createContext, PropsWithChildren, useContext, useMemo } from "react";
import useSWR from "swr";

import { API_URL_CONSTANTS } from "@/common/constants/url.constants";

import { Creator } from "../types/creator";

interface ICreatorState {
  creator?: Creator;
  error?: unknown;
  loading: boolean;
}

export const CreatorContext = createContext({} as ICreatorState);

type IProviderProps = PropsWithChildren<{
  id: string;
  initial?: Creator;
}>;

export function CreatorProvider({
  id,
  initial,
  ...rest
}: IProviderProps): JSX.Element {
  const { data: creator, error } = useSWR<Creator>(
    `${API_URL_CONSTANTS.creator.getCreatorList}${id}/`,
    { initialData: initial }
  );

  const value: ICreatorState = useMemo(
    () => ({
      creator,
      error,
      loading: !creator && !error,
    }),
    [creator, error]
  );

  return <CreatorContext.Provider value={value} {...rest} />;
}

export function useCreator(): ICreatorState {
  const context = useContext(CreatorContext);

  if (!context) {
    throw new Error("Please use CreatorProvider in tree.");
  }

  return context;
}
