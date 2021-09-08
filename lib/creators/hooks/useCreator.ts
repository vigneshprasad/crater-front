import useSWR from "swr";

import { API_URL_CONSTANTS } from "@/common/constants/url.constants";

import { Creator } from "../types/creator";

export type IUseCreatorProps = {
  id?: number;
};

export type IUseCreatorState = {
  creator?: Creator;
  loading: boolean;
  error?: unknown;
};

export function useCreator({ id }: IUseCreatorProps): IUseCreatorState {
  const { data, error } = useSWR<Creator>(
    id ? API_URL_CONSTANTS.creator.retrieveCreator(id) : null
  );
  return {
    creator: data,
    loading: !data && !error,
    error,
  };
}
