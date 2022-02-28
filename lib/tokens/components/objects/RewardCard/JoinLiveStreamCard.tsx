import Image from "next/image";

import { Box, Text, Span, Flex } from "@/common/components/atoms";
import { Reward } from "@/tokens/types/token";

interface IProps {
  reward: Reward;
}

export default function JoinLiveStreamCard({ reward }: IProps): JSX.Element {
  return (
    <Box pt="53.80%" position="relative" overflow="hidden">
      <Image src={reward.photo} layout="fill" alt="" />
      <Flex
        flexDirection="column"
        position="absolute"
        top={24}
        left={32}
        bottom={42}
        w="38%"
      >
        <Text fontSize="2rem" lineHeight="2.8rem">
          Ticket to{" "}
          <Span>{reward.creator_detail.profile_detail.name}&apos;s</Span>
          Livestream
        </Text>

        <Box flex="1" />

        <Text fontWeight="600" fontSize="1.6rem">
          {reward.quantity_sold} / {reward.quantity}
        </Text>
      </Flex>
    </Box>
  );
}
