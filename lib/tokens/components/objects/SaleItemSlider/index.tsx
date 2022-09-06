import { Dispatch, SetStateAction, useCallback } from "react";

import { RewardSale } from "@/auction/types/sales";
import { Box, Flex, Grid } from "@/common/components/atoms";
import { IconButton } from "@/common/components/atoms/v2";

import SaleItemSlide from "../SaleItemSlide";

const HEIGHT = 500 * (9 / 16) + 280;

type IProps = {
  sales: RewardSale[];
  activeItem: number;
  setActiveItem: Dispatch<SetStateAction<number>>;
};

export default function SaleItemSlider({
  sales,
  activeItem,
  setActiveItem,
}: IProps): JSX.Element {
  const getVariant = useCallback(
    (index: number) => {
      if (sales.length > 2) {
        if (activeItem === 0) {
          if (index === sales.length - 1) return "prev";
        }

        if (activeItem === sales.length - 1) {
          if (index === 0) return "next";
        }
      }
      if (index === activeItem) return "active";
      if (index === activeItem - 1) return "prev";
      if (index === activeItem + 1) return "next";
      return "hidden";
    },
    [sales, activeItem]
  );

  return (
    <Grid
      gridAutoFlow="row"
      gridTemplateAreas={` 
          "slider" 
          "controls"
        `}
      gridTemplateRows="1fr max-content"
      gridGap={34}
      h={HEIGHT}
    >
      <Box gridArea="slider" position="relative">
        {sales.map((sale, index) => {
          const variant = getVariant(index);
          return (
            <SaleItemSlide
              initial="hidden"
              animate={variant}
              sale={sale}
              key={index}
            />
          );
        })}
      </Box>

      <Flex gridArea="controls" gridGap={24}>
        <IconButton
          buttonStyle="round-border"
          icon="ChevronLeft"
          onClick={() => {
            if (activeItem === 0) {
              return setActiveItem(sales.length - 1);
            }
            const prev = activeItem - 1;
            setActiveItem(prev);
          }}
          opacity={sales.length > 1 ? 1 : 0}
        />
        <IconButton
          buttonStyle="round-border"
          icon="ChevronRight"
          onClick={() => {
            if (activeItem === sales.length - 1) {
              return setActiveItem(0);
            }
            const next = activeItem + 1;
            setActiveItem(next);
          }}
          opacity={sales.length > 1 ? 1 : 0}
        />
      </Flex>
    </Grid>
  );
}
