import { NextSeoProps } from "next-seo";
import { useTheme } from "styled-components";

import { BoxProps } from "@/common/components/atoms";
import BaseLayout from "@/common/components/layouts/BaseLayout";
import Page from "@/common/components/objects/Page";

interface Props {
  seo: NextSeoProps;
  children: React.ReactNode | React.ReactNode[];
  containerProps?: BoxProps;
}

export default function CheckoutPageLayout({
  seo,
  containerProps,
  children,
}: Props): JSX.Element {
  const { space } = useTheme();
  return (
    <Page seo={seo}>
      <BaseLayout
        m="0 auto"
        maxWidth={1280}
        overflowY="auto"
        pb={space.m}
        {...containerProps}
      >
        {children}
      </BaseLayout>
    </Page>
  );
}
