import { useTheme } from "styled-components";

import { Box } from "@/common/components/atoms";
import { Button } from "@/common/components/atoms/v2";
import { SaleItem } from "@/tokens/types/store";

import SaleItemInfo from "../SaleItemInfo";

type IProps = {
  saleItem: SaleItem;
};

export default function BuyNowBox({ saleItem }: IProps): JSX.Element {
  const { radii } = useTheme();

  return (
    <Box
      w={496}
      h={460}
      px={28}
      py={32}
      background="linear-gradient(147.18deg, rgba(79, 119, 167, 0.16) 8.77%, rgba(79, 119, 167, 0) 81.65%)"
      borderRadius={radii.s}
    >
      <SaleItemInfo
        creator={saleItem.creator_detail.name}
        saleItem={saleItem}
        showPrice={true}
      />

      <Button
        mt={24}
        w="100%"
        minHeight={44}
        label="Buy Now 🎉 (Coming Soon)"
        textProps={{ fontSize: "1.6rem" }}
        disabled={true}
      />
    </Box>
  );
}
