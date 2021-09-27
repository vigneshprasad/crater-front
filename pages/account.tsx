import { NextSeoProps } from "next-seo";

import AccountTab from "@/auth/components/objects/AccountTab";
import HomePageLayout from "@/common/components/layouts/HomePageLayout";

export default function Account(): JSX.Element {
  const seo: NextSeoProps = {
    title: "Crater Club: Account",
    description:
      "Crater is where you join live streams with the mentors & creators you follow, get to network with like-minds, and can claim exclusive access to mentors & creator by buying their tokens at the live auction",
  };
  return (
    <HomePageLayout seo={seo} heading="Account">
      <AccountTab />
    </HomePageLayout>
  );
}
