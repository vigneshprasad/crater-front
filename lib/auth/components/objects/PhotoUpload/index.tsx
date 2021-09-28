import { AnimatePresence } from "framer-motion";
import DEFAULT_IMAGE from "public/images/img_default_avatar.png";
import { useState, useRef, ChangeEvent, useCallback } from "react";
import styled, { useTheme } from "styled-components";

import Image from "next/image";

import {
  Box,
  BoxProps,
  Card,
  Grid,
  Icon,
  Text,
  AnimatedBox,
} from "@/common/components/atoms";
import { Button } from "@/common/components/atoms/Button";
import sleep from "@/common/utils/async/sleep";

interface IProps {
  value?: string;
  heading: string;
  description?: string;
  previewStyle?: BoxProps;
  onPostData: (file: File) => Promise<void>;
  successText?: string;
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

export default function PhotoUpload({
  heading,
  value,
  description,
  previewStyle,
  onPostData,
  successText,
}: IProps): JSX.Element {
  const [showToast, setShowToast] = useState(false);
  const [photo, setPhoto] = useState<File | undefined>(undefined);
  const { space, radii, colors } = useTheme();
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFileInputChange = (
    event: ChangeEvent<HTMLInputElement>
  ): void => {
    event.preventDefault();
    const file = event.target.files?.[0];
    if (file) {
      setPhoto(file);
    }
  };

  const handleFileSubmit = useCallback(
    async (file: File) => {
      try {
        await onPostData(file);
        setPhoto(undefined);
        if (successText) {
          setShowToast(true);
          await sleep(1000);
          setShowToast(false);
        }
      } catch (err) {
        // eslint-disable-next-line no-console
        console.log(err);
      }
    },
    [onPostData, successText]
  );

  const handleUploadClick = (): void => {
    if (photo) {
      handleFileSubmit(photo);
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
      <Text px={space.xxs} mb={space.xs} textStyle="headline6">
        {heading}
      </Text>
      <Card>
        <Grid
          gridTemplateColumns={["1fr", "min-content 1fr"]}
          gridGap={space.xs}
        >
          <Preview
            h={120}
            w={120}
            borderRadius="50%"
            overflow="hidden"
            {...previewStyle}
          >
            <Image
              objectFit="cover"
              src={src}
              alt="Profile Picture"
              layout="fill"
              unoptimized
            />
            <Overlay onClick={() => inputRef.current?.click()}>
              <Icon color={colors.white[0]} fill size={48} icon="FileUpload" />
            </Overlay>
          </Preview>
          <Grid py={space.xxs} gridAutoFlow="row" alignItems="center">
            <Button
              text="Upload"
              disabled={!photo}
              onClick={handleUploadClick}
            />
            <Text textStyle="menu">{description}</Text>
          </Grid>
        </Grid>
      </Card>
      <AnimatePresence>
        {showToast && successText && (
          <AnimatedBox
            opacity={0}
            animate={{
              opacity: 1,
            }}
            borderRadius={`0 0 ${radii.xxs}px ${radii.xxs}px`}
            bg={colors.greenSuccess}
            px={space.xs}
            py={space.xxxs}
          >
            <Text>{successText}</Text>
          </AnimatedBox>
        )}
      </AnimatePresence>
    </Box>
  );
}
