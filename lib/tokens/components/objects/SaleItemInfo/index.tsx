import { useMemo } from "react";
import styled, { useTheme } from "styled-components";

import { RewardSale, SalePaymentType } from "@/auction/types/sales";
import { Box, Flex, Icon, Span, Text } from "@/common/components/atoms";
import useMediaQuery from "@/common/hooks/ui/useMediaQuery";

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
  sale: RewardSale;
  showPrice: boolean;
};

export default function SaleItemInfo({
  sale,
  showPrice = false,
}: IProps): JSX.Element | null {
  const { space, colors, breakpoints } = useTheme();

  const { matches: isMobile } = useMediaQuery(`(max-width: ${breakpoints[0]})`);

  const creator = sale.reward_detail.creator_detail.name;
  const payWithLearn = sale.payment_type === SalePaymentType.LEARN;

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
        value: sale.quantity_sold === 0 ? "-" : `${sale.quantity_sold}`,
      },
      {
        key: "stockLeft",
        name: "Stock Left",
        value:
          sale.quantity - sale.quantity_sold === 0
            ? "-"
            : `${sale.quantity - sale.quantity_sold}`,
      },
    ];
  }, [creator, sale]);

  if (isMobile === undefined) return null;

  return (
    <Flex flexDirection="column" gridGap={24}>
      {rows.map(({ key, name, value }) => (
        <Box borderBottom={`1px solid ${colors.textPrimary}`} key={key}>
          <Flex
            pb={[space.xxxxs, space.xxs]}
            flexDirection="row"
            justifyContent="space-between"
            alignItems="center"
          >
            <Text
              textStyle={isMobile ? "caption" : "captionLarge"}
              textTransform="uppercase"
            >
              {name}
            </Text>
            <Text
              textStyle={isMobile ? "caption" : "captionLarge"}
              textTransform="uppercase"
            >
              {value}
            </Text>
          </Flex>
        </Box>
      ))}

      {showPrice && (
        <Box
          pt={[space.s, space.l]}
          borderBottom={`1px solid ${colors.textPrimary}`}
        >
          <Flex
            pb={[space.xxxxs, space.xxs]}
            flexDirection="row"
            justifyContent="space-between"
            alignItems="center"
          >
            <Text textStyle="captionLarge" textTransform="uppercase">
              {payWithLearn ? "Price with learn" : "Price without learn"}
            </Text>

            {payWithLearn ? (
              <Flex alignItems="center" gridGap={space.xxxxxs}>
                <Text textStyle="headline5" textTransform="uppercase">
                  {sale.price} <StyledSpan>LEARN</StyledSpan>
                </Text>
                <Icon icon="LearnToken" size={20} />
              </Flex>
            ) : (
              <Text textStyle="headline5" textTransform="uppercase">
                ₹{sale.price}
              </Text>
            )}
          </Flex>
        </Box>
      )}
    </Flex>
  );
}
