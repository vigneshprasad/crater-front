import { Variants } from "framer-motion";
import { NextSeoProps } from "next-seo";
import { PropsWithChildren } from "react";
import { useTheme } from "styled-components";

import { AnimatedBox, Box, Text } from "@/common/components/atoms";
import { AsideNav, INavKeys } from "@/common/components/objects/AsideNav/v2";
import Page from "@/common/components/objects/Page";

import BaseLayout from "../../BaseLayout/v2";

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
  const { space } = useTheme();

  return (
    <Page seo={seo}>
      <BaseLayout aside={<AsideNav activeTab={activeTab} />} overflowY="auto">
        <Box px={space.xs} pt={32} pb={space.xxs}>
          <Text textStyle="mainHeading" maxLines={2} textAlign="center">
            {heading}
          </Text>
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
