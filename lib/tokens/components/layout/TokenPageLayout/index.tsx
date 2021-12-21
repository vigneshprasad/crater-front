import { NextSeoProps } from "next-seo";
import { PropsWithChildren, useMemo } from "react";
import { useTheme } from "styled-components";

import { useRouter } from "next/router";

import { Link, Box } from "@/common/components/atoms";
import BaseLayout from "@/common/components/layouts/BaseLayout";
import AsideNav from "@/common/components/objects/AsideNav";
import {
  BaseTabBar,
  BaseTabItem,
} from "@/common/components/objects/BaseTabBar";
import Page from "@/common/components/objects/Page";
import { PageRoutes } from "@/common/constants/route.constants";

type IProps = PropsWithChildren<{
  seo: NextSeoProps;
  activeTab?: "tokens" | "rewards";
}>;

export default function TokenPageLayout({
  seo,
  activeTab,
  children,
}: IProps): JSX.Element {
  const { space } = useTheme();
  const router = useRouter();

  const activeSlide = useMemo(() => {
    if (activeTab) {
      return activeTab;
    }
    if (router.pathname) {
      return router.pathname.substring(1);
    }
  }, [router, activeTab]);

  return (
    <Page seo={seo}>
      <BaseLayout
        pb={space.xl}
        overflowY="auto"
        aside={<AsideNav activeTab="tokens" />}
      >
        <BaseTabBar
          mt={[space.xxxs, space.xxs]}
          px={[space.xxs, space.s]}
          activeTab={activeSlide}
          tabs={{
            tokens: (
              <Link href={PageRoutes.tokens()} shallow>
                <BaseTabItem textStyle="headline5" label="Tokens" />
              </Link>
            ),
            rewards: (
              <Link href={PageRoutes.rewards} shallow>
                <BaseTabItem textStyle="headline5" label="Rewards" />
              </Link>
            ),
          }}
        />
        <Box>{children}</Box>
      </BaseLayout>
    </Page>
  );
}
