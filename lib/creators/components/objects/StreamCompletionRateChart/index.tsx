import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  ResponsiveContainer,
  XAxis,
  YAxis,
} from "recharts";
import { useTheme } from "styled-components";

import { Box, Text } from "@/common/components/atoms";
import { StreamCompletionRate } from "@/creators/types/creator";

const SAMPLE_DATA: StreamCompletionRate[] = [
  { key: "10/04/22", value: 20 },
  { key: "22/04/22", value: 28 },
  { key: "05/05/22", value: 40 },
  { key: "28/05/22", value: 35 },
  { key: "21/06/22", value: 57 },
];

export default function StreamCompletionRateChart(): JSX.Element {
  const { space, colors } = useTheme();

  return (
    <Box position="relative">
      <Text
        textStyle="menu"
        position="absolute"
        top="34%"
        left="40%"
        zIndex={1}
      >
        No data to show yet
      </Text>
      <ResponsiveContainer aspect={16 / 9}>
        <BarChart
          data={SAMPLE_DATA}
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
            tickMargin={space.xxxxxs}
            padding={{ left: -20 }}
            tick={{
              fontSize: "1.2rem",
              fontWeight: 600,
              fill: colors.secondaryLight,
            }}
            label={{
              value: "Streamed On",
              position: "bottom",
              fill: colors.secondaryLight,
              fontSize: "1.4rem",
              fontWeight: 600,
              textAnchor: "middle",
            }}
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
              fill: colors.secondaryLight,
            }}
          />
          <Bar
            dataKey="value"
            barSize={8}
            fill={colors.primaryLight}
            label={{
              formatter: (value: number) => `${value}`,
              position: "top",
              fill: colors.secondaryLight,
              fontSize: "1.2rem",
              fontWeight: 600,
              textAnchor: "middle",
            }}
          >
            {SAMPLE_DATA.map((obj, index) => (
              <Cell key={`cell-${index}`} fill={colors.primaryLight} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </Box>
  );
}
