import { useState } from "react";

import { useProfile } from "@/auth/hooks";
import { Profile } from "@/auth/types/auth";
import { Box, Modal } from "@/common/components/atoms";

import ProfileForm from "../../forms/ProfileForm";
import AccountTabLayout from "../../layouts/AccountTabLayout";

const AccountTab: React.FC = () => {
  const { profile } = useProfile();

  const handleFormSubmit = (data: Partial<Profile>) => {
    console.log(data);
  };

  if (!profile) return <Box>Loading...</Box>;

  return (
    <AccountTabLayout>
      <ProfileForm profile={profile} onSubmit={handleFormSubmit} />
    </AccountTabLayout>
  );
};

export default AccountTab;
