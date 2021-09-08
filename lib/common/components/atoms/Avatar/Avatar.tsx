import defaultAvtaar from "public/images/img_default_avatar.png";

import Image from "next/image";

import { Box, BoxProps } from "../System/Box";

export type IAvatarProps = BoxProps & {
  image?: string | StaticImageData;
  size?: number;
  alt: string;
};

export const Avatar: React.FC<IAvatarProps> = ({
  size = 72,
  image = defaultAvtaar,
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
      <Image src={image as string} layout="fill" objectFit="cover" alt={alt} />
    </Box>
  );
};
