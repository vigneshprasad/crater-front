import styled, { useTheme } from "styled-components";

import useAuth from "@/auth/context/AuthContext";
import {
  Avatar,
  Box,
  Grid,
  Shimmer,
  Spinner,
  Text,
} from "@/common/components/atoms";
import { Button } from "@/common/components/atoms/v2";
import HorizontalScroll from "@/common/components/objects/HorizontalScroll/v2";
import { Seller } from "@/tokens/types/store";

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
}: IProps): JSX.Element {
  const { space, colors, radii } = useTheme();
  const { user } = useAuth();

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
                <Shimmer w={235} h={112} borderRadius={radii.xs} key={index} />
              ))
          : sellers.map((seller) => {
              if (user?.pk !== seller.user) {
                const followLoading = seller.id === followingCreator;

                return (
                  <Grid
                    p={space.xxs}
                    gridAutoFlow="row"
                    gridTemplateRows="1fr max-content"
                    gridGap={space.xxxxs}
                    bg={colors.primaryDark}
                    borderRadius={radii.xs}
                    key={seller.id}
                  >
                    <Grid
                      gridTemplateColumns="max-content 1fr"
                      gridGap={space.xs}
                    >
                      <Avatar
                        size={56}
                        image={seller.profile_detail.photo ?? undefined}
                      />
                      <Text fontWeight={600}>{seller.profile_detail.name}</Text>
                    </Grid>
                    <Button
                      w={127}
                      h={40}
                      variant="gradient-border-flat"
                      justifySelf="end"
                      label={seller.is_subscriber ? "Followed" : "Follow"}
                      bg={colors.primaryBackground}
                      textProps={{
                        fontSize: "1.4rem",
                        fontWeight: 600,
                      }}
                      disabled={
                        followLoading || seller.is_subscriber ? true : false
                      }
                      suffixElement={followLoading && <Spinner size={24} />}
                      onClick={() => onFollow(seller.id)}
                    />
                  </Grid>
                );
              }
            })}
      </HorizontalScroll>
    </Box>
  );
}
