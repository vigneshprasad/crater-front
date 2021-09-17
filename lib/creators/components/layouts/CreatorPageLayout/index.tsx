import { PropsWithChildren } from "react";
import { useTheme } from "styled-components";

import BaseLayout from "@/common/components/layouts/BaseLayout";
import Page from "@/common/components/objects/Page";
import { CreatorProvider } from "@/creators/context/CreatorContext";
import { Creator } from "@/creators/types/creator";

type IProps = PropsWithChildren<{
  id: string;
  creator: Creator;
}>;

export default function CreatorPageLayout({
  id,
  creator,
  children,
}: IProps): JSX.Element {
  const { space } = useTheme();
  return (
    <Page
      seo={{
        title: `${creator.name ?? "Creator"} - Crater.Club`,
        description: creator.about,
      }}
    >
      <CreatorProvider initial={creator} id={id}>
        <BaseLayout overflowY="auto" pb={space.l}>
          {children}
        </BaseLayout>
      </CreatorProvider>
    </Page>
  );
}
