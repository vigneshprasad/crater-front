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

import { Box, Shimmer, Text } from "@/common/components/atoms";
import { StreamCategoryDistribution } from "@/creators/types/stream";

type IProps = {
  streamCategoryDistribution?: StreamCategoryDistribution[];
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const CustomizedAxisTick = (props: any): JSX.Element => {
  const { x, y, payload } = props;

  return (
    <g transform={`translate(${x},${y})`}>
      <text
        x={0}
        y={0}
        dy={4}
        fontSize="1.4rem"
        fontWeight={600}
        textAnchor="end"
        fill="#fff"
      >
        {payload.value}
      </text>
    </g>
  );
};

export default function StreamCategoryDistributionBox({
  streamCategoryDistribution,
}: IProps): JSX.Element {
  const { space, colors, radii } = useTheme();

  return (
    <Box bg={colors.primaryDark} borderRadius={radii.xxxxs}>
      <Text
        p={`${space.xs}px 24px ${space.xs}px ${space.xxs}px`}
        textStyle="label"
        color={colors.accentLight}
        bg={colors.primaryLight}
        textTransform="uppercase"
        borderRadius={`${radii.xxxxs}px ${radii.xxxxs}px 0px 0px`}
      >
        Stream Category Distribution
      </Text>

      {!streamCategoryDistribution ? (
        <Shimmer w="100%" h={550} />
      ) : (
        <ResponsiveContainer aspect={16 / 9}>
          <BarChart
            layout="vertical"
            width={500}
            height={300}
            data={streamCategoryDistribution}
            margin={{
              top: 12,
              right: 52,
              left: 100,
              bottom: 52,
            }}
          >
            <CartesianGrid horizontal={false} stroke={colors.secondaryLight} />
            <XAxis
              dataKey="value"
              type="number"
              unit="%"
              domain={[0, 100]}
              tickCount={11}
              tickLine={false}
              interval="preserveEnd"
              stroke={colors.secondaryLight}
              tick={{
                fontSize: "1.0rem",
                fontWeight: 600,
                fill: colors.textPrimary,
                dy: 8,
              }}
            />
            <YAxis
              dataKey="name"
              type="category"
              scale="band"
              stroke={colors.secondaryLight}
              tickLine={false}
              tick={<CustomizedAxisTick />}
              tickMargin={space.xxxs}
            />
            <Bar
              dataKey="value"
              fill="#6A85F6"
              barSize={20}
              label={{
                formatter: (value: number) => `${value}%`,
                position: "right",
                fill: colors.textPrimary,
                fontSize: "1.2rem",
                fontWeight: 600,
                dx: 8,
              }}
            >
              {streamCategoryDistribution.map((obj) => (
                <Cell key={`cell-${obj.id}`} fill="#6A85F6" />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      )}
    </Box>
  );
}
