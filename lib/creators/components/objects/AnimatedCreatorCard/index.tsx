import { forwardRef } from "react";
import { useTheme } from "styled-components/";

import Image from "next/image";

import {
  AnimatedBox,
  AnimatedBoxProps,
  Box,
  Text,
} from "@/common/components/atoms";
import { Creator } from "@/creators/types/creator";

interface IProps extends AnimatedBoxProps {
  creator: Creator;
}

const AnimatedCreatorCard = forwardRef<HTMLDivElement, IProps>(
  ({ creator, ...rest }, ref) => {
    const { colors, space, radii } = useTheme();
    const { profile_detail, follower_count } = creator;

    const thousandMultiple = Math.round(follower_count / 100) / 10;
    const formatted = `${thousandMultiple}K Followers`;
    return (
      <AnimatedBox {...rest} ref={ref} p={space.xxxs} borderRadius={radii.xxs}>
        {profile_detail.photo && (
          <Box position="relative" h={200}>
            <Image
              objectFit="cover"
              src={profile_detail.photo}
              layout="fill"
              alt={profile_detail.name}
            />
          </Box>
        )}

        <Box pt={space.xxs}>
          <Text textStyle="title">{profile_detail.name}</Text>
          <Text color={colors.white[1]}>{formatted}</Text>
        </Box>
      </AnimatedBox>
    );
  }
);

AnimatedCreatorCard.displayName = "AnimatedCreatorCard";

export default AnimatedCreatorCard;
