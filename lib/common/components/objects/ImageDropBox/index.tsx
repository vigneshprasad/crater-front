import { ChangeEvent, useCallback, useEffect, useRef, useState } from "react";
import styled, { useTheme } from "styled-components";

import Image from "next/image";

import { Box, BoxProps, Grid, Icon, Text, Span } from "../../atoms";

interface IProps {
  alt?: string;
  value?: string;
  previewStyle?: BoxProps;
  onChange?: (file: File) => void;
  error?: string;
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
  value: controlledValue,
  previewStyle,
  error,
  onChange,
}: IProps): JSX.Element {
  const { space, colors, radii } = useTheme();
  const [photo, setPhoto] = useState<File | string | undefined>(undefined);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleOnChange = useCallback(
    (file: File) => {
      if (onChange) {
        onChange(file);
      }
    },
    [onChange]
  );

  useEffect(() => {
    if (controlledValue) {
      setPhoto(controlledValue);
    }
  }, [controlledValue]);

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

  return (
    <Box>
      <input
        style={{ display: "none" }}
        ref={inputRef}
        type="file"
        onChange={handleFileInputChange}
        accept="image/jpg, image/png, image/tiff, image/bmp"
      />
      <Preview
        pt="56.25%"
        borderRadius={radii.xs}
        overflow="hidden"
        {...previewStyle}
      >
        {(() => {
          if (!photo) {
            return (
              <Grid
                position="absolute"
                top={0}
                left={0}
                w="100%"
                h="100%"
                border={`2px dashed ${error ? colors.error : colors.slate}`}
                borderRadius={radii.xs}
              >
                <Text
                  color={colors.slate}
                  textStyle="captionLarge"
                  m="auto auto"
                  textAlign="center"
                >
                  Add a cover photo.
                  <br />
                  <Span textStyle="caption">
                    (Ideal dimensions 1024 x 576px)
                  </Span>
                </Text>
                <Overlay onClick={() => inputRef.current?.click()}>
                  <Icon
                    color={colors.white[0]}
                    fill
                    size={48}
                    icon="FileUpload"
                  />
                </Overlay>
              </Grid>
            );
          }

          const src =
            typeof photo === "string" ? photo : URL.createObjectURL(photo);

          return (
            <Image
              objectFit="cover"
              src={src}
              alt={alt}
              layout="fill"
              unoptimized
            />
          );
        })()}
        <Overlay onClick={() => inputRef.current?.click()}>
          <Icon color={colors.white[0]} fill size={48} icon="FileUpload" />
        </Overlay>
      </Preview>
      {error && (
        <Box px={space.xxxs} py={space.xxxs}>
          <Text color={colors.error} textStyle="error">
            {error}
          </Text>
        </Box>
      )}
    </Box>
  );
}
