import styled, { useTheme } from "styled-components";

import { useRouter } from "next/router";

import { Box, Grid, Shimmer, Text } from "@/common/components/atoms";
import useRewardSaleItemsList from "@/tokens/context/RewardSaleItemsListContext";

import SaleItemCard from "../SaleItemCard";

const StyledGrid = styled(Grid)`
  .large {
    grid-row: auto / span 2;
  }
`;

export default function MoreSaleItems(): JSX.Element {
  const { space, radii } = useTheme();
  const router = useRouter();
  const { saleItems, loading } = useRewardSaleItemsList();

  const openSaleItem = (saleItemId: number): void => {
    router.query.sale = `${saleItemId}`;
    router.push(router, undefined, { shallow: true });
  };

  return (
    <Box>
      <Text pb={space.xxs} textStyle="headline5" fontWeight={600}>
        More Items on Sale 👀
      </Text>

      {(() => {
        if (loading || !saleItems) {
          return <Shimmer w="100%" h={450} borderRadius={radii.xxxxs} />;
        }

        return (
          <StyledGrid
            gridAutoFlow="row dense"
            gridTemplateColumns="repeat(auto-fill, 278px)"
            gridGap={space.xs}
          >
            {saleItems?.map((saleItem) => (
              <Box
                key={saleItem.id}
                className={saleItem.photo ? "large" : undefined}
              >
                <SaleItemCard saleItem={saleItem} onClick={openSaleItem} />
              </Box>
            ))}
          </StyledGrid>
        );
      })()}
    </Box>
  );
}
