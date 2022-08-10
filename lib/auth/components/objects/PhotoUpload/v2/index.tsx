import DEFAULT_IMAGE from "public/images/img_default_avatar.png";
import { useState, useRef, ChangeEvent, useCallback } from "react";
import styled, { useTheme } from "styled-components";

import Image from "next/image";

import {
  Box,
  BoxProps,
  Grid,
  Icon,
  Text,
  Flex,
  Spinner,
} from "@/common/components/atoms";
import { Button } from "@/common/components/atoms/v2";

interface IProps {
  value?: string;
  heading: string;
  description?: string;
  previewStyle?: BoxProps;
  onPostData: (file?: File) => Promise<void>;
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
}: IProps): JSX.Element {
  const [loading, setLoading] = useState(false);
  const [photo, setPhoto] = useState<File | undefined>(undefined);
  const { space, colors } = useTheme();
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
    async (file?: File) => {
      try {
        setLoading(true);
        await onPostData(file);
        setPhoto(undefined);
        setLoading(false);
      } catch (err) {
        // eslint-disable-next-line no-console
        console.log(err);
      }
    },
    [onPostData]
  );

  const handleUploadClick = (): void => {
    if (photo) {
      handleFileSubmit(photo);
    }
  };

  const handleDeleteClick = (): void => {
    handleFileSubmit(undefined);
  };

  const staticImage = !value || value == null ? DEFAULT_IMAGE : value;
  const src = photo ? URL.createObjectURL(photo) : (staticImage as string);

  return (
    <Box p={24}>
      <input
        style={{ display: "none" }}
        ref={inputRef}
        type="file"
        onChange={handleFileInputChange}
        accept="image/jpg, image/png, image/tiff, image/bmp"
      />
      <Grid
        gridAutoFlow="column"
        gridTemplateColumns="140px 1fr"
        gridGap={space.s}
      >
        <Text textStyle="formLabel">{heading}</Text>
        <Grid
          gridTemplateColumns={["1fr", "min-content 1fr"]}
          gridGap={36}
          alignItems="center"
        >
          <Preview
            h={96}
            w={96}
            borderRadius="50%"
            overflow="hidden"
            style={{ pointerEvents: value ? "none" : "auto" }}
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
          <Grid gridAutoFlow="row" alignItems="center" gridGap={24}>
            <Flex flexDirection="row" gridGap={space.xxs}>
              <Button
                variant="flat"
                label="Upload picture"
                w="fit-content"
                h={40}
                suffixElement={(() => {
                  if (!value && loading) {
                    return <Spinner size={20} />;
                  }

                  if (value) {
                    return (
                      <Icon
                        icon="CheckCircle"
                        size={16}
                        color={colors.greenSuccess}
                      />
                    );
                  }

                  return undefined;
                })()}
                disabled={!photo || (!value && loading)}
                onClick={handleUploadClick}
              />
              <Button
                variant="condensed-dark"
                label="Delete"
                w="fit-content"
                h={40}
                textProps={{
                  color: "#959595",
                }}
                suffixElement={value && loading && <Spinner size={20} />}
                disabled={
                  !value || value === null || (value !== null && loading)
                }
                onClick={handleDeleteClick}
              />
            </Flex>
            <Text
              textStyle="small"
              fontWeight={600}
              color={colors.textTertiary}
            >
              {description}
            </Text>
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
}
