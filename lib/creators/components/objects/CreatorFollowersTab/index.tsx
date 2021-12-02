import { AxiosError } from "axios";
import { useRef, useState } from "react";
import { useTheme } from "styled-components";

import API from "@/common/api";
import { Box, Grid, Text } from "@/common/components/atoms";
import { Button } from "@/common/components/atoms/Button";
import IconButton from "@/common/components/atoms/IconButton";
import { API_URL_CONSTANTS } from "@/common/constants/url.constants";
import useCreatorFollowers from "@/creators/context/CreatorFollowerContext";

import CreatorFollowerTable from "../CreatorFollowerTable";

export default function CreatorFollowersTab(): JSX.Element {
  const [href, setHref] = useState<string | undefined>(undefined);
  const ref = useRef<HTMLAnchorElement>(null);
  const { followers, setPage, loading, currentPage, pageCount } =
    useCreatorFollowers();
  const { space, zIndices } = useTheme();

  function triggerFileDownload(response: string): void {
    if (ref.current) {
      const blob = new Blob([response], { type: "text/csv" });
      const url = window.URL.createObjectURL(blob);
      setHref(url);
      ref.current.click();
      window.URL.revokeObjectURL(url);
    }
  }

  function onClickNextPage(): void {
    if (currentPage < pageCount) {
      setPage((page) => page + 1);
    }
  }

  function onClickPrevPage(): void {
    if (currentPage > 1) {
      setPage((page) => page - 1);
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
    <Box p={space.xs}>
      <a
        ref={ref}
        href={href}
        style={{ display: "none" }}
        download="followers.csv"
      />
      <Grid
        gridAutoFlow="column"
        gridGap={space.xxs}
        gridAutoColumns="max-content"
        w="80%"
        m="0 auto"
        position="sticky"
        alignItems="center"
        justifyContent="space-between"
      >
        <Button
          text="Export CSV"
          variant="nav-button"
          m="16px auto"
          onClick={handleExportCsvBtnClick}
        />
        <Grid
          gridAutoColumns="max-content"
          gridAutoFlow="column"
          gridGap={space.xxxs}
        >
          <IconButton
            display={["none", "block"]}
            zIndex={zIndices.sliderControls}
            variant="roundSmall"
            icon="ChevronLeft"
            onClick={onClickPrevPage}
          />
          <Text alignSelf="center">
            Page {currentPage} of {pageCount}
          </Text>
          <IconButton
            display={["none", "block"]}
            zIndex={zIndices.sliderControls}
            variant="roundSmall"
            icon="ChevronRight"
            onClick={onClickNextPage}
          />
        </Grid>
      </Grid>
      <CreatorFollowerTable loading={loading} data={followers} />
    </Box>
  );
}
