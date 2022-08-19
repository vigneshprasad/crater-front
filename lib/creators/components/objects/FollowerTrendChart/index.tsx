import { useMemo } from "react";
import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  XAxis,
  YAxis,
} from "recharts";
import { useTheme } from "styled-components";

import { Box, Text } from "@/common/components/atoms";
import { ClubMembersGrowth } from "@/creators/types/creator";

interface IProps {
  clubMembersGrowth: ClubMembersGrowth[];
}

const SAMPLE_DATA: ClubMembersGrowth[] = [
  { key: "Jan 2022", value: 0 },
  { key: "Feb 2022", value: 8 },
  { key: "March 2022", value: 17 },
  { key: "April 2022", value: 23 },
  { key: "May 2022", value: 40 },
];

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const CustomizedAxisTick = (props: any): JSX.Element => {
  const { x, y, fill, fillSecondary, payload } = props;
  const values = payload.value.split(" ");

  return (
    <g transform={`translate(${x},${y})`}>
      <text
        x={0}
        y={0}
        textAnchor="middle"
        fontSize="1.2rem"
        fontWeight={600}
        fill={fill}
      >
        {values[0]}
      </text>
      <text
        x={0}
        y={0}
        dy={18}
        textAnchor="middle"
        fontSize="1.2rem"
        fontWeight={600}
        fill={fillSecondary}
      >
        {values[1]}
      </text>
    </g>
  );
};

export default function FollowerTrendChart({
  clubMembersGrowth,
}: IProps): JSX.Element {
  const { space, colors } = useTheme();

  const data = useMemo(() => {
    // Filter all values
    const values = clubMembersGrowth.map((obj) => obj.value);

    if (values.every((value) => value === 0)) {
      return null;
    }

    return clubMembersGrowth;
  }, [clubMembersGrowth]);

  return (
    <Box position="relative">
      {!data && (
        <Text
          textStyle="menu"
          position="absolute"
          top="34%"
          left="40%"
          zIndex={1}
        >
          No data to show yet
        </Text>
      )}
      <ResponsiveContainer aspect={16 / 9}>
        <LineChart
          width={100}
          height={300}
          data={data ?? SAMPLE_DATA}
          margin={{
            top: 24,
            right: 30,
            left: -12,
            bottom: 30,
          }}
        >
          <CartesianGrid vertical={false} stroke={colors.secondaryLight} />
          <XAxis
            dataKey="key"
            tickLine={false}
            stroke={colors.secondaryLight}
            tickMargin={space.xxs}
            padding={{ left: 20 }}
            tick={
              <CustomizedAxisTick
                fill={data ? colors.textPrimary : colors.secondaryLight}
                fillSecondary={
                  data ? colors.textQuartenary : colors.secondaryLight
                }
              />
            }
          />
          <YAxis
            dataKey="value"
            allowDecimals={false}
            tickLine={false}
            stroke={colors.secondaryLight}
            tickMargin={space.xxxxs}
            tickCount={7}
            tick={{
              fontSize: "1.2rem",
              fontWeight: 600,
              fill: data ? colors.textPrimary : colors.secondaryLight,
            }}
          />
          <Line
            type="linear"
            dataKey="value"
            stroke={data ? "#F2B25C" : colors.primaryLight}
            strokeWidth={2}
            dot={{
              strokeWidth: 4,
              fill: data ? "#F2B25C" : colors.primaryLight,
            }}
          />
        </LineChart>
      </ResponsiveContainer>
    </Box>
  );
}
