import { useState } from "react";
import { useTheme } from "styled-components";

import { Box, Flex, Shimmer, Text } from "@/common/components/atoms";
import useRewardSaleFeaturedItemsList from "@/tokens/context/RewardSaleFeaturedItemsListContext";

import BuyNowBox from "../BuyNowBox";
import SaleItemSlider from "../SaleItemSlider";

export default function TopItemsForSale(): JSX.Element {
  const { space, radii } = useTheme();
  const [activeItem, setActiveItem] = useState(0);
  const { saleItems, loading } = useRewardSaleFeaturedItemsList();

  return (
    <Box>
      <Text pb={26} textStyle="headline5" fontWeight={600}>
        Top Items for Sale 🔥
      </Text>

      {!saleItems || loading ? (
        <Shimmer w="100%" h={450} borderRadius={radii.xxxxs} />
      ) : (
        <Flex justifyContent="space-evenly" gridGap={space.xl}>
          <SaleItemSlider
            saleItems={saleItems}
            activeItem={activeItem}
            setActiveItem={setActiveItem}
          />
          <BuyNowBox saleItem={saleItems[activeItem]} />
        </Flex>
      )}
    </Box>
  );
}
