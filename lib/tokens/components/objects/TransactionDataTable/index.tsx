import { useMemo } from "react";

import DataTable from "@/common/components/objects/DataTable";
import { Column } from "@/common/components/objects/DataTable/types";
import DateTime from "@/common/utils/datetime/DateTime";
import { Bid } from "@/tokens/types/auctions";

interface IProps {
  bids?: Bid[];
}

export default function TransactionDataTable({ bids }: IProps): JSX.Element {
  const columns = useMemo<Column<Bid>[]>(
    () => [
      {
        label: "Creator",
        key: "creator",
        valueGetter: (obj) =>
          `${obj.coin_detail.creator_detail.profile_detail.name} (${obj.coin_detail.display.symbol})`,
      },
      {
        label: "Price",
        key: "price",
        valueGetter: (obj) => {
          const formatter = new Intl.NumberFormat("en-IN", {
            style: "currency",
            currency: "INR",
          });
          return formatter.format(obj.amount);
        },
      },
      {
        label: "Coins",
        key: "coins",
        valueGetter: (obj) => {
          return `${obj.number_of_coins} Coin`;
        },
      },
      {
        label: "Status",
        key: "status",
        valueGetter: (obj) => {
          return obj.status_detail;
        },
      },
      {
        label: "Time",
        key: "time",
        valueGetter: (obj) => {
          return DateTime.parse_with_milliseconds(obj.created_at).toFormat(
            DateTime.DEFAULT_FORMAT
          );
        },
      },
    ],
    []
  );

  return <DataTable<Bid> data={bids} columns={columns} />;
}
