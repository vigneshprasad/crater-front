import { useTheme } from "styled-components";

import Image from "next/image";

import { Box, Flex, Link, Text } from "@/common/components/atoms";
import { StreamListItem } from "@/community/types/community";

type IProps = {
  stream: StreamListItem;
  link: string;
};

export default function SearchStreamCard({
  stream,
  link,
}: IProps): JSX.Element {
  const { space, colors } = useTheme();

  return (
    <Box mb={10} pb={10} borderBottom={`1px solid ${colors.primaryLight}`}>
      <Link href={link}>
        <Flex flexDirection="row" alignItems="center" gridGap={space.xxxxs}>
          <Box w={75} h={42} position="relative">
            <Image
              src={stream.topic_detail.image}
              alt={stream.topic_detail.name}
              layout="fill"
              objectFit="cover"
            />
          </Box>
          <Text textStyle="captionLarge">{stream.topic_detail.name}</Text>
        </Flex>
      </Link>
    </Box>
  );
}
