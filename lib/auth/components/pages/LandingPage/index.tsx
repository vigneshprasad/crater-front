import { useTheme } from "styled-components";

import Image from "next/image";

import { Box, Flex, Span, Text } from "@/common/components/atoms";
import Page from "@/common/components/objects/Page";
import useMediaQuery from "@/common/hooks/ui/useMediaQuery";

import LandingAuthForm from "../../forms/LandingAuthForm";
import LandingPageLayout from "../../layouts/LandingPageLayout";

export default function LandingPage(): JSX.Element | null {
  const { space, colors, fonts, breakpoints } = useTheme();

  const { matches: isMobile } = useMediaQuery(`(max-width: ${breakpoints[0]})`);

  const pageHeading = (
    <Box py={[space.xxxxs, space.xxs]}>
      <Text
        fontFamily={fonts.heading}
        fontSize={["2.0rem", "2.4rem"]}
        fontWeight={500}
        lineHeight={["3.0rem", "3.6rem"]}
        textAlign={["center", "start"]}
      >
        Web 3.0 creators
      </Text>
      <Text
        fontFamily={fonts.heading}
        fontSize={["2.0rem", "2.4rem"]}
        fontWeight={500}
        lineHeight={["3.0rem", "3.6rem"]}
        textAlign={["center", "start"]}
      >
        streaming now
      </Text>
      <Text
        pt={space.xxxs}
        textStyle={isMobile ? "caption" : "captionLarge"}
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

  if (isMobile === undefined) return null;

  return (
    <Page
      seo={{
        title: "Web 3.0 creators streaming now",
        description:
          "Watch live streams on Web 3.0, Crypto Trading, Blockchain and more no Crater today. 120,000 learners have already joined!",
        openGraph: {
          title: "Web 3.0 creators streaming now",
          description:
            "Watch live streams on Web 3.0, Crypto Trading, Blockchain and more no Crater today. 120,000 learners have already joined!",
          images: [
            {
              url: "/public/images/img_landing_page.png",
              width: 1600,
              height: 900,
              alt: "Join web 3.0",
            },
          ],
        },
      }}
    >
      <LandingPageLayout>
        <Flex
          px={[space.xs, 0]}
          flexDirection="column"
          alignSelf={["start", "center"]}
          maxWidth={["100%", 425]}
          gridGap={[space.xs, space.s]}
        >
          {pageHeading}
          <LandingAuthForm />

          <Box mt={space.s} position="relative">
            <Text
              textStyle={isMobile ? "caption" : "captionLarge"}
              fontWeight={400}
              color={colors.textQuartenary}
            >
              Building live streaming awesomeness backed by
            </Text>
            <Flex
              gridGap={space.xxxxs}
              alignItems="center"
              position={["relative", "absolute"]}
              right={[20, 0]}
              top={0}
            >
              <Box w={[108, 134]} h={[108, 134]} position="relative">
                <Image src="/images/img_tcvf.png" alt="TCVF" layout="fill" />
              </Box>
              <Box w={[78, 82]} h={[78, 82]} position="relative">
                <Image src="/images/img_nueva.png" alt="Nueva" layout="fill" />
              </Box>
              <Box w={[68, 80]} h={[68, 80]} position="relative">
                <Image
                  src="/images/img_lumikai.png"
                  alt="Lumikai"
                  layout="fill"
                />
              </Box>
              <Box w={[58, 74]} h={[58, 74]} position="relative">
                <Image src="/images/img_cisco.png" alt="Cisco" layout="fill" />
              </Box>
              <Box w={[54, 56]} h={[54, 56]} position="relative">
                <Image
                  src="/images/img_unichem.png"
                  alt="Unichem"
                  layout="fill"
                />
              </Box>
            </Flex>
          </Box>
        </Flex>
      </LandingPageLayout>
    </Page>
  );
}
