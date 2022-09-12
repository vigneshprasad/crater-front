import { ChangeEvent, useCallback, useState, useRef } from "react";
import { useTheme } from "styled-components";

import Image from "next/image";

import { Box, BoxProps, Flex, Icon, Text } from "@/common/components/atoms";

interface IProps {
  alt?: string;
  value?: File;
  previewStyle?: BoxProps;
  onChange?: (file: File) => void;
  error?: string;
  label?: string | JSX.Element;
}

export default function ImageDropBox({
  onChange,
  alt,
  label,
}: IProps): JSX.Element {
  const [photo, setPhoto] = useState<File | string | undefined>(undefined);
  const inputRef = useRef<HTMLInputElement>(null);
  const { space, colors, radii } = useTheme();

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

  return (
    <Box>
      <input
        style={{ display: "none" }}
        ref={inputRef}
        type="file"
        onChange={handleFileInputChange}
        accept="image/jpg, image/png, image/tiff, image/bmp"
      />
      {label && (
        <Text mb={space.xxxxs} textStyle="inputLabel">
          {label}
        </Text>
      )}
      <Flex
        cursor="pointer"
        position="relative"
        border={`1px dashed ${colors.secondaryLight}`}
        borderRadius={radii.xxxxs}
        minHeight={108}
        alignItems="center"
        justifyContent="center"
        onClick={() => inputRef.current?.click()}
      >
        {(() => {
          if (!photo) {
            return (
              <Flex
                flexDirection="column"
                alignItems="center"
                justifyContent="center"
              >
                <Icon color={colors.secondaryLight} icon="Upload" />
                <Text fontSize="1rem" color={colors.secondaryLight}>
                  Upload
                </Text>
              </Flex>
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
      </Flex>
    </Box>
  );
}
