import { useTheme } from "styled-components";

import { useRouter } from "next/router";

import { Box, Shimmer, Text } from "@/common/components/atoms";
import MasonryLayout from "@/common/components/objects/MasonryLayout";
import useRewardSaleItemsList from "@/tokens/context/RewardSaleItemsListContext";

import SaleItemCard from "../SaleItemCard";

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
          <MasonryLayout itemSelector=".sale-item-masonry">
            {saleItems?.map((saleItem) => (
              <Box my={12} key={saleItem.id} className="sale-item-masonry">
                <SaleItemCard saleItem={saleItem} onClick={openSaleItem} />
              </Box>
            ))}
          </MasonryLayout>
        );
      })()}
    </Box>
  );
}
