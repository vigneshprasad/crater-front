import useSWR from "swr";

import { API_URL_CONSTANTS } from "@/common/constants/url.constants";
import { PageResponse } from "@/common/types/api";
import fetcher from "@/common/utils/fetcher";

import { Creator } from "../types/creator";

export type IUseCreatorListProps = {
  initialData?: PageResponse<Creator>;
  certified?: boolean;
};

export type IUseCreatorListState = {
  creators?: PageResponse<Creator>;
  error?: unknown;
};

export function useCreatorList({
  initialData,
  certified = true,
}: IUseCreatorListProps): IUseCreatorListState {
  const { data, error } = useSWR<PageResponse<Creator>>(
    `${API_URL_CONSTANTS.creator.getCreatorList}?certified=${certified}`,
    fetcher,
    {
      initialData,
    }
  );
  return {
    creators: data,
    error,
  };
}
