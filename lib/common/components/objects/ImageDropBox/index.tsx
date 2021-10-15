import DEFAULT_IMAGE from "public/images/img_default_avatar.png";
import { ChangeEvent, useCallback, useRef, useState } from "react";
import styled, { useTheme } from "styled-components";

import Image from "next/image";

import { Box, BoxProps, Icon } from "../../atoms";

interface IProps {
  alt?: string;
  value?: string;
  previewStyle?: BoxProps;
  onChange?: (file: File) => void;
}

const Overlay = styled(Box)`
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  position: absolute;
  top: 0;
  right: 0;
  left: 0;
  bottom: 0;
  background: ${({ theme: { colors } }) => colors.accent};
  transition: all 200ms ease-in-out;
  cursor: pointer;
`;

const Preview = styled(Box)`
  position: relative;

  &:hover > ${Overlay} {
    opacity: 0.7;
  }
`;

export default function ImageDropBox({
  alt,
  value,
  previewStyle,
  onChange,
}: IProps) {
  const { colors } = useTheme();
  const [photo, setPhoto] = useState<File | undefined>(undefined);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleOnChange = useCallback(
    (file: File) => {
      if (onChange) {
        onChange(file);
      }
    },
    [onChange]
  );

  const handleFileInputChange = (
    event: ChangeEvent<HTMLInputElement>
  ): void => {
    event.preventDefault();
    const file = event.target.files?.[0];
    if (file) {
      setPhoto(file);
      handleOnChange(file);
    }
  };

  const staticImage = !value || value == null ? DEFAULT_IMAGE : value;
  const src = photo ? URL.createObjectURL(photo) : (staticImage as string);

  return (
    <Box>
      <input
        style={{ display: "none" }}
        ref={inputRef}
        type="file"
        onChange={handleFileInputChange}
        accept="image/jpg, image/png, image/tiff, image/bmp"
      />
      <Preview pt="40%" borderRadius="none" overflow="hidden" {...previewStyle}>
        <Image
          objectFit="cover"
          src={src}
          alt={alt}
          layout="fill"
          unoptimized
        />
        <Overlay onClick={() => inputRef.current?.click()}>
          <Icon color={colors.white[0]} fill size={48} icon="FileUpload" />
        </Overlay>
      </Preview>
    </Box>
  );
}
