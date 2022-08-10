import { AxiosError } from "axios";
import { useMemo, useRef, useState } from "react";
import { useTheme } from "styled-components";

import API from "@/common/api";
import {
  Box,
  Flex,
  Icon,
  Image,
  Shimmer,
  Spinner,
  Text,
} from "@/common/components/atoms";
import { Button, IconButton } from "@/common/components/atoms/v2";
import { API_URL_CONSTANTS } from "@/common/constants/url.constants";
import { PageResponse } from "@/common/types/api";
import { Follower } from "@/community/types/community";
import useCreatorFollowers from "@/creators/context/CreatorFollowerContext";

import CreatorFollowerTable from "../CreatorFollowerTable";

export default function HubClubMembersTab(): JSX.Element {
  const { space, colors, radii, borders } = useTheme();
  const [href, setHref] = useState<string | undefined>(undefined);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const ref = useRef<HTMLAnchorElement>(null);
  const {
    followerPages,
    loading: followersLoading,
    pageSize,
    setCreatorFollowersPage,
  } = useCreatorFollowers();

  function triggerFileDownload(response: string): void {
    if (ref.current) {
      const blob = new Blob([response], { type: "text/csv" });
      const url = window.URL.createObjectURL(blob);
      setHref(url);
      ref.current.click();
      window.URL.revokeObjectURL(url);
      setLoading(false);
    }
  }

  async function handleDownloadClick(): Promise<undefined | unknown> {
    try {
      setLoading(true);
      const { data } = await API().get<string>(
        API_URL_CONSTANTS.creator.downloadCreatorFollowersCsv
      );
      triggerFileDownload(data);
    } catch (err) {
      return [undefined, err as AxiosError];
    }
  }

  const currentFollowerPage = useMemo<
    PageResponse<Follower> | undefined
  >(() => {
    if (followerPages) {
      return followerPages[currentPage - 1];
    }

    return undefined;
  }, [followerPages, currentPage]);

  const countRange = useMemo<string>(() => {
    if (currentFollowerPage) {
      const { count } = currentFollowerPage;
      const maxCount =
        pageSize * currentPage > count ? count : pageSize * currentPage;

      return `${(currentPage - 1) * pageSize + 1} - ${maxCount}`;
    }

    return "";
  }, [currentPage, pageSize, currentFollowerPage]);

  async function onClickNextPage(): Promise<void> {
    if (currentFollowerPage?.next) {
      await setCreatorFollowersPage((page) => page + 1);
      setCurrentPage((page) => page + 1);
    }
  }

  async function onClickPrevPage(): Promise<void> {
    if (currentPage > 1) {
      await setCreatorFollowersPage((page) => page - 1);
      setCurrentPage((page) => page - 1);
    }
  }

  return (
    <Box pt={space.xxs} overflow="auto" minWidth={1000}>
      <a
        ref={ref}
        href={href}
        style={{ display: "none" }}
        download="followers.csv"
      />
      <Flex
        pb={space.xxs}
        flexDirection="row"
        justifyContent="space-between"
        alignItems="center"
        gridGap={space.xxs}
      >
        <Box>
          <Text textStyle="headline5" fontWeight={600} flexGrow={1}>
            Club Members
          </Text>
          <Text pt={space.xxxxs} textStyle="body" color={colors.textTertiary}>
            This is a list of all your followers. We call them your club
            members.
          </Text>
        </Box>

        <Button
          h={40}
          label="Download CSV"
          prefixElement={
            loading ? <Spinner size={24} /> : <Icon icon="Download" size={16} />
          }
          disabled={loading || currentFollowerPage?.results.length === 0}
          onClick={handleDownloadClick}
        />
      </Flex>

      <Box border={`1px solid ${borders.primary}`} borderRadius={radii.xxxxs}>
        {(() => {
          if (!followerPages || !currentFollowerPage || followersLoading) {
            return <Shimmer w="100%" h={300} />;
          }

          if (currentFollowerPage.results.length === 0) {
            return (
              <Box p={space.s} bg={colors.primaryDark}>
                <Flex
                  flexDirection="column"
                  gridGap={space.xxxs}
                  alignItems="center"
                >
                  <Box w={136} h={136}>
                    <Image
                      src="/images/img_referral_alt.png"
                      alt="empty-state-image"
                    />
                  </Box>
                  <Box>
                    <Text textStyle="body" textAlign="center">
                      You have no followers yet.
                    </Text>
                    <Text
                      pt={space.xxxxs}
                      textStyle="body"
                      color="#959595"
                      textAlign="center"
                    >
                      Stream regularly to build your own community on Crater.
                    </Text>
                  </Box>
                </Flex>
              </Box>
            );
          }

          return (
            <>
              <CreatorFollowerTable data={currentFollowerPage.results} />
              <Flex
                px={space.xxs}
                h={40}
                flexDirection="row"
                justifyContent="flex-end"
                alignItems="center"
                bg={colors.primaryLight}
              >
                <Flex gridGap={space.xxxxs} alignItems="center">
                  <Box
                    px={space.xxxs}
                    py={6}
                    bg={colors.primaryDark}
                    borderRadius={radii.xxxxs}
                  >
                    <Text textStyle="body" fontWeight={600}>
                      {countRange}
                    </Text>
                  </Box>
                  <Text textStyle="body" color={colors.textTertiary}>
                    of {currentFollowerPage.count}
                  </Text>
                  <IconButton
                    buttonStyle="round"
                    icon="ChevronLeft"
                    iconProps={{
                      color: colors.textTertiary,
                      opacity: currentFollowerPage.count > pageSize ? 1 : 0,
                    }}
                    disabled={currentFollowerPage.previous ? false : true}
                    onClick={onClickPrevPage}
                  />
                  <IconButton
                    buttonStyle="round"
                    icon="ChevronRight"
                    iconProps={{
                      color: colors.textTertiary,
                      opacity: currentFollowerPage.count > pageSize ? 1 : 0,
                    }}
                    disabled={currentFollowerPage.next ? false : true}
                    onClick={onClickNextPage}
                  />
                </Flex>
              </Flex>
            </>
          );
        })()}
      </Box>
    </Box>
  );
}
