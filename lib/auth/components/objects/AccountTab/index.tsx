import { useProfile } from "@/auth/hooks";
import { Profile } from "@/auth/types/auth";
import { Box } from "@/common/components/atoms";

import ProfileForm from "../../forms/ProfileForm";
import AccountTabLayout from "../../layouts/AccountTabLayout";

export default function AccountTab(): JSX.Element {
  const { profile } = useProfile();

  const handleFormSubmit = (data: Partial<Profile>): void => {
    console.log(data);
  };

  if (!profile) return <Box>Loading...</Box>;

  return (
    <AccountTabLayout>
      <ProfileForm profile={profile} onSubmit={handleFormSubmit} />
    </AccountTabLayout>
  );
}
