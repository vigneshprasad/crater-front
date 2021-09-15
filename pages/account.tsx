import AccountTab from "@/auth/components/objects/AccountTab";
import HomePageLayout from "@/common/components/layouts/HomePageLayout";

export default function Account(): JSX.Element {
  return (
    <HomePageLayout heading="Account" seo={{ title: "Account" }}>
      <AccountTab />
    </HomePageLayout>
  );
}
