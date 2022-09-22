import { useState } from "react";
import { useTheme } from "styled-components";

import { Box, Flex, Shimmer, Text } from "@/common/components/atoms";
import useRewardSaleFeaturedItemsList from "@/tokens/context/RewardSalesFeaturedListContext";

import BuyNowBox from "../BuyNowBox";
import SaleItemSlider from "../SaleItemSlider";

export default function TopItemsForSale(): JSX.Element {
  const { space, radii } = useTheme();
  const [activeItem, setActiveItem] = useState(0);
  const { sales, loading } = useRewardSaleFeaturedItemsList();

  return (
    <Box>
      <Text pb={[space.xxxs, 26]} textStyle="headline5" fontWeight={600}>
        Top Items for Sale 🔥
      </Text>

      {!sales || loading ? (
        <Shimmer w="100%" h={450} borderRadius={radii.xxxxs} />
      ) : (
        <Flex
          flexDirection={["column", "row"]}
          justifyContent="space-evenly"
          gridGap={[space.xxs, space.xl]}
        >
          <SaleItemSlider
            sales={sales}
            activeItem={activeItem}
            setActiveItem={setActiveItem}
          />
          <BuyNowBox sale={sales[activeItem]} />
        </Flex>
      )}
    </Box>
  );
}
