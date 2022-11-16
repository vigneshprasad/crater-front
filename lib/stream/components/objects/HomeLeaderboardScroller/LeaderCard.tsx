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
  Flex,
} from "@/common/components/atoms";
import GlassBox from "@/common/components/atoms/GlassBox";
import { Button } from "@/common/components/atoms/v2";
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

  const background = useMemo(() => {
    if (rank === 1) {
      return `linear-gradient(65.32deg, #F1C961 19.69%, #FFDBB1 30.09%, #D08C1A 46.79%, #F1A618 72.25%)`;
    }

    if (rank === 2) {
      return `linear-gradient(65.32deg, #979BA2 19.69%, #F0F0F0 35.02%, #797A7A 46.79%, #9FB5BA 72.25%)`;
    }

    if (rank === 3) {
      return "linear-gradient(65.32deg, #CB8F7B 19.69%, #E8DBCC 31.18%, #8F6658 48.7%, #CC583F 72.25%, #B85742 72.25%)";
    }

    return "linear-gradient(65.32deg, #F1616A 19.69%, #9146FF 46.24%, #9DB3FF 72.25%, #0D849E 72.25%)";
  }, [rank]);

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
    <Flex
      position="relative"
      justifyContent={rank !== 10 ? "center" : "flex-end"}
    >
      <Text
        pl={space.xxxxs}
        textStyle="rank"
        zIndex={0}
        position="absolute"
        left={rank !== 10 ? -12 : -20}
        top={0}
        color={colors.primaryBackground}
        background={background}
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
            <Text fontWeight={600} color="#6AD361" maxLines={2}>
              {creator.profile_detail.name}
            </Text>
            <Box>
              {creator.is_follower ? (
                <Button
                  variant="primary-bg-flat"
                  label="Following"
                  disabled={true}
                  textProps={{
                    fontSize: "1.6rem",
                    fontWeight: [500, 600],
                    color: colors.textQuartenary,
                  }}
                />
              ) : (
                <LazyLoadButton
                  label="Follow"
                  icon={
                    loading ? (
                      <Spinner size={18} />
                    ) : (
                      <Icon icon="PlusSign" size={12} h={20} />
                    )
                  }
                  onClick={followCreator}
                  disabled={loading}
                />
              )}
            </Box>
          </Grid>
        </Grid>
      </GlassBox>
    </Flex>
  );
}
