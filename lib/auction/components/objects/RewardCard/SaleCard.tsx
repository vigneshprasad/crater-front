import styled, { useTheme } from "styled-components";

import Image from "next/image";

import { SalePaymentType } from "@/auction/types/sales";
import useAuth from "@/auth/context/AuthContext";
import { Box, Flex, Span, Text, Icon } from "@/common/components/atoms";
import { Button } from "@/common/components/atoms/v2";

import { IBaseRewardCardProps } from "./types";

const StyledSpan = styled(Span)`
  background: linear-gradient(
    0deg,
    #d5bbff 17.58%,
    #9db3ff 85.38%,
    #0d849e 85.38%
  );

  backgroundclip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  textfillcolor: transparent;
`;

export default function SaleCard({
  title,
  price,
  image,
  buyers,
  quantity,
  paymentType,
  description,
  webinar,
  isActive,
  onClickBuySale,
}: IBaseRewardCardProps): JSX.Element | null {
  const { radii, space, colors } = useTheme();
  const { user } = useAuth();

  if (!user) {
    return null;
  }

  const isHost = webinar.host === user.pk;

  console.log(paymentType);

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
            {(() => {
              switch (paymentType) {
                case SalePaymentType.UPI:
                  return <>₹{price}</>;
                case SalePaymentType.LEARN:
                  return (
                    <Flex alignItems="center" gridGap={space.xxxxxs}>
                      <Text fontSize="1.4rem">
                        {price} <StyledSpan>LEARN</StyledSpan>
                      </Text>
                      <Icon icon="LearnToken" size={16} />
                    </Flex>
                  );
              }
            })()}
          </Text>
        ) : (
          <Text textStyle="bodyLarge" fontWeight="600">
            {(() => {
              switch (paymentType) {
                case SalePaymentType.UPI:
                  return <>₹{price}</>;
                case SalePaymentType.LEARN:
                  return (
                    <Flex alignItems="center" gridGap={space.xxxxxs}>
                      <Text fontSize="1.4rem">
                        {price} <StyledSpan>LEARN</StyledSpan>
                      </Text>
                      <Icon icon="LearnToken" size={16} />
                      <Text color={colors.textQuartenary} fontSize="1rem">
                        (Buyers: {buyers})
                      </Text>
                    </Flex>
                  );
              }
            })()}
          </Text>
        )}

        {(() => {
          if (isHost) {
            return (
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
            );
          }

          if (!isHost && isActive) {
            return (
              <Button
                w="max-content"
                variant="small"
                label="Buy Now"
                onClick={() => {
                  onClickBuySale && onClickBuySale();
                }}
              />
            );
          }
        })()}
      </Flex>

      <Box position="relative">
        <Box
          position="relative"
          borderRadius={radii.xxxxs}
          overflow="hidden"
          h={88}
          w={88}
        >
          {image && (
            <Image src={image} alt={title} layout="fill" objectFit="cover" />
          )}
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
