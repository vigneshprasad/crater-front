import Image from "next/image";

import { Box, BoxProps } from "../System/Box";

export type IAvatarProps = BoxProps & {
  image?: string;
  size?: number;
  alt: string;
};

const DEFAULT_AVATAR = "/images/img_default_avatar.png";

export const Avatar: React.FC<IAvatarProps> = ({
  size = 72,
  image = DEFAULT_AVATAR,
  alt,
  ...rest
}) => {
  return (
    <Box
      overflow="hidden"
      position="relative"
      h={size}
      w={size}
      borderRadius="50%"
      {...rest}
    >
      <Image src={image} layout="fill" objectFit="cover" alt={alt} />
    </Box>
  );
};
