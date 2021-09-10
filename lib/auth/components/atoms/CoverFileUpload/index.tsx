import { motion } from "framer-motion";
import DEFAULT_COVER from "public/images/img_cover_example.jpg";
import {
  ChangeEventHandler,
  DragEventHandler,
  useRef,
  useState,
  useCallback,
} from "react";
import styled from "styled-components";

import Image from "next/image";

import { Box, Icon } from "@/common/components/atoms";

type IProps = {
  coverImage?: string;
  alt: string;
  onChange?: (file: File) => void;
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

const Container = styled(motion(Box))`
  position: relative;
  height: 240px;

  &:hover > ${Overlay} {
    opacity: 0.7;
  }
`;

export default function CoverFileUpload({
  coverImage,
  alt,
  onChange,
}: IProps): JSX.Element {
  const [photoFile, setPhotoFile] = useState<File>();
  const inputRef = useRef<HTMLInputElement>(null);

  const handleOnChange = useCallback(
    (file: File) => {
      if (onChange) {
        onChange(file);
      }
    },
    [onChange]
  );

  const handleOnDrop: DragEventHandler<HTMLDivElement> = (event) => {
    event.preventDefault();
    event.stopPropagation();
    const file = event.dataTransfer.files?.[0];
    if (file) {
      setPhotoFile(file);
      handleOnChange(file);
    }
  };

  const handleOnDragOver: DragEventHandler<HTMLDivElement> = (event) => {
    event.preventDefault();
    event.stopPropagation();
  };

  const staticImage = coverImage ?? (DEFAULT_COVER as never);
  const src = photoFile ? URL.createObjectURL(photoFile) : staticImage;

  const handlePhotoFileChange: ChangeEventHandler<HTMLInputElement> = (
    event
  ) => {
    const file = event.target.files?.[0];
    if (file) {
      setPhotoFile(file);
      handleOnChange(file);
    }
  };

  return (
    <>
      <input
        style={{ display: "none" }}
        ref={inputRef}
        type="file"
        onChange={handlePhotoFileChange}
        accept="image/jpg, image/png, image/tiff, image/bmp"
      />
      <Container onDragOver={handleOnDragOver} onDrop={handleOnDrop}>
        <Image
          src={src}
          alt={alt}
          layout="fill"
          objectFit="cover"
          unoptimized
        />
        <Overlay onClick={() => inputRef.current?.click()}>
          <Icon size={48} icon="FileUpload" />
        </Overlay>
      </Container>
    </>
  );
}
