import { useTheme } from "styled-components";

import Image from "next/image";

import useAuth from "@/auth/context/AuthContext";
import { Box, Flex, Span, Text } from "@/common/components/atoms";
import { Button } from "@/common/components/atoms/v2";

import { IBaseRewardCardProps } from "./types";

export default function SaleCard({
  title,
  price,
  image,
  buyers,
  quantity,
  description,
  webinar,
  onClickBuySale,
}: IBaseRewardCardProps): JSX.Element | null {
  const { radii, space, colors } = useTheme();
  const { user } = useAuth();

  if (!user) {
    return null;
  }

  const isHost = webinar.host === user.pk;

  return (
    <Flex
      border={`1px solid ${colors.primaryLight}`}
      gridGap={space.xxs}
      py={space.xxxs}
      px={space.xxxxs}
      borderRadius={radii.xxxxs}
      bg={colors.primaryBackground}
    >
      <Flex flex={1} gridGap={space.xxxxs} flexDirection="column">
        <Text textStyle="menu">{title}</Text>
        {description && (
          <Text maxLines={2} color={colors.textQuartenary} textStyle="small">
            {description}
          </Text>
        )}

        {isHost ? (
          <Text textStyle="bodyLarge" fontWeight="600">
            ₹{price}
          </Text>
        ) : (
          <Text textStyle="bodyLarge" fontWeight="600">
            ₹{price}{" "}
            <Span color={colors.textQuartenary} fontSize="1rem">
              (Buyers: {buyers})
            </Span>
          </Text>
        )}

        {isHost ? (
          <Text
            fontSize="1.2rem"
            fontWeight="600"
            w="max-content"
            borderRadius={radii.xxxxs}
            bg={colors.primaryLight}
            px={space.xxxxs}
            py={space.xxxxxs}
          >
            Buyers: {buyers}
          </Text>
        ) : (
          <Button
            w="max-content"
            variant="small"
            label="Buy Now"
            onClick={() => {
              onClickBuySale && onClickBuySale();
            }}
          />
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
  );
}
