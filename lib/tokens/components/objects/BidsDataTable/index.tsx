import { useCallback, useMemo } from "react";
import { useTheme } from "styled-components";
import { SWRResponse } from "swr";

import { Flex, Shimmer, Text } from "@/common/components/atoms";
import { Button } from "@/common/components/atoms/Button";
import DataTable from "@/common/components/objects/DataTable";
import { Column } from "@/common/components/objects/DataTable/types";
import DateTime from "@/common/utils/datetime/DateTime";
import AuctionApiClient from "@/tokens/api/AuctionApiClient";
import { Bid, BidStatus } from "@/tokens/types/auctions";

interface IProps {
  bids?: Bid[];
  mutate: SWRResponse<Bid[], unknown>["mutate"];
  loading: boolean;
}

export default function BidsDataTable({
  bids,
  mutate,
  loading,
}: IProps): JSX.Element {
  const { space, colors, radii } = useTheme();

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
        label: "Reward",
        key: "reward",
        valueGetter: (obj) => (
          <Text fontWeight="600">{obj.reward_detail.name}</Text>
        ),
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
                <Button
                  variant="green-success"
                  color={colors.greenSuccess}
                  text="Accept"
                  onClick={() => acceptBidRequest(obj)}
                />
                <Button
                  variant="red-error"
                  color={colors.red[0]}
                  text="Decline"
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

  if (!bids) {
    if (loading) {
      return <Shimmer h={240} />;
    }
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
