import { PropsWithChildren } from "react";

import useAuth from "@/auth/context/AuthContext";
import { BoxProps } from "@/common/components/atoms";
import BaseLayout from "@/common/components/layouts/BaseLayout/v2";
import { AsideNav } from "@/common/components/objects/AsideNav/v2";
import Page from "@/common/components/objects/Page";
import { CreatorProvider } from "@/creators/context/CreatorContext";
import { FollowerProvider } from "@/creators/context/FollowerContext";
import { Creator } from "@/creators/types/creator";

type IProps = PropsWithChildren<{
  slug: string;
  creator: Creator;
  baseContainerProps?: BoxProps;
}>;

export default function CreatorPageLayout({
  slug,
  creator,
  children,
  baseContainerProps,
}: IProps): JSX.Element {
  const { user } = useAuth();
  return (
    <Page
      seo={{
        title: `${creator.profile_detail?.name ?? "Creator"} - Crater.Club`,
        description: creator.profile_detail?.introduction,
      }}
    >
      <CreatorProvider initial={creator} slug={slug}>
        <FollowerProvider creator={creator.id} user={user?.pk}>
          <BaseLayout
            aside={<AsideNav />}
            overflowY="auto"
            {...baseContainerProps}
          >
            {children}
          </BaseLayout>
        </FollowerProvider>
      </CreatorProvider>
    </Page>
  );
}
