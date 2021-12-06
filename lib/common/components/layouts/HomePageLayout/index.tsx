import { Variants } from "framer-motion";
import { NextSeoProps } from "next-seo";
import { PropsWithChildren } from "react";
import { useTheme } from "styled-components";

import { INavKeys } from "@/common/constants/ui.constants";

import { Box, AnimatedBox } from "../../atoms";
import AsideNav from "../../objects/AsideNav";
import Page from "../../objects/Page";
import TabHeading from "../../objects/TabHeading";
import BaseLayout from "../BaseLayout";

type IProps = PropsWithChildren<{
  seo: NextSeoProps;
  activeTab?: INavKeys;
  heading: string;
}>;

const variants: Variants = {
  hidden: { opacity: 0, x: 0, y: 10 },
  enter: { opacity: 1, x: 0, y: 0 },
  exit: { opacity: 0, x: 0, y: 10 },
};

export default function HomePageLayout({
  heading,
  children,
  seo,
  activeTab,
}: IProps): JSX.Element {
  const { space } = useTheme();
  return (
    <Page seo={seo}>
      <BaseLayout
        pb={space.xl}
        aside={<AsideNav activeTab={activeTab} />}
        overflowY="auto"
      >
        <Box p={[space.xs, space.s]}>
          <TabHeading>{heading}</TabHeading>
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
