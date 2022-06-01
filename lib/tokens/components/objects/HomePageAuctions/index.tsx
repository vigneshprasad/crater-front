import { useTheme } from "styled-components";

import {
  Box,
  Flex,
  Grid,
  Shimmer,
  Span,
  Text,
} from "@/common/components/atoms";
import useAuctionsList from "@/tokens/context/AuctionListContext";

import ActiveAuctionsTable from "../ActiveAuctionsTable";

export default function HomePageAuctions(): JSX.Element {
  const { space, colors, radii, fonts } = useTheme();
  const { auctions, loading: auctionsLoading } = useAuctionsList();

  const auctionSteps = [
    {
      title: "Place your bid",
      color: "linear-gradient(90deg, #7A36B0 0%, #3B0581 100%)",
      verticalLine: true,
    },
    {
      title: "Creator accepts your bid",
      color: "linear-gradient(90deg, #4A67B0 0%, #2448A5 100%)",
      verticalLine: true,
    },
    {
      title: "You get access to the token",
      color: "linear-gradient(90deg, #4092B6 1.19%, #026894 100%)",
      verticalLine: true,
    },
    {
      title: "If bid is denied, you get a refund",
      color: "#010101",
    },
  ];

  return (
    <Box mx={space.xxs} pt={space.l}>
      <Text
        fontFamily={fonts.heading}
        textStyle="mainHeading"
        textAlign="center"
      >
        Auctions
      </Text>
      <Text
        fontFamily={fonts.heading}
        textStyle="small"
        textAlign="center"
        maxLines={2}
      >
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
            "table"
          `,
          `
            "table actions"
          `,
        ]}
        gridGap={space.xxs}
      >
        <Box gridArea="table">
          {auctionsLoading ? (
            <Shimmer w="100%" h="100%" borderRadius={radii.xxs} />
          ) : (
            <ActiveAuctionsTable auctions={auctions} />
          )}
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
              background={color}
              borderRadius={radii.xxxxs}
              justifyContent="space-between"
              alignItems="center"
              position={["static", "relative"]}
              key={index}
            >
              <Text fontFamily={fonts.heading} textStyle="button">
                {title}
              </Text>
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
