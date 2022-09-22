import { useTheme } from "styled-components";

import dynamic from "next/dynamic";
import { useRouter } from "next/router";

import useRewardSalesList from "@/auction/context/RewardSalesListContext";
import { Box, Shimmer, Text } from "@/common/components/atoms";

import StoreSaleCard from "../StoreSaleCard";

const MasonryLayout = dynamic(
  () => import("@/common/components/objects/MasonryLayout"),
  { ssr: false }
);

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
      <Text pb={[space.xxxs, space.xxs]} textStyle="headline5" fontWeight={600}>
        More Items on Sale 👀
      </Text>

      {(() => {
        if (isValidating && !sales) {
          return <Shimmer w="100%" h={300} borderRadius={radii.xxxxs} />;
        }

        return (
          <MasonryLayout itemSelector=".sale-masonry">
            {sales?.map((sale) => (
              <Box
                my={[space.xxxxs, space.xxxs]}
                key={sale.id}
                className="sale-masonry"
              >
                <StoreSaleCard sale={sale} onClick={openSale} />
              </Box>
            ))}
          </MasonryLayout>
        );
      })()}
    </Box>
  );
}
