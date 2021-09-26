import { Profile } from "next-auth";
import { useCallback } from "react";
import { useTheme } from "styled-components";
import { useSWRInfinite } from "swr";

import { UserTag } from "@/auth/types/auth";
import { Box, Grid, GridProps, Text } from "@/common/components/atoms";
import { Button } from "@/common/components/atoms/Button";
import { API_URL_CONSTANTS } from "@/common/constants/url.constants";
import { PageResponse } from "@/common/types/api";
import fetcher from "@/common/utils/fetcher";
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
}: IProps): JSX.Element {
  const { space, colors, radii } = useTheme();

  const { data: members } = useSWRInfinite(
    (index, previousData) => {
      const page = index + 1;
      if (previousData && !previousData.length) return null;
      return `${API_URL_CONSTANTS.network.getUserProfile}?tags=${tag.pk}&page=${page}`;
    },
    async (key: string) => {
      return (await fetcher<PageResponse<Profile>>(key)).results;
    }
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
          {tag.name}
        </Text>
        <Text color={colors.slate} mb={space.s}>
          Discover the best live streams anywhere.
        </Text>
        <Button
          onClick={handleOnClickCard}
          px={0}
          variant="nav-button"
          text="Match me"
        />
      </Box>
      {members?.flat().map((member) => {
        return (
          <MemberItem
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
