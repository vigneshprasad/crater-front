import { Flex, Box, BoxProps } from "@/common/components/atoms";
import { Bid } from "@/tokens/types/auctions";

interface IProps extends BoxProps {
  bids?: Bid[];
  loading: boolean;
  renderList: (bids: Bid[]) => JSX.Element[];
}

export default function BidsList({
  bids,
  renderList,
  ...rest
}: IProps): JSX.Element {
  if (!bids) {
    return <Box>Loading...</Box>;
  }
  return (
    <Box {...rest}>
      <Flex flexDirection="column">{renderList(bids)}</Flex>
    </Box>
  );
}
