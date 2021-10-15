import { Text } from "@/common/components/atoms";
import CreatorHubFaqTab from "@/creators/components/objects/CreatorHubFaqTab";
import CreatorHubPage from "@/creators/components/page/CreatorHubPage";

export default function CreatorHubFaq() {
  return (
    <CreatorHubPage selectedTab="faq">
      <CreatorHubFaqTab />
    </CreatorHubPage>
  );
}
