import { AxiosError } from "axios";
import { useRef, useState } from "react";
import { useTheme } from "styled-components";

import API from "@/common/api";
import { Box } from "@/common/components/atoms";
import { API_URL_CONSTANTS } from "@/common/constants/url.constants";
import useCreatorFollowers from "@/creators/context/CreatorFollowerContext";

import CreatorFollowerTable from "../CreatorFollowerTable";

export default function CreatorFollowersTab(): JSX.Element {
  const [href, setHref] = useState<string | undefined>(undefined);
  const ref = useRef<HTMLAnchorElement>(null);
  const { followers, setPage, loading, currentPage, pageCount } =
    useCreatorFollowers();
  const { space } = useTheme();

  function triggerFileDownload(response: string): void {
    if (ref.current) {
      const blob = new Blob([response], { type: "text/csv" });
      const url = window.URL.createObjectURL(blob);
      setHref(url);
      ref.current.click();
      window.URL.revokeObjectURL(url);
    }
  }

  async function handleExportCsvBtnClick(): Promise<undefined | unknown> {
    try {
      const { data } = await API().get<string>(
        API_URL_CONSTANTS.creator.downloadCreatorFollowersCsv
      );
      triggerFileDownload(data);
    } catch (err) {
      return [undefined, err as AxiosError];
    }
  }

  return (
    <Box px={[0, space.xs]} py={space.xxs} overflowX="auto">
      <a
        ref={ref}
        href={href}
        style={{ display: "none" }}
        download="followers.csv"
      />
      <CreatorFollowerTable
        pageCount={pageCount}
        currentPage={currentPage}
        loading={loading}
        data={followers}
        onPressDownloadCSV={handleExportCsvBtnClick}
        setPage={setPage}
      />
    </Box>
  );
}
