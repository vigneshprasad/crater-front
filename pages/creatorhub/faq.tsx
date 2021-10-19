import CreatorHubFaqTab from "@/creators/components/objects/CreatorHubFaqTab";
import CreatorHubPage from "@/creators/components/page/CreatorHubPage";

export default function CreatorHubFaq(): JSX.Element {
  return (
    <CreatorHubPage selectedTab="faq">
      <CreatorHubFaqTab />
    </CreatorHubPage>
  );
}
