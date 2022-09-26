import { useTheme } from "styled-components";

import { Box, Flex, Span, Text } from "@/common/components/atoms";
import Page from "@/common/components/objects/Page";

import LandingAuthForm from "../../forms/LandingAuthForm";
import LandingPageLayout from "../../layouts/LandingPageLayout";

export default function LandingPage(): JSX.Element {
  const { space, colors, fonts } = useTheme();

  const pageHeading = (
    <Box py={[space.xxxxs, space.xxs]}>
      <Text
        fontFamily={fonts.heading}
        fontSize="2.4rem"
        fontWeight={500}
        lineHeight="3.6rem"
        textAlign={["center", "start"]}
      >
        Web 3.0 creators
      </Text>
      <Text
        fontFamily={fonts.heading}
        fontSize="2.4rem"
        fontWeight={500}
        lineHeight="3.6rem"
        textAlign={["center", "start"]}
      >
        streaming now
      </Text>
      <Text
        pt={space.xxxs}
        textStyle="captionLarge"
        color={colors.textTertiary}
        textAlign={["center", "start"]}
      >
        Watch live streams on Web 3.0, Crypto Trading, Blockchain and more no
        Crater today.{" "}
        <Span fontWeight={600} color="#EDEDED">
          120,000 learners
        </Span>{" "}
        have already joined!
      </Text>
    </Box>
  );

  return (
    <Page
      seo={{
        title: "Web 3.0 creators streaming now",
        description:
          "Watch live streams on Web 3.0, Crypto Trading, Blockchain and more no Crater today. 120,000 learners have already joined!",
      }}
    >
      <LandingPageLayout>
        <Flex
          px={[space.xs, 0]}
          flexDirection="column"
          alignSelf="center"
          maxWidth={["100%", 425]}
          gridGap={[space.xs, space.s]}
        >
          {pageHeading}
          <LandingAuthForm />
        </Flex>
      </LandingPageLayout>
    </Page>
  );
}
