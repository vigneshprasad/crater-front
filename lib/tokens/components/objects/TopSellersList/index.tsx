import styled, { useTheme } from "styled-components";

import useAuth from "@/auth/context/AuthContext";
import { Box, Grid, Shimmer, Text } from "@/common/components/atoms";
import HorizontalScroll from "@/common/components/objects/HorizontalScroll/v2";
import useMediaQuery from "@/common/hooks/ui/useMediaQuery";
import { Seller } from "@/tokens/types/store";

import TopSellerCard from "../TopSellerCard";

const GradientBox = styled(Box)`
  filter: blur(116px);
  -webkit-filter: blur(116px);
`;

type IProps = {
  sellers?: Seller[];
  loading: boolean;
  followingCreator: number | null;
  onFollow: (creator: number) => void;
};

export default function TopSellersList({
  sellers,
  loading,
  followingCreator,
  onFollow,
}: IProps): JSX.Element | null {
  const { space, radii, breakpoints } = useTheme();
  const { user } = useAuth();
  const { matches: isMobile } = useMediaQuery(`(max-width: ${breakpoints[0]})`);

  if (isMobile === undefined) return null;

  return (
    <Box position="relative">
      <GradientBox
        w="85%"
        h="100%"
        position="absolute"
        left="10%"
        top="15%"
        bg="#882EE8"
        opacity={0.16}
        zIndex={-1}
      />

      {!isMobile ? (
        <HorizontalScroll
          title="Top Creators 💯"
          px={space.l}
          maxWidth="100%"
          gridAutoFlow="column"
          gridAutoColumns="235px"
          gridGap={space.xs}
          overflowX="scroll"
          titleProps={{ px: space.l }}
        >
          {loading || !sellers
            ? Array(4)
                .fill("")
                .map((_, index) => (
                  <Shimmer
                    w={235}
                    h={112}
                    borderRadius={radii.xs}
                    key={index}
                  />
                ))
            : sellers.map((seller) => {
                if (user?.pk !== seller.user) {
                  const followLoading = seller.id === followingCreator;

                  return (
                    <TopSellerCard
                      key={seller.id}
                      seller={seller}
                      loading={followLoading}
                      onFollow={onFollow}
                    />
                  );
                }
              })}
        </HorizontalScroll>
      ) : (
        <Box px={space.xs}>
          <Text pb={space.xxxs} textStyle="headline5" fontWeight={600}>
            Top Creators 💯
          </Text>
          <Grid
            gridTemplateColumns="repeat(2, 1fr)"
            gridColumnGap={space.xxxs}
            gridRowGap={space.xs}
          >
            {loading || !sellers
              ? Array(4)
                  .fill("")
                  .map((_, index) => (
                    <Shimmer
                      w={235}
                      h={112}
                      borderRadius={radii.xs}
                      key={index}
                    />
                  ))
              : sellers.map((seller) => {
                  if (user?.pk !== seller.user) {
                    const followLoading = seller.id === followingCreator;

                    return (
                      <TopSellerCard
                        key={seller.id}
                        seller={seller}
                        loading={followLoading}
                        onFollow={onFollow}
                      />
                    );
                  }
                })}
          </Grid>
        </Box>
      )}
    </Box>
  );
}
