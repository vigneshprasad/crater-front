import { useMemo } from "react";
import styled, { useTheme } from "styled-components";

import { Box, Flex, Icon, Span, Text } from "@/common/components/atoms";
import { RewardSalePaymentType, SaleItem } from "@/tokens/types/store";

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

type IProps = {
  creator: string;
  saleItem: SaleItem;
  showPrice: boolean;
};

export default function SaleItemInfo({
  creator,
  saleItem,
  showPrice = false,
}: IProps): JSX.Element {
  const { space, colors } = useTheme();

  const { quantity, quantity_sold } = saleItem.reward_sale_details[0];
  const payWithLearn =
    saleItem.reward_sale_details.find(
      (sale) => sale.payment_type === RewardSalePaymentType.Learn
    ) ?? false;

  const rows = useMemo<
    {
      key: string;
      name: string;
      value: string;
    }[]
  >(() => {
    return [
      {
        key: "creator",
        name: "Creator",
        value: creator,
      },
      {
        key: "buyers",
        name: "Buyers",
        value: quantity_sold === 0 ? "-" : `${quantity_sold}`,
      },
      {
        key: "stockLeft",
        name: "Stock Left",
        value:
          quantity - quantity_sold === 0 ? "-" : `${quantity - quantity_sold}`,
      },
    ];
  }, [creator, quantity, quantity_sold]);

  return (
    <Flex flexDirection="column" gridGap={24}>
      {rows.map(({ key, name, value }) => (
        <Box borderBottom={`1px solid ${colors.textPrimary}`} key={key}>
          <Flex
            pb={space.xxs}
            flexDirection="row"
            justifyContent="space-between"
            alignItems="center"
          >
            <Text textStyle="captionLarge" textTransform="uppercase">
              {name}
            </Text>
            <Text textStyle="captionLarge" textTransform="uppercase">
              {value}
            </Text>
          </Flex>
        </Box>
      ))}

      {showPrice && (
        <Box pt={space.l} borderBottom={`1px solid ${colors.textPrimary}`}>
          <Flex
            pb={space.xxs}
            flexDirection="row"
            justifyContent="space-between"
            alignItems="center"
          >
            <Text textStyle="captionLarge" textTransform="uppercase">
              {payWithLearn ? "Price with learn" : "Price without learn"}
            </Text>

            {(() => {
              const rewardSales = saleItem.reward_sale_details;

              // INR price
              const price = rewardSales.find(
                (sale) => sale.payment_type === RewardSalePaymentType.INR
              )?.price;

              // LEARN price
              const learnPrice = rewardSales.find(
                (sale) => sale.payment_type === RewardSalePaymentType.Learn
              )?.price;

              if (price && learnPrice) {
                return (
                  <Flex alignItems="center" gridGap={space.xxxxxs}>
                    <Text textStyle="headline5" textTransform="uppercase">
                      ₹{price} + {learnPrice} <StyledSpan>LEARN</StyledSpan>
                    </Text>
                    <Icon icon="LearnToken" size={20} />
                  </Flex>
                );
              }

              if (price) {
                return (
                  <Text textStyle="headline5" textTransform="uppercase">
                    ₹{price}
                  </Text>
                );
              }

              return (
                <Flex alignItems="center" gridGap={space.xxxxxs}>
                  <Text textStyle="headline5" textTransform="uppercase">
                    {learnPrice} <StyledSpan>LEARN</StyledSpan>
                  </Text>
                  <Icon icon="LearnToken" size={20} />
                </Flex>
              );
            })()}

            {}
          </Flex>
        </Box>
      )}
    </Flex>
  );
}
