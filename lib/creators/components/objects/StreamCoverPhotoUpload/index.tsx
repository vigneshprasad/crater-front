import { Profile } from "next-auth";
import { ChangeEvent, useRef, useState } from "react";
import styled, { useTheme } from "styled-components";

import Image from "next/image";

import {
  Flex,
  Grid,
  Text,
  Span,
  Shimmer,
  Icon,
  Box,
} from "@/common/components/atoms";
import { Button, IconButton } from "@/common/components/atoms/v2";
import toBase64 from "@/common/utils/image/toBase64";
import StreamApiClient from "@/stream/api";

interface IProps {
  topic?: string;
  value?: string;
  error?: string;
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
  value,
  error,
  profile,
  onChange,
}: IProps): JSX.Element {
  const inputRef = useRef<HTMLInputElement>(null);
  const { colors, radii, space } = useTheme();
  const [loading, setLoading] = useState(false);
  const [generatedImage, setGeneratedImage] = useState<string | undefined>(
    value
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
      <Box w={440}>
        <Container
          h={248}
          position="relative"
          overflow="hidden"
          border={`1px dashed ${error ? colors.error : colors.secondaryLight}`}
          borderRadius={radii.xxxxs}
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
                <Grid position="absolute" top={0} bottom={0} right={0} left={0}>
                  <Flex
                    m="auto auto"
                    flexDirection="column"
                    alignItems="center"
                    gridGap={space.xxxs}
                    cursor="pointer"
                    onClick={() => inputRef.current?.click()}
                  >
                    <Box position="relative" w={56} h={56}>
                      <Image
                        src="/images/img_add_thumbnail.png"
                        alt="Add thumbnail"
                        layout="fill"
                      />
                    </Box>
                    <Box>
                      <Text
                        textStyle="captionLarge"
                        lineHeight="1.6rem"
                        textAlign="center"
                      >
                        <Span fontWeight={600} color={colors.accentLight}>
                          Upload
                        </Span>{" "}
                        a thumbnail for your stream
                      </Text>
                      <Text
                        py={space.xxxxxs}
                        textStyle="caption"
                        fontWeight={600}
                        lineHeight="1.6rem"
                        textAlign="center"
                        color={colors.textQuartenary}
                      >
                        Recommended resolution: 1920x1080 px, Max size: 5 MB
                      </Text>
                    </Box>
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
                  display="flex"
                  justifyContent="center"
                  alignItems="center"
                >
                  <IconButton
                    buttonStyle="flat-icon"
                    icon="FileUpload"
                    iconProps={{
                      size: 48,
                      color: colors.textPrimary,
                      fill: true,
                    }}
                    onClick={() => inputRef.current?.click()}
                  />
                </Overlay>
              </>
            );
          })()}
        </Container>

        {error && (
          <Box py={space.xxxxxs}>
            <Text textStyle="error" color={colors.error}>
              {error}
            </Text>
          </Box>
        )}

        <Flex pt={space.xxxs} justifyContent="flex-end" display="none">
          <Button
            variant="transparent-flat"
            label="Generate a thumbnail for me"
            border={`1px solid ${colors.accentLight}`}
            prefixElement={
              <Icon icon="Generate" size={16} color={colors.accentLight} />
            }
            gridProps={{
              gridTemplateColumns: "max-content 1fr",
            }}
            onClick={handleGenerateCoverPhoto}
          />
        </Flex>
      </Box>
    </>
  );
}
