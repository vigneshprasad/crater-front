import { useMemo } from "react";
import { useTheme } from "styled-components";

import { Box, Shimmer, Text } from "@/common/components/atoms";
import DataTable from "@/common/components/objects/DataTable";
import { Column } from "@/common/components/objects/DataTable/types";
import DateTime from "@/common/utils/datetime/DateTime";
import { Referral } from "@/tokens/types/referrals";

interface IProps {
  referrals?: Referral[];
}

export default function ReferralDataTable({ referrals }: IProps): JSX.Element {
  const { colors, radii } = useTheme();

  const columns = useMemo<Column<Referral>[]>(() => {
    return [
      {
        label: "Referral",
        key: "referral",
        valueGetter: (obj) => obj.username,
      },
      {
        label: "Watched Stream",
        key: "stream",
        valueGetter: (obj) => {
          const startTime = obj.stream_start
            ? DateTime.parse_with_milliseconds(obj.stream_start)
            : null;

          return (
            <Box>
              {obj.stream_topic ? (
                <>
                  <Text>{obj.stream_topic} </Text>
                  <Text color={colors.slate} textStyle="caption">
                    {startTime?.toFormat(DateTime.DEFAULT_FORMAT)}
                  </Text>
                </>
              ) : (
                <Text>-</Text>
              )}
            </Box>
          );
        },
      },
      {
        label: "Payable",
        key: "payable",
        valueGetter: (obj) => obj.amount,
      },
      {
        label: "Status",
        key: "status",
        valueGetter: (obj) => obj.status,
      },
    ];
  }, [colors]);

  if (referrals === undefined) {
    return <Shimmer w="100%" h="100%" borderRadius={radii.xxs} />;
  }

  return <DataTable columns={columns} data={referrals} />;
}
