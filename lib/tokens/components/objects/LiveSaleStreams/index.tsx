import { useTheme } from "styled-components";

import { Avatar, Box, Flex, Text } from "@/common/components/atoms";
import { Button } from "@/common/components/atoms/v2";
import HorizontalScroll from "@/common/components/objects/HorizontalScroll/v2";

export default function LiveSaleStreams(): JSX.Element {
  const { space, colors, radii } = useTheme();

  return (
    <HorizontalScroll
      title="Streams with live sales ⏳"
      px={space.m}
      maxWidth="100%"
      gridAutoFlow="column"
      gridAutoColumns="235px"
      gridGap={space.xs}
      overflowX="scroll"
    >
      {Array(10)
        .fill("")
        .map((_, index) => (
          <Box
            p={space.xxs}
            bg={colors.primaryDark}
            borderRadius={radii.xs}
            key={index}
          >
            <Flex gridGap={space.xs}>
              <Avatar size={56} />
              <Box>
                <Text fontWeight={600}>Sanjeev Raichur</Text>
                <Button
                  mt={space.xxs}
                  w={127}
                  h={40}
                  variant="gradient-border-flat"
                  label="Follow"
                  bg={colors.primaryBackground}
                  textProps={{
                    fontSize: "1.4rem",
                    fontWeight: 600,
                  }}
                />
              </Box>
            </Flex>
          </Box>
        ))}
    </HorizontalScroll>
  );
}
