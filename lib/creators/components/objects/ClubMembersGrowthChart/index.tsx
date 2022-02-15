import {
  CartesianGrid,
  Line,
  LineChart,
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

export default function ClubMembersGrowthChart({
  clubMembersGrowth,
}: IProps): JSX.Element {
  const { colors } = useTheme();

  if (!clubMembersGrowth) {
    return <Shimmer w="100%" h="100%" />;
  }

  return (
    <ResponsiveContainer width="100%" height="100%">
      <LineChart data={clubMembersGrowth}>
        <Line type="monotone" dataKey="follower_count" stroke="#8884d8" />
        <CartesianGrid stroke={colors.black[1]} vertical={false} />
        <XAxis dataKey="followed_at_date" interval="preserveStartEnd" />
        <YAxis orientation="right" allowDecimals={false} />
      </LineChart>
    </ResponsiveContainer>
  );
}
