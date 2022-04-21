import { Profile } from "next-auth";
import { ChangeEvent, useRef, useState } from "react";
import styled, { useTheme } from "styled-components";

import Image from "next/image";

import {
  Flex,
  Button,
  Grid,
  Text,
  Span,
  Shimmer,
  Icon,
} from "@/common/components/atoms";
import toBase64 from "@/common/utils/image/toBase64";
import StreamApiClient from "@/stream/api";

interface IProps {
  topic?: string;
  profile?: Profile;
  onChange?: (image: string) => void;
}

const Overlay = styled(Grid)`
  opacity: 0;
  transition: all 200ms ease-in-out;
`;

const Container = styled(Grid)`
  &:hover > ${Overlay} {
    opacity: 1;
    background: rgba(145, 70, 255, 0.3);
  }
`;

export default function StreamCoverPhotoUpload({
  topic,
  profile,
  onChange,
}: IProps): JSX.Element {
  const inputRef = useRef<HTMLInputElement>(null);
  const { colors, radii, space } = useTheme();
  const error = undefined;
  const [loading, setLoading] = useState(false);
  const [generatedImage, setGeneratedImage] = useState<string | undefined>(
    undefined
  );

  const handleGenerateCoverPhoto = async (): Promise<void> => {
    if (topic && profile && profile.photo) {
      setLoading(true);
      const [result, error] = await StreamApiClient().generateCoverPhoto(
        topic,
        profile.photo
      );

      if (error) {
        setLoading(false);
        return;
      }
      setLoading(false);
      setGeneratedImage(result);
      onChange && onChange(result as string);
    }
  };

  const handleFileInputChange = async (
    event: ChangeEvent<HTMLInputElement>
  ): Promise<void> => {
    event.preventDefault();
    const file = event.target.files?.[0];
    if (file) {
      const result = await toBase64(file);
      setGeneratedImage(result as string);
      onChange && onChange(result as string);
    }
  };

  return (
    <>
      <input
        style={{ display: "none" }}
        ref={inputRef}
        type="file"
        onChange={handleFileInputChange}
        accept="image/jpg, image/png, image/tiff, image/bmp"
      />
      <Container
        position="relative"
        pt="56.25%"
        borderRadius={radii.xs}
        overflow="hidden"
      >
        {(() => {
          if (loading) {
            return (
              <Shimmer
                display="grid"
                position="absolute"
                top={0}
                bottom={0}
                right={0}
                left={0}
                borderRadius={radii.xs}
              >
                <Flex m="auto auto" gridGap={space.xxxs}>
                  <Icon icon="Images" color={colors.white[0]} />
                  <Text>Generating image...</Text>
                </Flex>
              </Shimmer>
            );
          }

          if (!generatedImage) {
            return (
              <Grid
                position="absolute"
                top={0}
                bottom={0}
                right={0}
                left={0}
                border={`2px dashed ${error ? colors.error : colors.slate}`}
                borderRadius={radii.xs}
              >
                <Flex
                  m="auto auto"
                  flexDirection="column"
                  alignItems="center"
                  gridGap={space.xxs}
                >
                  <Button
                    text="Generate Image"
                    disabled={topic ? false : true}
                    onClick={handleGenerateCoverPhoto}
                  />
                  <Text>
                    or{" "}
                    <Span
                      cursor="pointer"
                      color={colors.accent}
                      onClick={() => inputRef.current?.click()}
                    >
                      Upload
                    </Span>{" "}
                    an image from your computer.
                  </Text>
                </Flex>
              </Grid>
            );
          }

          return (
            <>
              <Image
                src={generatedImage}
                layout="fill"
                unoptimized
                alt="coverImage"
                objectFit="cover"
              />
              <Overlay
                position="absolute"
                top={0}
                bottom={0}
                right={0}
                left={0}
              >
                <Button
                  prefixElement={<Icon icon="Shuffle" />}
                  m="auto auto"
                  text="Randomize"
                  onClick={handleGenerateCoverPhoto}
                />
              </Overlay>
            </>
          );
        })()}
      </Container>
    </>
  );
}
