import DEFAULT_IMAGE from "public/images/img_default_avatar.png";
import {
  useState,
  ChangeEventHandler,
  MouseEventHandler,
  useRef,
  useCallback,
} from "react";
import styled, { useTheme } from "styled-components";

import Image from "next/image";

import { Box, Icon, Text } from "@/common/components/atoms";

type IProps = {
  alt?: string;
  photo?: string;
  onChange?: (file: File) => void;
  disabled?: boolean;
  size?: number;
  error?: string;
};

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

const Container = styled(Box)`
  position: relative;
  border-radius: 50%;
  overflow: hidden;

  &:hover > ${Overlay} {
    opacity: 0.7;
  }
`;

export default function PictureInput({
  photo,
  alt,
  onChange,
  size = 120,
  disabled = false,
  error,
}: IProps): JSX.Element {
  const { colors } = useTheme();
  const [photoFile, setPhotoFile] = useState<File | undefined>(undefined);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleOverlayClick: MouseEventHandler<HTMLDivElement> = () => {
    inputRef.current?.click();
  };

  const handleOnChange = useCallback(
    (file: File) => {
      if (onChange) {
        onChange(file);
      }
    },
    [onChange]
  );

  const handlePhotoFileChange: ChangeEventHandler<HTMLInputElement> = (
    event
  ) => {
    const file = event.target.files?.[0];
    if (file) {
      setPhotoFile(file);
      handleOnChange(file);
    }
  };

  const staticImage = photo ?? (DEFAULT_IMAGE as never);
  const src = photoFile ? URL.createObjectURL(photoFile) : staticImage;

  return (
    <>
      <Container size={size}>
        <input
          style={{ display: "none" }}
          ref={inputRef}
          type="file"
          onChange={handlePhotoFileChange}
          accept="image/jpg, image/png, image/tiff, image/bmp"
        />
        <Image
          src={src}
          layout="fill"
          alt={alt}
          objectFit="cover"
          unoptimized
        />
        {!disabled && (
          <Overlay onClick={handleOverlayClick}>
            <Icon fill color={colors.white[0]} size={48} icon="FileUpload" />
          </Overlay>
        )}
      </Container>
      {error && (
        <Text textStyle="error" color={colors.error}>
          {error}
        </Text>
      )}
    </>
  );
}
