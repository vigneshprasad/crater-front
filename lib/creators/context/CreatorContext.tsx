import { createContext, PropsWithChildren, useContext, useMemo } from "react";
import useSWR, { SWRResponse } from "swr";

import { API_URL_CONSTANTS } from "@/common/constants/url.constants";

import { Creator } from "../types/creator";

interface ICreatorState {
  creator?: Creator;
  error?: unknown;
  mutateCreator: SWRResponse<Creator, unknown>["mutate"];
  loading: boolean;
}

export const CreatorContext = createContext({} as ICreatorState);

type IProviderProps = PropsWithChildren<{
  slug: string;
  initial?: Creator;
}>;

export function CreatorProvider({
  slug,
  initial,
  ...rest
}: IProviderProps): JSX.Element {
  const {
    data: creator,
    error,
    mutate: mutateCreator,
  } = useSWR<Creator>(API_URL_CONSTANTS.creator.retrieveCreatorSlug(slug), {
    initialData: initial,
    revalidateOnMount: true,
  });

  const value: ICreatorState = useMemo(
    () => ({
      creator,
      error,
      loading: !creator && !error,
      mutateCreator,
    }),
    [creator, error, mutateCreator]
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
