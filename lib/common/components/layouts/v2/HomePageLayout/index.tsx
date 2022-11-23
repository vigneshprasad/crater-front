import { Variants } from "framer-motion";
import { NextSeoProps } from "next-seo";
import { PropsWithChildren } from "react";
import styled, { useTheme } from "styled-components";

import { AnimatedBox, Box, Text } from "@/common/components/atoms";
import { AsideNav, INavKeys } from "@/common/components/objects/AsideNav/v2";
import GlobalSearch from "@/common/components/objects/GlobalSearch";
import Page from "@/common/components/objects/Page";
import useMediaQuery from "@/common/hooks/ui/useMediaQuery";

import BaseLayout from "../../BaseLayout/v2";

const StyledBaseLayout = styled(BaseLayout)`
  ::-webkit-scrollbar {
    width: 4px;
  }
`;

type IProps = PropsWithChildren<{
  seo: NextSeoProps;
  activeTab?: INavKeys;
  heading: string;
  subHeading?: string;
}>;

const variants: Variants = {
  hidden: { opacity: 0, x: 0, y: 10 },
  enter: { opacity: 1, x: 0, y: 0 },
  exit: { opacity: 0, x: 0, y: 10 },
};

export default function HomePageLayout({
  children,
  seo,
  activeTab,
  heading,
  subHeading,
}: IProps): JSX.Element | null {
  const { space, breakpoints } = useTheme();
  const { matches: isMobile } = useMediaQuery(`(max-width: ${breakpoints[0]})`);

  if (isMobile === undefined) return null;

  return (
    <Page seo={seo}>
      <StyledBaseLayout
        aside={<AsideNav activeTab={activeTab} />}
        overflowY="auto"
      >
        {isMobile && (
          <Box py={space.xxxs}>
            <GlobalSearch />
          </Box>
        )}

        <Box px={space.xs} pt={[space.xxxs, 32]} pb={space.xxs}>
          <Text textStyle="mainHeading" textAlign="center">
            {heading}
          </Text>
          {subHeading && (
            <Text
              textStyle={isMobile ? "caption" : "captionLarge"}
              textAlign="center"
            >
              {subHeading}
            </Text>
          )}
        </Box>

        <AnimatedBox
          initial="hidden"
          variants={variants}
          animate="enter"
          exit="exit"
          transition={{ type: "linear" }}
        >
          {children}
        </AnimatedBox>
      </StyledBaseLayout>
    </Page>
  );
}
