import { useMemo } from "react";
import { useTheme } from "styled-components";

import Image from "next/image";

import { BackgroundVideo, Box, BoxProps } from "@/common/components/atoms";
import { Reward } from "@/tokens/types/token";

type IProps = BoxProps & {
  reward: Reward;
};

export default function RewardImagePreview({
  reward,
  ...rest
}: IProps): JSX.Element {
  const { colors } = useTheme();

  const preview = useMemo(() => {
    if (!reward || !reward.photo || !reward.photo_mime_type) {
      return <Box w="100" pt="100%" bg={colors.accent} />;
    }

    const type = reward.photo_mime_type.split("/")[0];

    if (type === "image") {
      return (
        <Box position="relative" w="100%" pt="100%">
          <Image
            src={reward.photo}
            layout="fill"
            objectFit="cover"
            alt={reward.name}
          />
        </Box>
      );
    }

    if (type === "video") {
      return <BackgroundVideo w="100%" src={reward.photo} />;
    }

    return (
      <Box position="relative" w="100%" pt="100%">
        <Image
          src={reward.photo}
          layout="fill"
          objectFit="cover"
          alt={reward.name}
        />
      </Box>
    );
  }, [reward, colors]);
  return <Box {...rest}>{preview}</Box>;
}
