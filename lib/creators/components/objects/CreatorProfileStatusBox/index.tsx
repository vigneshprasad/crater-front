import { useMemo } from "react";
import { useTheme } from "styled-components";

import { useRouter } from "next/router";

import useAuth from "@/auth/context/AuthContext";
import {
  Box,
  Flex,
  Grid,
  Icon,
  Link,
  Shimmer,
  Span,
  Text,
} from "@/common/components/atoms";
import { Button } from "@/common/components/atoms/v2";
import CircularProgressBar from "@/common/components/objects/CircularProgressBar";
import ProgressBar from "@/common/components/objects/ProgressBar";
import { PageRoutes } from "@/common/constants/route.constants";
import { PastStreamListItem } from "@/community/types/community";
import { Creator } from "@/creators/types/creator";

type IProps = {
  creator: Creator | null;
  profileCompletedPercent: number;
  pastStreams?: PastStreamListItem[];
};

export default function CreatorProfileStatusBox({
  creator,
  profileCompletedPercent,
  pastStreams,
}: IProps): JSX.Element {
  const { space, colors, radii, fonts } = useTheme();
  const { profile } = useAuth();
  const router = useRouter();

  const FIELDS_TO_SHOW = {
    name: {
      title: "Add a name",
      text: "Your viewers will identify you with this name on Crater",
    },
    photo: {
      title: "Add a profile picture",
      text: "Your viewers can recognize you with a profile picture",
    },
    introduction: {
      title: "Add a brief description",
      text: "Let your viewers more about you and your field of expertise",
    },
    primary_url: {
      title: "Add a LinkTree url",
      text: "A one-stop place for your viewers to get access to all your content",
    },
    linkedin_url: {
      title: "Add LinkedIn handle",
      text: "Your viewers can follow or reach out to you on other social media platforms",
    },
    twitter: {
      title: "Add Twitter handle",
      text: "Your viewers can follow or reach out to you on other social media platforms",
    },
    cover: {
      title: "Add a banner",
      text: "You can customise how your channel is visible to your viewers",
    },
    instagram: {
      title: "Add Instagram handle",
      text: "Your viewers can follow or reach out to you on other social media platforms",
    },
    metamask_id: {
      title: "Add Metamask Id",
      text: "You can get your LEARN tokens to your metamask wallet",
    },
  };

  const pastStreamsLength = useMemo<number>(() => {
    if (pastStreams) {
      return pastStreams.length < 3 ? pastStreams.length : 3;
    }

    return 0;
  }, [pastStreams]);

  const progressBar = (
    <Box>
      <ProgressBar
        percent={profileCompletedPercent}
        bg="#373737"
        barProps={{
          background:
            "linear-gradient(0deg, #D5BBFF 17.58%, #9DB3FF 85.38%, #0D849E 85.38%)",
        }}
      />
      <Text
        pt={space.xxxxs}
        fontFamily={fonts.heading}
        fontSize="2rem"
        fontWeight={500}
        lineHeight="2.8rem"
        textAlign="center"
      >
        {profileCompletedPercent}%
      </Text>
      <Text
        textStyle="small"
        fontWeight={600}
        textAlign="center"
        textTransform="uppercase"
      >
        Complete
      </Text>
    </Box>
  );

  if (!profile || !pastStreams) {
    return (
      <Shimmer w="100%" h={182} mb={space.xxs} borderRadius={radii.xxxxs} />
    );
  }

  return (
    <Box
      px={32}
      py={space.xs}
      mb={space.xxs}
      bg={colors.primaryDark}
      borderRadius={radii.xxxxs}
    >
      <Grid gridTemplateColumns="repeat(4, auto)" gridGap={24}>
        <Box
          pt={18}
          pb={24}
          px={space.xs}
          w={200}
          bg={colors.primaryLight}
          borderRadius={radii.xxxxs}
        >
          <Text pb={space.xxs} textStyle="menu" textAlign="center">
            Profile Completion
          </Text>
          {progressBar}
        </Box>

        <Box
          p={space.xxs}
          w={258}
          bg={colors.primaryLight}
          borderRadius={radii.xxxxs}
        >
          {(() => {
            if (profile) {
              for (const fieldName in FIELDS_TO_SHOW) {
                if (!profile[fieldName]) {
                  const field =
                    FIELDS_TO_SHOW[fieldName as keyof typeof FIELDS_TO_SHOW];

                  return (
                    <>
                      <Text pb={space.xxxxs} textStyle="menu">
                        {field["title"]}
                      </Text>
                      <Text
                        pb={space.xxxs}
                        textStyle="small"
                        color={colors.textTertiary}
                      >
                        {field["text"]}
                      </Text>
                    </>
                  );
                }
              }

              return (
                <>
                  <Text pb={space.xxxxs} textStyle="menu">
                    Update your profile
                  </Text>
                  <Text
                    pb={space.xxxs}
                    textStyle="small"
                    color={colors.textTertiary}
                  >
                    Let your audience know more about you!
                  </Text>
                </>
              );
            }
          })()}
          <Button
            label="Edit Profile"
            h={40}
            w="100%"
            display="flex"
            justifyContent="center"
            alignItems="center"
            gridGap={6}
            prefixElement={<Icon icon="Edit" size={16} />}
            textProps={{
              fontSize: "1.4rem",
            }}
            onClick={() => router.push(PageRoutes.account)}
          />
        </Box>

        <Box
          p={space.xxs}
          w={258}
          bg={colors.primaryLight}
          borderRadius={radii.xxxxs}
        >
          <Text pb={space.xxxxs} textStyle="menu">
            Your Channel
          </Text>
          <Text pb={space.xxxs} textStyle="small" color={colors.textTertiary}>
            Check out how your channel is visible to your audience
          </Text>
          {creator?.slug && (
            <Link
              href={PageRoutes.creatorProfile(creator.slug)}
              boxProps={{ target: "_blank" }}
            >
              <Button
                label="Go to your channel"
                h={40}
                w="100%"
                display="flex"
                justifyContent="center"
                alignItems="center"
                gridGap={6}
                suffixElement={<Icon size={16} icon="PopOut" />}
                textProps={{
                  fontSize: "1.4rem",
                }}
              />
            </Link>
          )}
        </Box>

        <Flex w={184} flexDirection="column" justifyContent="space-between">
          <CircularProgressBar
            m="0 auto"
            size={72}
            strokeWidth={5}
            percentage={33 * pastStreamsLength}
            backgroundColor={colors.primaryLight}
            strokeColor="#02C7AC"
            text={`${pastStreamsLength}`}
          />
          <Text
            textStyle="small"
            textAlign="center"
            color={colors.textTertiary}
            fontWeight={500}
            maxLines={3}
          >
            Complete a total of 3 streams to become eligible for the{" "}
            <Span color={colors.accentLight}>Crater LEARN program</Span>.
          </Text>
        </Flex>
      </Grid>
    </Box>
  );
}
