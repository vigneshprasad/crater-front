import { useTheme } from "styled-components";

import { Box, Text, Grid } from "@/common/components/atoms";
import { useCreator } from "@/creators/context/CreatorContext";

export default function AboutTab(): JSX.Element {
  const { creator } = useCreator();
  const { space } = useTheme();
  if (!creator) return <Box>Loading...</Box>;
  return (
    <Box px={[space.xs, space.m]} py={[space.xs, space.s]}>
      <Text mb={space.xs} textStyle="headline6">
        About Me
      </Text>
      <Text mb={space.m}>{creator.profile_detail?.introduction}</Text>
      <Text mb={space.xs} textStyle="headline6">
        Snapshot
      </Text>
      {creator.profile_detail.tag_list && (
        <Grid gridAutoFlow="column" gridTemplateColumns="0.3fr 1fr">
          <Text mb={space.xxxs}>Profession</Text>
          <Text mb={space.xxxs}>
            {creator.profile_detail?.tag_list?.[0]?.name}
          </Text>
        </Grid>
      )}
      {creator.profile_detail.sector_detail && (
        <Grid gridAutoFlow="column" gridTemplateColumns="0.3fr 1fr">
          <Text mb={space.xxxs}>Sector</Text>
          <Text mb={space.xxxs}>
            {creator.profile_detail?.sector_detail?.value}
          </Text>
        </Grid>
      )}
      {creator.profile_detail.company_type_detail && (
        <Grid gridAutoFlow="column" gridTemplateColumns="0.3fr 1fr">
          <Text mb={space.xxxs}>Working With</Text>
          <Text mb={space.xxxs}>
            {creator.profile_detail?.company_type_detail?.value}
          </Text>
        </Grid>
      )}
      {creator.profile_detail.years_of_experience_detail && (
        <Grid gridAutoFlow="column" gridTemplateColumns="0.3fr 1fr">
          <Text mb={space.xxxs}>Years of Experience</Text>
          <Text mb={space.xxxs}>
            {creator.profile_detail?.years_of_experience_detail?.value}
          </Text>
        </Grid>
      )}
      {creator.profile_detail.education_level_detail && (
        <Grid gridAutoFlow="column" gridTemplateColumns="0.3fr 1fr">
          <Text mb={space.xxxs}>Education Level</Text>
          <Text mb={space.xxxs}>
            {creator.profile_detail?.education_level_detail?.value}
          </Text>
        </Grid>
      )}
    </Box>
  );
}
