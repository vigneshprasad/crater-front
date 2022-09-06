import styled, { useTheme } from "styled-components";

import { useRouter } from "next/router";

import useRewardSalesList from "@/auction/context/RewardSalesListContext";
import { Box, Grid, Shimmer, Text } from "@/common/components/atoms";

import StoreSaleCard from "../StoreSaleCard";

const StyledGrid = styled(Grid)`
  .large {
    grid-row: auto / span 2;
  }
`;

export default function MoreSaleItems(): JSX.Element {
  const { space, radii } = useTheme();
  const router = useRouter();
  const { sales, isValidating } = useRewardSalesList();

  const openSale = (saleId: number): void => {
    router.query.sale = `${saleId}`;
    router.push(router, undefined, { shallow: true });
  };

  return (
    <Box>
      <Text pb={space.xxs} textStyle="headline5" fontWeight={600}>
        More Items on Sale 👀
      </Text>

      {(() => {
        if (isValidating && !sales) {
          return <Shimmer w="100%" h={450} borderRadius={radii.xxxxs} />;
        }

        return (
          <StyledGrid
            gridAutoFlow="row dense"
            gridTemplateColumns="repeat(auto-fill, 278px)"
            gridGap={space.xs}
          >
            {sales?.map((sale) => (
              <Box
                key={sale.id}
                className={sale.reward_detail.photo ? "large" : undefined}
              >
                <StoreSaleCard sale={sale} onClick={openSale} />
              </Box>
            ))}
          </StyledGrid>
        );
      })()}
    </Box>
  );
}
