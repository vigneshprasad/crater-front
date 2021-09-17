import { useTheme } from "styled-components";

import Image from "next/image";

import { Avatar, Box, Grid, Link, Text } from "@/common/components/atoms";
import colors from "@/common/theme/colors";
import { Webinar } from "@/creators/types/community";

interface IProps {
  stream: Webinar;
}

export default function StreamCard({ stream }: IProps): JSX.Element {
  const { space, radii } = useTheme();
  return (
    <Link key={stream.id} href={`/session/${stream.id}`}>
      <Grid gridGap={space.xs}>
        <Box
          h={180}
          position="relative"
          borderRadius={radii.xxs}
          overflow="hidden"
        >
          {stream.topic_detail?.image && (
            <Image
              objectFit="cover"
              layout="fill"
              src={stream.topic_detail?.image}
              alt={stream.topic_detail.name}
            />
          )}
        </Box>
        <Grid
          gridTemplateColumns="min-content 1fr"
          gridGap={space.xxs}
          alignItems="center"
        >
          <Avatar
            size={56}
            alt={stream.host_detail?.name || ""}
            image={stream.host_detail?.photo}
          />
          <Box>
            <Text>{stream.topic_detail?.name}</Text>
            <Text color={colors.slate} textStyle="caption">
              {stream.host_detail?.name}
            </Text>
          </Box>
        </Grid>
      </Grid>
    </Link>
  );
}
