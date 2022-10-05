import { Profile } from "next-auth";
import { useTheme } from "styled-components";

import { Box, Text } from "@/common/components/atoms";
import FormField from "@/common/components/objects/FormField";
import StreamCoverPhotoUpload from "@/creators/components/objects/StreamCoverPhotoUpload";

type Field = {
  value: string;
  error?: string;
  onChange: (val: unknown) => void;
};

type IProps = {
  topic: string;
  profile?: Profile;
  image: Field;
};

export default function ThumbnailForm({
  topic,
  profile,
  image,
}: IProps): JSX.Element {
  const { space } = useTheme();

  return (
    <Box>
      <Text textStyle="formLabel" fontWeight={400}>
        Choose a creative thumbnail for your viewers to see
      </Text>
      <FormField
        py={0}
        pt={28}
        gridAutoFlow="row"
        gridTemplateColumns="1fr"
        gridGap={space.xxxs}
        border={false}
        label="Stream Thumbnail"
        subtext="You can upload your own thumbnail or generate one here"
      >
        <StreamCoverPhotoUpload
          profile={profile}
          topic={topic}
          value={image.value}
          error={image.error}
          onChange={(value) => image.onChange(value)}
        />
      </FormField>
    </Box>
  );
}
