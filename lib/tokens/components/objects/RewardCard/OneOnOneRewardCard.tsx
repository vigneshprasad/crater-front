import { useTheme } from "styled-components";

import Image from "next/image";

import { Box, Flex, Text, Icon } from "@/common/components/atoms";
import { Reward } from "@/tokens/types/token";

import { Card, Container } from "./common";

interface IProps {
  reward: Reward;
}

export default function OneOnOneRewardCard({ ...props }: IProps): JSX.Element {
  const { reward } = props;

  const { space, colors, radii } = useTheme();
  return (
    <Container {...props}>
      <Card
        py={space.xs}
        px={space.xxs}
        gridTemplateColumns="160px 1fr"
        gridGap={space.xs}
      >
        <Flex
          flexDirection="column"
          gridGap={4}
          alignItems="start"
          justifyContent="space-between"
        >
          <Icon opacity={0.8} icon="Logo" h="auto" w={96} />

          <Box>
            <Text mb={space.xxxxs} fontSize="1rem" textTransform="uppercase">
              Redeem For
            </Text>

            <Text
              fontWeight="600"
              mb={space.xxs}
              fontSize="2rem"
              textTransform="uppercase"
            >
              {reward.name}
            </Text>
          </Box>

          <Box
            bg={colors.whiteAlpha[1]}
            p={space.xxxxs}
            borderRadius={radii.xxs}
          >
            <Text fontWeight="600" fontSize="1.6rem">
              {reward.quantity_sold} / {reward.quantity}
            </Text>
          </Box>
        </Flex>

        <Box position="relative">
          {reward.photo && (
            <Image
              src={reward.photo}
              objectFit="contain"
              layout="fill"
              objectPosition="center"
              alt=""
            />
          )}
        </Box>
      </Card>
    </Container>
  );
}
