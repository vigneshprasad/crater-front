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
      title: "You get access to the item",
      color: "linear-gradient(90deg, #4092B6 1.19%, #026894 100%)",
      verticalLine: true,
    },
    {
      title: "If bid is denied, you get a refund",
      color: "#010101",
      border: "1px solid #F30808",
    },
  ];

  return (
    <Box px={space.xxs} pt={space.l}>
      <Text
        fontFamily={fonts.heading}
        textStyle="mainHeading"
        textAlign="center"
      >
        Live Auctions
      </Text>
      <Text textStyle="body" textAlign="center" maxLines={2}>
        Place a bid &amp; buy{" "}
        <Span color={colors.accentLight}>access to exclusive content</Span>{" "}
        communities &amp; art by creators.
      </Text>

      <Grid
        pt={space.xs}
        gridTemplateColumns={["1fr", "3fr minmax(max-content, 1fr)"]}
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

        <Grid
          overflowY="hidden"
          overflowX={["auto", "hidden"]}
          gridAutoFlow={["column", "row"]}
          gridAutoColumns="max-content"
          gridGap={space.xxs}
          gridArea="actions"
        >
          {auctionSteps.map(({ title, color, verticalLine, border }, index) => (
            <Flex
              height={[40, 60]}
              p={["0.4em 0.8em", "1em 1.2em"]}
              background={color}
              borderRadius={radii.xxxxs}
              justifyContent={["start", "space-between"]}
              alignItems="center"
              position={["static", "relative"]}
              key={index}
              border={border}
              gridGap={space.xxxs}
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
                  right={-6}
                  top={66}
                  zIndex={1}
                  visibility={["hidden", "visible"]}
                />
              )}
            </Flex>
          ))}
        </Grid>
      </Grid>
    </Box>
  );
}
