import { useMemo, useState } from "react";
import { useTheme } from "styled-components";

import {
  Box,
  Text,
  Grid,
  Icon,
  Link,
  Avatar,
  Spinner,
} from "@/common/components/atoms";
import GlassBox from "@/common/components/atoms/GlassBox";
import LazyLoadButton from "@/common/components/objects/LazyLoadButton";
import { PageRoutes } from "@/common/constants/route.constants";
import CreatorApiClient from "@/creators/api";
import { CreatorRank } from "@/creators/types/creator";

interface IProps {
  rank: number;
  creator: CreatorRank;
  updatedList: () => void;
}

export function LeaderCard({
  rank,
  creator,
  updatedList,
}: IProps): JSX.Element {
  const { space, colors, radii } = useTheme();
  const [loading, setLoading] = useState(false);

  // const border = useMemo(() => {
  //   if (rank === 1) {
  //     return `2px solid ${colors.yellow[0]}`;
  //   }

  //   if (rank === 2) {
  //     return `2px solid ${colors.muted.silver}`;
  //   }

  //   if (rank === 3) {
  //     return `2px solid ${colors.muted.bronze}`;
  //   }
  //   return `2px solid ${colors.accentHover}`;
  // }, [rank, colors]);

  const icon = useMemo(() => {
    if (loading) {
      return <Spinner size={18} />;
    }

    if (creator.is_follower) {
      return (
        <Icon icon="CheckCircle" color={colors.greenSuccess} size={18} h={20} />
      );
    }

    return <Icon icon="PlusSign" size={12} h={20} />;
  }, [colors, loading, creator]);

  const followCreator = async (): Promise<void> => {
    await setLoading(true);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [_, err] = await CreatorApiClient().subscribeCreator(creator.id);
    if (err) {
      await setLoading(false);
      return;
    }
    await updatedList();
    await setLoading(false);
  };

  return (
    <Box ml={space.xs} position="relative">
      <Text
        fontFamily="LFT Etica"
        fontStyle="italic"
        fontSize={["9.2rem", "12rem"]}
        fontWeight={600}
        lineHeight={["11.0rem", "14.4rem"]}
        zIndex={0}
        position="absolute"
        left={["-16%", "-16%"]}
        bottom={["8%", "-8%"]}
      >
        {rank}
      </Text>
      <GlassBox
        background="rgba(8, 43, 57, 0.12)"
        border={`1px solid ${colors.primaryLight}`}
        borderRadius={radii.s}
        style={{ backdropFilter: "blur(8px)" }}
      >
        <Grid
          p={[space.xxxs, space.xxs]}
          gridTemplateColumns="max-content 1fr"
          gridGap={space.xs}
        >
          <Link href={PageRoutes.creatorProfile(creator.slug)}>
            <Avatar
              size={[36, 56]}
              image={creator.profile_detail.photo ?? undefined}
            />
          </Link>
          <Grid
            gridAutoFlow="row"
            gridTemplateRows="1fr 1fr"
            gridGap={space.xxs}
          >
            <Text fontWeight={600} maxLines={2}>
              {creator.profile_detail.name}
            </Text>
            <Box>
              <LazyLoadButton
                label={creator.is_follower ? "Following" : "Follow"}
                icon={icon}
                onClick={followCreator}
                disabled={loading || creator.is_follower ? true : false}
              />
            </Box>
          </Grid>
        </Grid>
      </GlassBox>
    </Box>
  );
}
