import { PropsWithChildren } from "react";

import BaseLayout from "@/common/components/layouts/BaseLayout";

export default function CreatorPageLayout({
  children,
}: PropsWithChildren<unknown>): JSX.Element {
  return <BaseLayout>{children}</BaseLayout>;
}
