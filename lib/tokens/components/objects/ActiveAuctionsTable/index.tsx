import { useMemo } from "react";
import { useTheme } from "styled-components";

import { Avatar, Grid, Text } from "@/common/components/atoms";
import DataTable from "@/common/components/objects/DataTable";
import { Column } from "@/common/components/objects/DataTable/types";
import DateTime from "@/common/utils/datetime/DateTime";
import { Auction } from "@/tokens/types/auctions";

interface IProps {
  auctions?: Auction[];
}

export default function ActiveAuctionsTable({ auctions }: IProps): JSX.Element {
  const { space, colors } = useTheme();
  const columns = useMemo<Column<Auction>[]>(() => {
    return [
      {
        label: "Creator",
        key: "creator",
        valueGetter: (obj) => {
          return (
            <Grid
              gridTemplateColumns="min-content 1fr"
              gridGap={space.xxxs}
              alignItems="center"
            >
              <Avatar
                size={24}
                image={obj.reward_detail?.creator_detail.photo}
              />
              <Text textStyle="small" color={colors.accentLight}>
                {obj.reward_detail?.creator_detail.name}
              </Text>
            </Grid>
          );
        },
      },
      {
        label: "Token For",
        key: "token",
        valueGetter: (obj) => {
          return (
            <Text textStyle="small" color={colors.accentLight}>
              {obj.reward_detail?.type_detail.name}
            </Text>
          );
        },
      },
      {
        label: "Bid Price",
        key: "bid_price",
        valueGetter: (obj) => {
          return <Text textStyle="small">₹{obj.minimum_bid}</Text>;
        },
      },
      {
        label: "Auction Ends In",
        key: "auction_end",
        valueGetter: (obj) => {
          const end = DateTime.parse_with_milliseconds(obj.end)
            .toRelative()
            ?.replace("in ", "");
          return <Text textStyle="small">{end}</Text>;
        },
      },
    ];
  }, [space, colors]);

  return (
    <DataTable
      columns={columns}
      data={auctions}
      headerProps={{
        textStyle: "small",
        fontWeight: 600,
        color: "#C4C4C4",
        textTransform: "uppercase",
      }}
    />
  );
}
