import { useMemo } from "react";
import {
  CartesianGrid,
  Area,
  AreaChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { useTheme } from "styled-components";

import { Box, Shimmer, Text } from "@/common/components/atoms";
import DateTime from "@/common/utils/datetime/DateTime";
import { CoinPriceLog } from "@/tokens/types/auctions";

interface IProps {
  logs?: CoinPriceLog[];
  loading: boolean;
}

export default function CoinLogGraph({
  logs,
  loading,
}: IProps): JSX.Element | null {
  const { colors, space, radii } = useTheme();

  const data = useMemo(() => {
    if (!logs) {
      return undefined;
    }

    return logs.map(({ created_at, ...rest }) => ({
      created_at: DateTime.parse_with_milliseconds(created_at).toFormat(
        DateTime.DEFAULT_FORMAT
      ),
      ...rest,
    }));
  }, [logs]);

  if (!logs || loading) {
    return <Shimmer w="100%" h={420} />;
  }

  return (
    <ResponsiveContainer height={420}>
      <AreaChart data={data}>
        <defs>
          <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor={colors.accent} stopOpacity={0.8} />
            <stop offset="95%" stopColor={colors.accent} stopOpacity={0} />
          </linearGradient>
        </defs>
        <Area
          type="monotone"
          dataKey="price"
          stroke={colors.accent}
          strokeWidth={3}
          fillOpacity={1}
          fill="url(#colorUv)"
        />

        <CartesianGrid stroke={colors.whiteAlpha[0]} strokeDasharray="5 5" />
        <XAxis dataKey="created_at" />
        <YAxis />
        <Tooltip
          content={({ payload }) => {
            const data = payload?.[0]?.payload as CoinPriceLog;
            if (data) {
              return (
                <Box
                  bg={colors.black[0]}
                  p={space.xxxs}
                  borderRadius={radii.xxxs}
                >
                  <Text fontSize="1.2rem">Bid price: {data.price}</Text>
                  <Text fontSize="1.2rem">Time: {data.created_at}</Text>
                </Box>
              );
            }
            return null;
          }}
        />
      </AreaChart>
    </ResponsiveContainer>
  );
}
