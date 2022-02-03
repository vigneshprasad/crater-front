import { useCallback, useMemo } from "react";
import { useTheme } from "styled-components";
import useSWR from "swr";

import { Box, Flex } from "@/common/components/atoms";
import DataTable from "@/common/components/objects/DataTable";
import { Column } from "@/common/components/objects/DataTable/types";
import TextButton from "@/common/components/objects/TextButton";
import { API_URL_CONSTANTS } from "@/common/constants/url.constants";
import DateTime from "@/common/utils/datetime/DateTime";
import AuctionApiClient from "@/tokens/api/AuctionApiClient";
import { Auction, Bid, BidStatus } from "@/tokens/types/auctions";

interface IProps {
  auction?: Auction;
}

export default function BidsDataTable({ auction }: IProps): JSX.Element {
  const { space, colors } = useTheme();
  const { data: bids, mutate } = useSWR<Bid[]>(
    auction
      ? `${API_URL_CONSTANTS.auctions.getBids}?auction=${auction.id}`
      : null
  );

  const acceptBidRequest = useCallback(
    async (bid: Bid) => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const [res, err] = await AuctionApiClient().acceptBid(bid.id);

      if (err) {
        return;
      }

      mutate();
    },
    [mutate]
  );

  const columns = useMemo<Column<Bid>[]>(
    () => [
      {
        label: "Bidder",
        key: "bidder",
        valueGetter: (obj) => obj.bidder_profile_detail.name,
      },
      {
        label: "Price",
        key: "price",
        valueGetter: (obj) => obj.bid_price,
      },
      {
        label: "Number of coins",
        key: "number_of_coins",
        valueGetter: (obj) => obj.number_of_coins,
      },
      {
        label: "Status",
        key: "status",
        valueGetter: (obj) => obj.status_detail,
      },
      {
        label: "Time",
        key: "bid_time",
        valueGetter: (obj) =>
          DateTime.parse_with_milliseconds(obj.created_at).toRelative(),
      },
      {
        label: "",
        key: "action",
        valueGetter: (obj) => {
          if (obj.status == BidStatus.Pending) {
            return (
              <Flex gridGap={space.xxxs}>
                <TextButton
                  color={colors.greenSuccess}
                  label="Accept"
                  onClick={() => acceptBidRequest(obj)}
                />
                <TextButton
                  color={colors.red[0]}
                  label="Decline"
                  onClick={() => acceptBidRequest(obj)}
                />
              </Flex>
            );
          }
          return "";
        },
      },
    ],
    [space, acceptBidRequest, colors]
  );

  if (!auction) {
    return <Box>Start an Auction</Box>;
  }

  return <DataTable columns={columns} data={bids} />;
}
