import { Box, Grid } from "@/common/components/atoms";
import { UserReward } from "@/tokens/types/exchange";

interface IProps {
  userRewards?: UserReward[];
  renderList: (userReward: UserReward[]) => JSX.Element[];
}

export default function UserRewardList({
  userRewards,
  renderList,
}: IProps): JSX.Element {
  return (
    <Box overflowY="auto" maxHeight={320}>
      {userRewards && (
        <Grid gridTemplateColumns="repeat(auto-fill, minmax(280px, 1fr))">
          {renderList(userRewards)}
        </Grid>
      )}
    </Box>
  );
}
