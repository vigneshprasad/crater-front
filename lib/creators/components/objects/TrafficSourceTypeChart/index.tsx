import { useState } from "react";
import { Cell, Pie, PieChart, ResponsiveContainer, Sector } from "recharts";

import colors from "@/common/theme/colors";
import { TrafficSourceType } from "@/creators/types/creator";

interface IProps {
  trafficSourceTypes: TrafficSourceType[];
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const renderActiveShape = (props: any): JSX.Element => {
  const {
    cx,
    cy,
    innerRadius,
    outerRadius,
    startAngle,
    endAngle,
    fill,
    percent,
    value,
    payload,
  } = props;

  const valueColor =
    payload.source_name !== null ? colors.textPrimary : colors.secondaryLight;
  const percentageColor =
    payload.source_name !== null ? colors.textTertiary : colors.secondaryLight;
  const strokeWidth = payload.source_name !== null ? 2 : 0;

  return (
    <g>
      <text
        x={cx}
        y={cy}
        dy={0}
        textAnchor="middle"
        fill={valueColor}
        fontSize="2.0rem"
        fontWeight={600}
      >
        {payload.source_name !== null ? value : 0}
      </text>
      <text
        x={cx}
        y={cy}
        dy={22}
        textAnchor="middle"
        fill={percentageColor}
        fontSize="1.2rem"
        fontWeight={600}
      >
        {payload.source_name !== null ? percent * 100 : 0}%
      </text>
      <Sector
        cx={cx}
        cy={cy}
        innerRadius={innerRadius}
        outerRadius={outerRadius}
        startAngle={startAngle}
        endAngle={endAngle}
        fill={fill}
        stroke={colors.white[0]}
        strokeWidth={strokeWidth}
      />
    </g>
  );
};

export default function TrafficSourceTypeChart({
  trafficSourceTypes,
}: IProps): JSX.Element {
  const [activeIndex, setActiveIndex] = useState(0);

  const onPieEnter = (_: unknown, index: number): void => {
    setActiveIndex(index);
  };

  return (
    <ResponsiveContainer height={300} width={300}>
      <PieChart>
        {trafficSourceTypes.length > 0 ? (
          <Pie
            activeIndex={activeIndex}
            activeShape={renderActiveShape}
            data={trafficSourceTypes}
            cx="50%"
            cy="50%"
            innerRadius={95}
            outerRadius={110}
            fill={colors.accentLight}
            dataKey="count"
            onClick={onPieEnter}
            cursor="pointer"
            stroke="none"
            paddingAngle={3}
          >
            {trafficSourceTypes.map((obj, index) => (
              <Cell key={`cell-${index}`} fill={obj.color} />
            ))}
          </Pie>
        ) : (
          <Pie
            activeIndex={activeIndex}
            activeShape={renderActiveShape}
            data={[
              { source_name: null, count: 100, color: colors.secondaryLight },
            ]}
            cx="50%"
            cy="50%"
            innerRadius={95}
            outerRadius={110}
            fill={colors.secondaryLight}
            dataKey="count"
            onClick={onPieEnter}
            cursor="pointer"
            stroke="none"
          />
        )}
      </PieChart>
    </ResponsiveContainer>
  );
}
