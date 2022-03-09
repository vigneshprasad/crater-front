import { curveCardinal } from "d3-shape";
import { AnyObject } from "immer/dist/internal";
import {
  Area,
  AreaChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  XAxis,
  YAxis,
} from "recharts";
import { useTheme } from "styled-components";

import { Shimmer } from "@/common/components/atoms";
import { ClubMembersGrowth } from "@/creators/types/creator";

interface IProps {
  clubMembersGrowth?: ClubMembersGrowth[];
}

const cardinal = curveCardinal.tension(1);

const renderColorfulLegendText = (entry: AnyObject): JSX.Element => {
  const { color } = entry;

  return <span style={{ color, fontSize: "1.3rem" }}>Number of Followers</span>;
};

export default function ClubMembersGrowthChart({
  clubMembersGrowth,
}: IProps): JSX.Element {
  const { colors } = useTheme();

  if (!clubMembersGrowth) {
    return <Shimmer w="100%" h="100%" />;
  }

  return (
    <ResponsiveContainer width="100%" height="100%">
      <AreaChart data={clubMembersGrowth}>
        <CartesianGrid stroke={colors.black[3]} strokeDasharray="3 3" />
        <XAxis dataKey="rsvp_at" interval="preserveStartEnd" />
        <YAxis orientation="right" allowDecimals={false} />
        <Legend formatter={renderColorfulLegendText} verticalAlign="top" />
        <Area
          type={cardinal}
          dot={{ stroke: colors.white[0], strokeWidth: 1 }}
          dataKey="rsvp_count"
          stroke="#8884d8"
          fill="#8884d8"
        />
      </AreaChart>
    </ResponsiveContainer>
  );
}
