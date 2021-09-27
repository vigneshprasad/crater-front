import { PropsWithChildren } from "react";
import { useTheme } from "styled-components";

import { BoxProps } from "@/common/components/atoms";
import BaseLayout from "@/common/components/layouts/BaseLayout";
import Page from "@/common/components/objects/Page";
import { CreatorProvider } from "@/creators/context/CreatorContext";
import { Creator } from "@/creators/types/creator";

type IProps = PropsWithChildren<{
  id: string;
  creator: Creator;
  baseContainerProps?: BoxProps;
}>;

export default function CreatorPageLayout({
  id,
  creator,
  children,
  baseContainerProps,
}: IProps): JSX.Element {
  const { space } = useTheme();
  return (
    <Page
      seo={{
        title: `${creator.profile_detail?.name ?? "Creator"} - Crater.Club`,
        description: creator.profile_detail?.introduction,
      }}
    >
      <CreatorProvider initial={creator} id={id}>
        <BaseLayout overflowY="auto" pb={space.l} {...baseContainerProps}>
          {children}
        </BaseLayout>
      </CreatorProvider>
    </Page>
  );
}
