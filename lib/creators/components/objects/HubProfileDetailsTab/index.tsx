import { Profile } from "next-auth";
import { useTheme } from "styled-components";

import { useRouter } from "next/router";

import AuthApiClient from "@/auth/api";
import UserApiClient from "@/auth/api/UserApiClient";
import useAuth from "@/auth/context/AuthContext";
import { Login } from "@/auth/utils";
import {
  Box,
  Flex,
  Icon,
  Link,
  Shimmer,
  Text,
} from "@/common/components/atoms";
import { Button } from "@/common/components/atoms/v2";
import { PageRoutes } from "@/common/constants/route.constants";
import colors from "@/common/theme/colors";
import { Creator } from "@/creators/types/creator";

import CreatorProfileForm, {
  ICreatorProfileFormProps,
} from "../../forms/CreatorProfileForm";

type IProps = {
  creator: Creator | null;
};

export default function HubProfileDetailsTab({ creator }: IProps): JSX.Element {
  const router = useRouter();
  const { space, radii } = useTheme();
  const { profile, mutateProfile } = useAuth();

  const uploadProfilePicture = async (profilePic?: File): Promise<void> => {
    const { data } = await AuthApiClient.postProfilePicture(profilePic);
    mutateProfile(data);
  };

  const uploadCoverPicture = async (coverFile?: File): Promise<void> => {
    if (!coverFile) {
      const { data } = await AuthApiClient.deleteCoverPicture();
      mutateProfile(data);
    } else {
      const { data: cover } = await AuthApiClient.postUserCoverFile(coverFile);
      const { data } = await AuthApiClient.postProfile({
        cover: cover.pk,
      });
      mutateProfile(data);
    }
  };

  const updateSessionToken = async (email: string): Promise<void> => {
    const [userWithToken] = await UserApiClient().postUser({
      email,
    });

    if (userWithToken) {
      await Login("user-update", {
        user: JSON.stringify(userWithToken.user),
        token: userWithToken.token,
      });

      router.reload();
    }
  };

  const postProfileData = async (
    data: ICreatorProfileFormProps
  ): Promise<void> => {
    try {
      const { email, ...profileData } = data;
      const { data: profileResponse } = await AuthApiClient.postProfile({
        ...profileData,
      } as Partial<Profile>);

      // Update session token
      await updateSessionToken(email);

      mutateProfile(profileResponse);
    } catch (err) {
      // eslint-disable-next-line no-console
      console.log(err);
    }
  };

  return (
    <Box pt={space.xxs} overflow="auto" minWidth={1000}>
      <Flex
        pb={space.xxs}
        flexDirection="row"
        justifyContent="space-between"
        alignItems="center"
      >
        <Text textStyle="headline5" fontWeight={600}>
          Profile Details
        </Text>

        {creator?.slug && (
          <Link
            href={PageRoutes.creatorProfile(creator.slug)}
            boxProps={{ target: "_blank" }}
          >
            <Button
              label="Go to your channel"
              h={40}
              w="100%"
              display="flex"
              justifyContent="center"
              alignItems="center"
              gridGap={6}
              suffixElement={<Icon size={16} icon="PopOut" />}
              textProps={{
                fontSize: "1.4rem",
              }}
            />
          </Link>
        )}
      </Flex>

      <Box
        bg={colors.primaryDark}
        borderRadius={radii.xxxxs}
        border={`1px solid ${colors.secondaryLight}`}
      >
        {!profile ? (
          <Shimmer h={600} />
        ) : (
          <CreatorProfileForm
            profile={profile}
            uploadProfilePicture={uploadProfilePicture}
            uploadCoverPicture={uploadCoverPicture}
            onSubmit={postProfileData}
          />
        )}
      </Box>
    </Box>
  );
}
