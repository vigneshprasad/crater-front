import { useTheme } from "styled-components";

import { Avatar, Box, Grid, Spinner, Text } from "@/common/components/atoms";
import { Button } from "@/common/components/atoms/v2";
import { Seller } from "@/tokens/types/store";

type IProps = {
  seller: Seller;
  loading: boolean;
  onFollow: (id: number) => void;
};

export default function TopSellerCard({
  seller,
  loading,
  onFollow,
}: IProps): JSX.Element {
  const { space, colors, radii } = useTheme();

  return (
    <Box>
      <Grid
        p={[`${space.xxxs}px ${space.xxxxs}px ${space.xxxxs}px`, space.xxs]}
        gridAutoFlow="row"
        gridTemplateRows="1fr max-content"
        gridGap={[space.xxs, space.xxxxs]}
        bg={colors.primaryDark}
        borderRadius={radii.xs}
      >
        <Grid
          gridTemplateColumns={["1fr", "max-content 1fr"]}
          gridGap={space.xs}
          justifyItems={["center", "start"]}
        >
          <Avatar
            size={[80, 56]}
            image={seller.profile_detail.photo ?? undefined}
          />
          <Text fontWeight={600} display={["none", "block"]}>
            {seller.profile_detail.name}
          </Text>
        </Grid>
        <Button
          w={127}
          h={[36, 40]}
          variant="gradient-border-flat"
          justifySelf={["center", "end"]}
          label={seller.is_subscriber ? "Followed" : "Follow"}
          bg={colors.primaryBackground}
          textProps={{
            fontSize: "1.4rem",
            fontWeight: 600,
          }}
          disabled={loading || seller.is_subscriber ? true : false}
          suffixElement={loading && <Spinner size={24} />}
          onClick={() => onFollow(seller.id)}
        />
      </Grid>
      <Text pt={space.xxxxxs} fontWeight={600} display={["block", "none"]}>
        {seller.profile_detail.name}
      </Text>
    </Box>
  );
}
