import defaultAvtaar from "public/images/img_default_avatar.png";

import Image from "next/image";

import { Box, BoxProps } from "../System/Box";

export type IAvatarProps = BoxProps & {
  image?: string | StaticImageData;
  size?: number | number[];
  alt?: string;
};

export function Avatar({
  size = 72,
  image,
  alt,
  ...rest
}: IAvatarProps): JSX.Element {
  const src = !image || image === null ? defaultAvtaar : image;
  return (
    <Box
      overflow="hidden"
      position="relative"
      size={size}
      borderRadius="50%"
      {...rest}
    >
      <Image src={src as string} layout="fill" objectFit="cover" alt={alt} />
    </Box>
  );
}
