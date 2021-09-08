import { PropsWithChildren } from "react";

import BaseLayout from "@/common/components/layouts/BaseLayout";

export default function AccountTabLayout({
  children,
}: PropsWithChildren<unknown>): JSX.Element {
  return <BaseLayout>{children}</BaseLayout>;
}
