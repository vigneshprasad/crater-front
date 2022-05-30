import { Variants } from "framer-motion";
import { NextSeoProps } from "next-seo";
import { PropsWithChildren } from "react";
import { useTheme } from "styled-components";

import { AnimatedBox, Box, Text } from "@/common/components/atoms";
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

export default function HomePageLayout({
  children,
  seo,
  activeTab,
  heading,
  subHeading,
}: IProps): JSX.Element {
  const { space, fonts } = useTheme();

  return (
    <Page seo={seo}>
      <BaseLayout aside={<AsideNav activeTab={activeTab} />} overflowY="auto">
        <Box px={space.xs} py={32}>
          <Text
            fontFamily={fonts.heading}
            textStyle="mainHeading"
            maxLines={2}
            textAlign="center"
          >
            {heading}
          </Text>
          {subHeading && (
            <Text
              fontFamily={fonts.heading}
              textStyle="body"
              textAlign="center"
              maxLines={2}
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
      </BaseLayout>
    </Page>
  );
}
