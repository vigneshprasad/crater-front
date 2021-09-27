import { Profile } from "next-auth";
import { useTheme } from "styled-components";

import { useRouter } from "next/router";

import AuthApiClient from "@/auth/api";
import useAuth from "@/auth/context/AuthContext";
import { Logout } from "@/auth/utils";
import { Box, Card, Grid } from "@/common/components/atoms";
import { Button } from "@/common/components/atoms/Button";
import { PageRoutes } from "@/common/constants/route.constants";
import colors from "@/common/theme/colors";

import BasicProfileForm, {
  IBasicProfileFormProps,
} from "../../forms/BasicProfileForm";
import PhotoUpload from "../PhotoUpload";

export default function AccountTab(): JSX.Element {
  const router = useRouter();
  const { profile, mutateProfile } = useAuth();
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
      // eslint-disable-next-line no-console
      console.log(err);
    }
  };

  const postSignout = async (): Promise<void> => {
    await Logout();
    router.push(PageRoutes.home);
  };

  if (!profile) return <Box>Loading...</Box>;

  return (
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

      <Card>
        <Button
          borderColor={colors.red}
          bg={colors.red}
          text="Signout"
          onClick={postSignout}
        />
      </Card>
    </Grid>
  );
}
