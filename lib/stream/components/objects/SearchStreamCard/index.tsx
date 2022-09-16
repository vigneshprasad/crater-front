import { useTheme } from "styled-components";

import Image from "next/image";

import { Avatar, Box, Flex, Grid, Link, Text } from "@/common/components/atoms";
import useMediaQuery from "@/common/hooks/ui/useMediaQuery";
import { StreamListItem } from "@/community/types/community";

type IProps = {
  stream: StreamListItem;
  link: string;
};

export default function SearchStreamCard({
  stream,
  link,
}: IProps): JSX.Element | null {
  const { space, colors, breakpoints, radii } = useTheme();
  const { matches: isMobile } = useMediaQuery(`(max-width: ${breakpoints[0]})`);

  if (isMobile === undefined) return null;

  return (
    <Box mb={10} pb={10} borderBottom={`1px solid ${colors.primaryLight}`}>
      <Link href={link}>
        {isMobile ? (
          <Grid gridGap={space.xxxxs} gridTemplateColumns="1fr 2fr">
            <Box
              w={125}
              h={70}
              position="relative"
              pt="56.25%"
              borderRadius={radii.xxxxs}
              overflow="hidden"
            >
              <Image
                src={stream.topic_detail.image}
                layout="fill"
                alt={stream.topic_detail.name}
              />
            </Box>
            <Box>
              <Text textStyle="body" maxLines={2}>
                {stream.topic_detail.name}
              </Text>
              <Flex alignItems="center" gridGap={space.xxxxs}>
                <Avatar size={16} image={stream.host_detail.photo} />
                <Text fontSize="1rem">{stream.host_detail.name}</Text>
              </Flex>
            </Box>
          </Grid>
        ) : (
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
        )}
      </Link>
    </Box>
  );
}
