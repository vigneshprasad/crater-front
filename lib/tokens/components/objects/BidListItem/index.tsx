import styled, { useTheme } from "styled-components";

import { Box, Text, Span } from "@/common/components/atoms";
import { CurrencyFormatter } from "@/common/utils/formatters";
import { Bid } from "@/tokens/types/auctions";

interface IProps {
  bid: Bid;
}

const Container = styled(Box)`
  &:nth-child(even) {
    background-color: ${(props) => props.theme.colors.whiteAlpha[1]};
  }
`;

export default function BidsListItem({ bid }: IProps): JSX.Element {
  const { space } = useTheme();
  const { bid_price, reward_detail } = bid;
  return (
    <Container px={space.xxs} py={space.xxxs}>
      <Text lineHeight="2.4rem">
        Bid of{" "}
        <Span fontWeight="600">{CurrencyFormatter.format(bid_price)}</Span>{" "}
        placed for <Span fontWeight="600">{reward_detail.name}</Span>
      </Text>
    </Container>
  );
}
