import { NextSeoProps } from "next-seo";
import { PropsWithChildren } from "react";

import BaseLayout from "@/common/components/layouts/BaseLayout";
import AsideNav from "@/common/components/objects/AsideNav";
import Page from "@/common/components/objects/Page";

type IProps = PropsWithChildren<{
  seo: NextSeoProps;
}>;

export default function RewardPageLayout({
  seo,
  children,
}: IProps): JSX.Element {
  return (
    <Page seo={seo}>
      <BaseLayout overflowY="auto" aside={<AsideNav />}>
        {children}
      </BaseLayout>
    </Page>
  );
}
