import { Variants } from "framer-motion";
import { NextSeoProps } from "next-seo";
import { PropsWithChildren } from "react";
import styled, { useTheme } from "styled-components";

import { AnimatedBox, Box, Text, TextProps } from "@/common/components/atoms";
import AsideNav from "@/common/components/objects/AsideNav";
import Page from "@/common/components/objects/Page";
import { INavKeys } from "@/common/constants/ui.constants";

import BaseLayout from "../../BaseLayout";

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

const StyledHeading = styled(Text)<TextProps>`
  text-align: center;
  background: linear-gradient(
    90.47deg,
    #d5bbff 17.58%,
    #9db3ff 60.39%,
    #0d849e 85.38%
  );
  text-shadow: 0px 0px 28px rgba(136, 46, 232, 0.8);
  background-clip: text;
  text-fill-color: transparent;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
`;

export default function HomePageLayout({
  children,
  seo,
  activeTab,
  heading,
  subHeading,
}: IProps): JSX.Element {
  const { space } = useTheme();

  return (
    <Page seo={seo}>
      <BaseLayout aside={<AsideNav activeTab={activeTab} />} overflowY="auto">
        <Box px={space.xs} py={32}>
          <StyledHeading textStyle="headline5" maxLines={2}>
            {heading}
          </StyledHeading>
          {subHeading && (
            <Text textStyle="body" textAlign="center" maxLines={2}>
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
      </BaseLayout>
    </Page>
  );
}
