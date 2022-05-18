import { forwardRef } from "react";
import { useTheme } from "styled-components";

import Image from "next/image";

import { Box, Flex, Link, Avatar, Text, Icon } from "@/common/components/atoms";
import { Button } from "@/common/components/atoms/v2";
import { PageRoutes } from "@/common/constants/route.constants";
import DateTime from "@/common/utils/datetime/DateTime";
import { Webinar } from "@/community/types/community";

import { Overlay, Container } from "./styles";

interface IProps {
  stream: Webinar;
}

const PastStreamCard = forwardRef<HTMLDivElement, IProps>(({ stream }, ref) => {
  const { space, radii, colors } = useTheme();
  const creatorSlug = stream.host_detail.slug;
  const startTime = DateTime.parse(stream.start).toFormat(
    DateTime.DEFAULT_FORMAT
  );
  return (
    <Container flexDirection="column" gridGap={space.xxs} ref={ref}>
      <Box
        position="relative"
        pt="56.25%"
        overflow="hidden"
        borderRadius={radii.xxs}
      >
        <Image
          objectFit="cover"
          src={stream.topic_detail.image}
          layout="fill"
          alt={stream.topic_detail.name}
        />
        <Overlay borderRadius={radii.xxs}>
          <Button m="auto auto" label="Watch" />
        </Overlay>
      </Box>

      <Flex alignItems="center" gridGap={space.xxxs}>
        {creatorSlug && (
          <Link href={PageRoutes.creatorProfile(creatorSlug)}>
            <Avatar
              size={28}
              alt={stream.host_detail?.name || ""}
              image={stream.host_detail?.photo}
            />
          </Link>
        )}

        <Text textStyle="body">{stream.host_detail?.name}</Text>
      </Flex>

      <Text maxLines={3}>{stream.topic_detail?.name}</Text>

      <Flex
        color={colors.textSecondary}
        alignItems="center"
        gridGap={space.xxxs}
      >
        <Icon size={16} color="inherit" icon="Calendar" />
        <Text textStyle="body" color="inherit">
          {startTime}
        </Text>
      </Flex>
    </Container>
  );
});

PastStreamCard.displayName = "PastStreamCard";

export default PastStreamCard;
