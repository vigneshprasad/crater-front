import { useTheme } from "styled-components";

import { useRouter } from "next/router";

import useRewardSalesList from "@/auction/context/RewardSalesListContext";
import { Box, Shimmer, Text } from "@/common/components/atoms";
import MasonryLayout from "@/common/components/objects/MasonryLayout";

import StoreSaleCard from "../StoreSaleCard";

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
          <MasonryLayout itemSelector=".sale-masonry">
            {sales?.map((sale) => (
              <Box my={12} key={sale.id} className="sale-masonry">
                <StoreSaleCard sale={sale} onClick={openSale} />
              </Box>
            ))}
          </MasonryLayout>
        );
      })()}
    </Box>
  );
}
