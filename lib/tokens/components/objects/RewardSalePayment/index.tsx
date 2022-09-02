import STATIC_IMAGES from "public/images";
import { useMemo, useState } from "react";
import styled, { useTheme } from "styled-components";

import { Box, Flex, Icon, Image, Span, Text } from "@/common/components/atoms";
import { Button, IconButton } from "@/common/components/atoms/v2";
import { RewardSalePaymentType, SaleItem } from "@/tokens/types/store";

import SaleItemInfo from "../SaleItemInfo";

const StyledBox = styled(Box)`
  ::-webkit-scrollbar {
    width: 4px;
  }

  ::-webkit-scrollbar-thumb {
    border: 4px solid #373737;
  }
`;

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

enum RewardSalePaymentFlow {
  SaleItemDisplay,
  PurchaseRequest,
  PurchaseSuccess,
}

const RewardSalePaymentSteps = [
  RewardSalePaymentFlow.SaleItemDisplay,
  RewardSalePaymentFlow.PurchaseRequest,
  RewardSalePaymentFlow.PurchaseSuccess,
];

type IProps = {
  saleItem: SaleItem;
};

export default function RewardSalePayment({ saleItem }: IProps): JSX.Element {
  const { space, colors, radii } = useTheme();
  const [currentPage, setCurrentPage] = useState<number>(0);
  const [infoSheet, setInfoSheet] = useState(false);

  const rewardSale = saleItem.reward_sale_details[0];
  const payWithLearn = rewardSale.payment_type === RewardSalePaymentType.Learn;

  const pages = useMemo<
    {
      key: number;
      display?: JSX.Element;
    }[]
  >(() => {
    return [
      {
        key: RewardSalePaymentFlow.SaleItemDisplay,
        display: (
          <Box py={20} pl={space.xs} pr={24}>
            <SaleItemInfo
              creator={saleItem.creator_detail.name}
              saleItem={saleItem}
              showPrice={false}
            />
          </Box>
        ),
      },
      {
        key: RewardSalePaymentFlow.PurchaseRequest,
        display: (
          <Box
            mt={space.xxs}
            w="100%"
            h="40%"
            bg={colors.primaryLight}
            borderTop={`1px solid ${colors.primaryLight}`}
            borderRadius="12px 12px 0px 0px"
            position="absolute"
            bottom={0}
          />
        ),
      },
      {
        key: RewardSalePaymentFlow.PurchaseSuccess,
        display: <Text>Purchase Success</Text>,
      },
    ];
  }, [space, colors, saleItem]);

  return (
    <Flex flexDirection="column">
      <Box pt={space.xxxxs} pl={space.xs} pr={24}>
        <Box
          p={space.xxxs}
          bg={colors.primaryDark}
          border={`1px dashed ${colors.primaryLight}`}
          borderRadius={radii.xxxxs}
        >
          <Flex
            gridGap={space.xxxxxs}
            justifyContent="center"
            alignItems="center"
          >
            <Text textStyle="small" fontWeight={700}>
              Watch Web3 streams to get LEARN tokens and unlock discounts
            </Text>
            <Icon icon="LearnToken" size={14} />
          </Flex>
        </Box>

        <Flex pt={space.xxs} alignItems="center">
          <IconButton icon="Share" />
        </Flex>

        <Box pt={28}>
          <Flex pb={space.xxxs} gridGap={24}>
            {saleItem.photo ? (
              <Image
                src={saleItem.photo}
                alt={saleItem.title}
                objectFit="cover"
                boxProps={{
                  w: 115,
                  h: 115,
                  borderRadius: radii.xxs,
                  position: "relative",
                  overflow: "hidden",
                }}
              />
            ) : (
              <Image
                src={STATIC_IMAGES.ImageDefaultSaleItem}
                alt={saleItem.title}
                boxProps={{
                  w: 56,
                  h: 56,
                  borderRadius: radii.xxs,
                  position: "relative",
                }}
              />
            )}
            <Text pt={space.xxxxs} textStyle="formLabel">
              {saleItem.title}
            </Text>
          </Flex>
          {saleItem.description && (
            <Flex
              px={space.xxxs}
              py={space.xxxxxs}
              justifyContent="space-between"
              alignItems="center"
              bg={colors.primaryDark}
              border={`1px solid ${colors.primaryLight}`}
              borderRadius={radii.xxxxs}
            >
              <Text textStyle="small" fontWeight={600}>
                More Information
              </Text>
              {infoSheet ? (
                <IconButton
                  icon="ChevronUp"
                  iconProps={{ size: 18 }}
                  onClick={() => setInfoSheet(false)}
                />
              ) : (
                <IconButton
                  icon="ChevronDown"
                  iconProps={{ size: 18 }}
                  onClick={() => setInfoSheet(true)}
                />
              )}
            </Flex>
          )}
          {infoSheet && (
            <StyledBox
              p={space.xxxs}
              maxHeight={200}
              overflowY="auto"
              borderWidth="0px 1px 1px 1px"
              borderStyle="solid"
              borderColor={colors.primaryLight}
              borderRadius="0px 0px 4px 4px"
            >
              <Text textStyle="body" fontWeight={500} lineHeight="2.1rem">
                {saleItem.description}
              </Text>
            </StyledBox>
          )}
        </Box>
      </Box>

      {pages.map(
        ({ key, display }) =>
          RewardSalePaymentSteps[currentPage] === key && (
            <Box key={key}>{display}</Box>
          )
      )}

      {currentPage === RewardSalePaymentFlow.SaleItemDisplay && (
        <Box
          w="100%"
          py={28}
          px={space.xs}
          bg={colors.primaryDark}
          position="absolute"
          bottom={0}
          borderTop={`1px solid ${colors.primaryLight}`}
        >
          <Flex justifyContent="space-between" alignItems="center">
            <Box>
              <Text
                pb={space.xxxxxs}
                textStyle="small"
                fontWeight={600}
                color={colors.textQuartenary}
              >
                PRICE
              </Text>
              {payWithLearn ? (
                <Flex alignItems="center" gridGap={space.xxxxxs}>
                  <Text textStyle="formLabel">
                    {rewardSale.price} <StyledSpan>LEARN</StyledSpan>
                  </Text>
                  <Icon icon="LearnToken" size={20} />
                </Flex>
              ) : (
                <Text textStyle="formLabel">₹{rewardSale.price}</Text>
              )}
            </Box>
            <Button
              w={280}
              minHeight={44}
              label="Buy Now 🎉 (Coming Soon)"
              textProps={{ fontSize: "1.6rem" }}
              onClick={() => setCurrentPage((page) => page + 1)}
              disabled={true}
            />
          </Flex>
        </Box>
      )}
    </Flex>
  );
}
