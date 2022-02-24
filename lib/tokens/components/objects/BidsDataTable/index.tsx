import { useCallback, useMemo } from "react";
import { useTheme } from "styled-components";
import useSWR from "swr";

import { Flex, Text } from "@/common/components/atoms";
import { Button } from "@/common/components/atoms/Button";
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
  const { space, colors, radii } = useTheme();
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
    return (
      <Flex
        flexDirection="column"
        p={space.xs}
        bg={colors.accent}
        borderRadius={radii.xxs}
        gridGap={space.xs}
      >
        <Text textStyle="headline6">Start an Auction</Text>
        <Text>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat.
        </Text>

        <Button
          border={`2px solid ${colors.white[0]}`}
          variant="dense"
          text="Contact us"
        />
      </Flex>
    );
  }

  return <DataTable columns={columns} data={bids} />;
}
