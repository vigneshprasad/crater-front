import DEFAULT_IMAGE from "public/images/img_default_avatar.png";
import {
  useState,
  ChangeEventHandler,
  MouseEventHandler,
  useRef,
  useCallback,
} from "react";
import styled from "styled-components";

import Image from "next/image";

import { Box, Icon } from "@/common/components/atoms";

type IProps = {
  alt: string;
  photo?: string;
  onChange?: (file: File) => void;
  disabled?: boolean;
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
  height: 144px;
  width: 144px;
  position: relative;
  border-radius: 50%;
  overflow: hidden;

  &:hover > ${Overlay} {
    opacity: 0.7;
  }
`;

const PictureInput: React.FC<IProps> = ({
  photo,
  alt,
  onChange,
  disabled = false,
}) => {
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
    <Container>
      <input
        style={{ display: "none" }}
        ref={inputRef}
        type="file"
        onChange={handlePhotoFileChange}
        accept="image/jpg, image/png, image/tiff, image/bmp"
      />
      <Image src={src} layout="fill" alt={alt} objectFit="cover" unoptimized />
      {!disabled && (
        <Overlay onClick={handleOverlayClick}>
          <Icon size={48} icon="FileUpload" />
        </Overlay>
      )}
    </Container>
  );
};

export default PictureInput;
