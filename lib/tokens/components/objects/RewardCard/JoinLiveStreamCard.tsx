import Image from "next/image";

import { Box, Text, Span, Flex } from "@/common/components/atoms";

import { RewardCardProps } from ".";

export default function JoinLiveStreamCard({
  reward,
  showCount,
  ...rest
}: RewardCardProps): JSX.Element {
  return (
    <Box pt="53.80%" position="relative" overflow="hidden" {...rest}>
      <Image src={reward.photo} layout="fill" alt="" />
      <Flex
        flexDirection="column"
        position="absolute"
        top={24}
        left={32}
        bottom={42}
        w="38%"
      >
        <Text fontSize="1.6rem" lineHeight="2.rem">
          Ticket to{" "}
          <Span fontWeight="700">
            {reward.creator_detail.profile_detail.name}&apos;s
          </Span>
          Livestream
        </Text>

        <Box flex="1" />

        <Text fontWeight="600" fontSize="1.6rem">
          {showCount && showCount}
          {!showCount &&
            `${reward.quantity - reward.quantity_sold} / ${reward.quantity}`}
        </Text>
      </Flex>
    </Box>
  );
}
