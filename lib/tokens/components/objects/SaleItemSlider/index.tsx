import { Dispatch, SetStateAction, useCallback } from "react";

import { Box, Flex, Grid } from "@/common/components/atoms";
import { IconButton } from "@/common/components/atoms/v2";
import { SaleItem } from "@/tokens/types/store";

import SaleItemSlide from "../SaleItemSlide";

const HEIGHT = 500 * (9 / 16) + 280;

type IProps = {
  saleItems: SaleItem[];
  activeItem: number;
  setActiveItem: Dispatch<SetStateAction<number>>;
};

export default function SaleItemSlider({
  saleItems,
  activeItem,
  setActiveItem,
}: IProps): JSX.Element {
  const getVariant = useCallback(
    (index: number) => {
      if (saleItems.length > 2) {
        if (activeItem === 0) {
          if (index === saleItems.length - 1) return "prev";
        }

        if (activeItem === saleItems.length - 1) {
          if (index === 0) return "next";
        }
      }
      if (index === activeItem) return "active";
      if (index === activeItem - 1) return "prev";
      if (index === activeItem + 1) return "next";
      return "hidden";
    },
    [saleItems, activeItem]
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
        {saleItems.map((saleItem, index) => {
          const variant = getVariant(index);
          return (
            <SaleItemSlide
              initial="hidden"
              animate={variant}
              saleItem={saleItem}
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
              return setActiveItem(saleItems.length - 1);
            }
            const prev = activeItem - 1;
            setActiveItem(prev);
          }}
        />
        <IconButton
          buttonStyle="round-border"
          icon="ChevronRight"
          onClick={() => {
            if (activeItem === saleItems.length - 1) {
              return setActiveItem(0);
            }
            const next = activeItem + 1;
            setActiveItem(next);
          }}
        />
      </Flex>
    </Grid>
  );
}
