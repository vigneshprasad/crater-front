import { useTheme } from "styled-components";

import { Avatar, Box, Flex, Text } from "@/common/components/atoms";
import { UserReward } from "@/tokens/types/exchange";

type IProps = {
  userReward: UserReward;
};

export default function UserRewardItem({ userReward }: IProps): JSX.Element {
  const { space, gradients, colors, radii } = useTheme();
  const { reward_detail, quantity } = userReward;
  return (
    <Box
      px={space.xxs}
      py={space.xxs}
      background={gradients.primary}
      borderRadius={radii.xxs}
    >
      <Flex alignItems="center" justifyContent="space-between">
        <Box>
          <Text fontSize="1.6rem" fontWeight="800">
            {reward_detail.name}
          </Text>

          <Flex mt={space.xxs} gridGap={space.xxxs}>
            <Avatar
              size={24}
              image={reward_detail.creator_detail.profile_detail.photo}
            />
            <Text>{reward_detail.creator_detail.profile_detail.name}</Text>
          </Flex>
        </Box>

        <Text
          px={12}
          py={2}
          fontSize="1.2rem"
          bg={colors.blackAlpha[1]}
          borderRadius={18}
        >
          {quantity}
        </Text>
      </Flex>
    </Box>
  );
}
