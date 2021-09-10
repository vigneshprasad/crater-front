import { useTheme } from "styled-components";

import AuthApiClient from "@/auth/api";
import { useProfile } from "@/auth/hooks";
import { Profile } from "@/auth/types/auth";
import { Box, Grid } from "@/common/components/atoms";
import ClubTabLayout from "@/creators/components/layouts/ClubTabLayout";

import BasicProfileForm, {
  IBasicProfileFormProps,
} from "../../forms/BasicProfileForm";
import PhotoUpload from "../PhotoUpload";

export default function AccountTab(): JSX.Element {
  const { profile, mutateProfile } = useProfile();
  const { space } = useTheme();

  const uploadProfilePicture = async (profilePic: File): Promise<void> => {
    const { data } = await AuthApiClient.postProfilePicture(profilePic);
    mutateProfile(data);
  };

  const uploadCoverPicture = async (coverFile: File): Promise<void> => {
    const { data: cover } = await AuthApiClient.postUserCoverFile(coverFile);
    const { data } = await AuthApiClient.postProfile({
      cover: cover.pk,
    });
    mutateProfile(data);
  };

  const postBasicProfileData = async (
    data: IBasicProfileFormProps
  ): Promise<void> => {
    try {
      const { data: profileResponse } = await AuthApiClient.postProfile({
        ...data,
        ...(data.tags && { tags: [data.tags] }),
      } as Partial<Profile>);
      mutateProfile(profileResponse);
    } catch (err) {
      console.log(err);
    }
  };

  if (!profile) return <Box>Loading...</Box>;

  return (
    <ClubTabLayout heading="Account">
      <Grid p={space.s} gridGap={space.s} maxWidth={1024}>
        <PhotoUpload
          onPostData={uploadProfilePicture}
          description="Must be JPEG, PNG, or GIF and cannot exceed 10MB."
          value={profile.photo}
          heading="Profile Picture"
          successText="Profile picture uploaded successfully."
        />
        <PhotoUpload
          onPostData={uploadCoverPicture}
          previewStyle={{ w: 360, h: 180, borderRadius: "none" }}
          description="File format: JPEG, PNG, GIF (recommended 1200x480, max 10MB)"
          value={profile.cover_file}
          heading="Cover Photo"
          successText="Cover photo uploaded successfully."
        />
        <BasicProfileForm data={profile} onSubmit={postBasicProfileData} />
      </Grid>
    </ClubTabLayout>
  );
}
