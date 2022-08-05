import { useTheme } from "styled-components";

import { useRouter } from "next/router";

import {
  Avatar,
  Box,
  Flex,
  Grid,
  Icon,
  Link,
  Shimmer,
  Text,
} from "@/common/components/atoms";
import { Button } from "@/common/components/atoms/v2";
import { PageRoutes } from "@/common/constants/route.constants";
import { Creator, CreatorStats } from "@/creators/types/creator";

type IProps = {
  creator: Creator | null;
  creatorStats?: CreatorStats[];
  pastStream?: boolean;
  showButton?: boolean;
};

export default function CreatorStatsBox({
  creator,
  creatorStats,
  pastStream = false,
  showButton = true,
}: IProps): JSX.Element {
  const { space, colors, radii } = useTheme();
  const router = useRouter();

  return (
    <Box>
      {!creatorStats ? (
        <Shimmer w="100%" h={500} borderRadius={radii.xxxxs} />
      ) : (
        <Grid gridAutoFlow="row" gridGap={space.xxs} alignItems="center">
          <Avatar
            size={96}
            image={creator?.profile_detail.photo}
            justifySelf="center"
          />
          <Text textStyle="menu" justifySelf="center">
            {creator?.profile_detail.name}
          </Text>
          <Box mt={space.xxs} borderTop={`1px solid ${colors.primaryLight}`}>
            {creatorStats.map((stat, index) => {
              return pastStream
                ? stat.name !== "Upcoming Streams" && (
                    <Flex
                      m={`${space.xxs}px 0px`}
                      flexDirection="row"
                      justifyContent="space-between"
                      alignItems="center"
                      borderBottom={`1px solid ${colors.primaryLight}`}
                      key={index}
                    >
                      <Text textStyle="body" color={colors.textQuartenary}>
                        {stat.name}
                      </Text>
                      <Text textStyle="body">{stat.value}</Text>
                    </Flex>
                  )
                : stat.name !== "Past Streams" && (
                    <Flex
                      m={`${space.xxs}px 0px`}
                      pb={space.xxs}
                      flexDirection="row"
                      justifyContent="space-between"
                      alignItems="center"
                      borderBottom={`1px solid ${colors.primaryLight}`}
                      key={index}
                    >
                      <Text textStyle="body" color={colors.textQuartenary}>
                        {stat.name}
                      </Text>
                      <Text textStyle="body">{stat.value}</Text>
                    </Flex>
                  );
            })}
          </Box>
          {creator?.slug && (
            <Link
              href={PageRoutes.creatorProfile(creator.slug)}
              boxProps={{ target: "_blank", justifySelf: "center" }}
            >
              <Button
                variant="text"
                label="Go to your channel"
                suffixElement={
                  <Icon icon="PopOut" size={18} color={colors.accentLight} />
                }
                textProps={{
                  fontSize: "1.4rem",
                }}
              />
            </Link>
          )}
          {showButton && (
            <Button
              mt={space.xs}
              justifySelf="center"
              label="Create New Stream"
              w={200}
              minHeight={40}
              display="flex"
              alignItems="center"
              justifyContent="center"
              prefixElement={<Icon icon="CameraLive" size={18} />}
              onClick={() => router.push(PageRoutes.hub("streams", "create"))}
            />
          )}
        </Grid>
      )}
    </Box>
  );
}
