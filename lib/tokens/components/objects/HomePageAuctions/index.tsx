import { useTheme } from "styled-components";

import {
  Box,
  Flex,
  Grid,
  Icon,
  Link,
  Span,
  Text,
} from "@/common/components/atoms";

import ActiveAuctionsTable from "../ActiveAuctionsTable";

export default function HomePageAuctions(): JSX.Element {
  const { space, colors, radii } = useTheme();
  const auctionSteps = [
    {
      title: "Place your bid",
      color: "#882EE8",
      verticalLine: true,
    },
    {
      title: "Creator accepts your bid",
      color: "#1F6891",
      verticalLine: true,
    },
    {
      title: "You get access to the token",
      color: "#2C9124",
      verticalLine: true,
    },
    {
      title: "If bid is denied, you get a refund",
      color: "#A14141",
    },
  ];

  return (
    <Box mx={space.xxs} pt={space.l}>
      <Text textStyle="mainHeading" textAlign="center">
        Auctions
      </Text>
      <Text textStyle="small" textAlign="center" maxLines={2}>
        Get access to{" "}
        <Span color={colors.accentLight}>exclusive content by Creators.</Span>{" "}
        Think of it like eBay, but for content and communities.
      </Text>

      <Grid
        pt={space.xs}
        gridTemplateColumns={["1fr", "3fr 1fr"]}
        gridTemplateAreas={[
          `
            "actions"
            "heading"
            "table"
          `,
          `
            "heading heading"
            "table actions"
          `,
        ]}
        gridGap={space.xxs}
      >
        <Text
          color="#C4C4C4"
          fontSize="1.4rem"
          fontWeight={700}
          lineHeight="1.7rem"
          textTransform="uppercase"
          gridArea="heading"
        >
          Active Auctions
        </Text>

        <Link href="#" boxProps={{ gridArea: "heading" }}>
          <Flex alignItems="center" justifyContent="end">
            <Text textStyle="small">View All</Text>
            <Icon icon="ChevronRight" size={14} />
          </Flex>
        </Link>

        <Box gridArea="table">
          <ActiveAuctionsTable />
        </Box>

        <Flex
          flexDirection={["row", "column"]}
          gridGap={space.xxs}
          gridArea="actions"
        >
          {auctionSteps.map(({ title, color, verticalLine }, index) => (
            <Flex
              w={[250, 336]}
              height={[40, 60]}
              p={["0.4em 0.8em", "1em 1.2em"]}
              bg={color}
              borderRadius={radii.xxxxs}
              justifyContent="space-between"
              alignItems="center"
              position={["static", "relative"]}
              key={index}
            >
              <Text textStyle="button">{title}</Text>
              <Box
                w={[0, 20]}
                h={[0, 20]}
                border="2px solid #EDEDED"
                borderRadius="50%"
                visibility={["hidden", "visible"]}
              />

              {verticalLine && (
                <Box
                  w={57}
                  border="1px solid rgba(255, 255, 255, 0.24)"
                  transform="rotate(90deg)"
                  position="absolute"
                  left={286}
                  top={66}
                  zIndex={1}
                  visibility={["hidden", "visible"]}
                />
              )}
            </Flex>
          ))}
        </Flex>
      </Grid>
    </Box>
  );
}
