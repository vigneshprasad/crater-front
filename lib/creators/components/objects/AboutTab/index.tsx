import { useTheme } from "styled-components";

import { Box, Text, Grid, Icon, Link } from "@/common/components/atoms";
import { useCreator } from "@/creators/context/CreatorContext";

export default function AboutTab(): JSX.Element {
  const { creator } = useCreator();
  const { space, colors } = useTheme();
  if (!creator) return <Box>Loading...</Box>;
  return (
    <Grid
      px={[space.xs, space.m]}
      py={[space.xs, space.s]}
      gridTemplateColumns={["1fr", "2fr 1fr"]}
      gridGap={space.s}
    >
      <Box>
        <Text mb={space.xs} textStyle="title">
          About Me
        </Text>
        <Text mb={space.xs}>{creator.profile_detail?.introduction}</Text>
      </Box>

      <Box>
        <Text mb={space.xs} textStyle="title">
          Social Links
        </Text>

        <Grid
          gridGap={space.xxs}
          gridAutoFlow="column"
          gridAutoColumns="min-content"
        >
          {creator.profile_detail.linkedin_url && (
            <Link
              href={creator.profile_detail.linkedin_url}
              boxProps={{ target: "_blank" }}
            >
              <Icon icon="Linkedin" color={colors.linkedin} fill />
            </Link>
          )}

          {creator.profile_detail.instagram && (
            <Link
              href={creator.profile_detail.instagram}
              boxProps={{ target: "_blank" }}
            >
              <Icon icon="InstagramColor" />
            </Link>
          )}

          {creator.profile_detail.twitter && (
            <Link
              href={creator.profile_detail.twitter}
              boxProps={{ target: "_blank" }}
            >
              <Icon icon="Twitter" color={colors.twitter} fill />
            </Link>
          )}
        </Grid>
      </Box>
    </Grid>
  );
}
