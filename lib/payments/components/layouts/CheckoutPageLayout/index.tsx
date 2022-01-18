import { NextSeoProps } from "next-seo";

import { Box, BoxProps } from "@/common/components/atoms";
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
  return (
    <Page seo={seo}>
      <BaseLayout>
        <Box m="0 auto" maxWidth={1280} overflowY="auto" {...containerProps}>
          {children}
        </Box>
      </BaseLayout>
    </Page>
  );
}
