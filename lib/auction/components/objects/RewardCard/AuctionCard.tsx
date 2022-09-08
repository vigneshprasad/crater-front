import { useTheme } from "styled-components";

import Image from "next/image";

import useAuth from "@/auth/context/AuthContext";
import { Box, Flex, Span, Text, Icon } from "@/common/components/atoms";
import { Button, IconButton } from "@/common/components/atoms/v2";
import QuantityInput from "@/common/components/objects/QuantityInput";

import { IBaseRewardCardProps } from "./types";

export default function AuctionCard({
  title,
  image,
  quantity,
  description,
  webinar,
}: IBaseRewardCardProps): JSX.Element | null {
  const { radii, space, colors } = useTheme();
  const { user } = useAuth();

  if (!user) {
    return null;
  }

  const isHost = webinar.host === user.pk;

  return (
    <Box
      border={`1px solid ${colors.primaryLight}`}
      gridGap={space.xxxs}
      borderRadius={radii.xxxxs}
      bg={colors.primaryBackground}
    >
      <Flex py={space.xxxs} px={space.xxxxs}>
        <Flex
          flex={1}
          gridGap={space.xxxxs}
          flexDirection="column"
          pb={space.xxxxxs}
        >
          <Text textStyle="menu">{title}</Text>
          {description && (
            <Text maxLines={2} color={colors.textQuartenary} textStyle="small">
              {description}
            </Text>
          )}

          {isHost ? (
            <>
              <Text textStyle="caption" fontWeight="600">
                <Span mr={space.xxxxs} color={colors.textPlaceholder}>
                  Min. Bid
                </Span>
                ₹200.00
              </Text>
              <Text textStyle="caption" fontWeight="600">
                <Span color={colors.accentLight} mr={space.xxxxs}>
                  Top Bid
                </Span>
                ₹200.00
              </Text>
            </>
          ) : (
            <>
              <Text textStyle="caption" fontWeight="600">
                <Span mr={space.xxxxs} color={colors.textPlaceholder}>
                  Min. Bid
                </Span>
                ₹200.00
              </Text>
              <Text textStyle="caption" fontWeight="600">
                <Span color={colors.accentLight} mr={space.xxxxs}>
                  Top Bid
                </Span>
                ₹200.00
              </Text>
            </>
          )}
        </Flex>

        <Box position="relative">
          <Box
            position="relative"
            borderRadius={radii.xxxxs}
            overflow="hidden"
            h={88}
            w={88}
          >
            <Image src={image} alt={title} layout="fill" objectFit="cover" />
          </Box>

          <Flex
            alignItems="center"
            justifyContent="center"
            bg={colors.white[0]}
            w={18}
            h={18}
            position="absolute"
            top={-9}
            right={-9}
            borderRadius="50%"
            border={`2px solid ${colors.inputDefaultBg}`}
          >
            <Text textStyle="navbarLabel" color={colors.inputDefaultBg}>
              {quantity}
            </Text>
          </Flex>
        </Box>
      </Flex>
      <Box
        py={space.xxxxs}
        px={space.xxxxs}
        borderTop={`1px solid ${colors.primaryLight}`}
        bg={colors.primaryDark}
      >
        {(() => {
          if (isHost) {
            return (
              <Flex justifyContent="space-between">
                <IconButton buttonStyle="flat-icon" icon="Delete" />

                <Flex gridGap={space.xxxxxs} cursor="pointer">
                  <Text fontSize="1.2rem">Bids (02)</Text>
                  <Icon icon="ArrowDown" size={20} />
                </Flex>
              </Flex>
            );
          }

          return (
            <Flex justifyContent="space-between" alignItems="center">
              <QuantityInput />
              <Button w="max-content" variant="small" label="Place Bid" />
            </Flex>
          );
        })()}
      </Box>
    </Box>
  );
}
