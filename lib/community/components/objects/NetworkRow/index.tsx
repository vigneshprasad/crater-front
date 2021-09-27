import { Profile } from "next-auth";
import { useCallback, useRef } from "react";
import { useTheme } from "styled-components";
import { useSWRInfinite } from "swr";

import { UserTag } from "@/auth/types/auth";
import { Box, Grid, GridProps, Text } from "@/common/components/atoms";
import { Button } from "@/common/components/atoms/Button";
import { API_URL_CONSTANTS } from "@/common/constants/url.constants";
import { PageResponse } from "@/common/types/api";
import { MemberItem } from "@/creators/components/objects/MembersList";

type IProps = GridProps & {
  tag: UserTag;
  onClickItem?: (member: Profile) => void;
  onClickCardButton?: () => void;
};

export default function NetworkRow({
  tag,
  onClickItem,
  onClickCardButton,
  ...rest
}: IProps): JSX.Element | null {
  const { space, colors, radii } = useTheme();
  const _observer = useRef<IntersectionObserver>();

  const { data: pageData, setSize } = useSWRInfinite<PageResponse<Profile>>(
    (index, previousData) => {
      const page = index + 1;
      if (previousData && !previousData.next) return null;
      return `${API_URL_CONSTANTS.network.getUserProfile}?new_tag=${tag.pk}&page=${page}`;
    }
  );

  const ref = useCallback(
    (node: HTMLElement | null) => {
      if (_observer.current) _observer.current.disconnect();

      _observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
          setSize((size) => size + 1);
        }
      });

      if (node !== null) _observer.current.observe(node);
    },
    [_observer, setSize]
  );

  const handleOnClickItem = useCallback(
    (member: Profile) => {
      if (onClickItem) {
        onClickItem(member);
      }
    },
    [onClickItem]
  );

  const handleOnClickCard = useCallback(() => {
    if (onClickCardButton) {
      onClickCardButton();
    }
  }, [onClickCardButton]);

  const members = pageData?.flatMap((item) => item.results);

  if (members && members.flat().length < 10) {
    return null;
  }

  return (
    <Grid
      gridGap={space.m}
      gridAutoFlow="column"
      overflowX="auto"
      gridAutoColumns="max-content"
      borderRadius={radii.xxs}
      alignItems="center"
      {...rest}
    >
      <Box
        w={[220, 240]}
        p={space.xs}
        bg={colors.black[1]}
        borderRadius={radii.xs}
      >
        <Text textStyle="headline5">Connect with</Text>
        <Text maxLines={2} textStyle="headline5" mb={space.xxs}>
          {`${tag.name}s`}
        </Text>
        <Text color={colors.slate} mb={space.s}>
          Let our AI engine curate 1:1 meetings for you.
        </Text>
        <Button
          onClick={handleOnClickCard}
          px={0}
          variant="nav-button"
          text="Match me"
        />
      </Box>
      {members?.map((member, index) => {
        return (
          <MemberItem
            ref={index + 1 === members.length ? ref : undefined}
            tagLine={member.tag_list?.[0].name}
            onClick={() => {
              handleOnClickItem(member);
            }}
            key={member.pk}
            name={member.name}
            image={member.photo}
          />
        );
      })}
    </Grid>
  );
}
