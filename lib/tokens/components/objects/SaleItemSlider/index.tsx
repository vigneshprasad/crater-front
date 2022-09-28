import { Dispatch, SetStateAction, useCallback, useState } from "react";
import { useTheme } from "styled-components";
import "swiper/css";
import { Swiper, SwiperSlide } from "swiper/react";

import { useRouter } from "next/router";

import { RewardSale } from "@/auction/types/sales";
import { Box, Flex, Grid } from "@/common/components/atoms";
import { IconButton } from "@/common/components/atoms/v2";
import useMediaQuery from "@/common/hooks/ui/useMediaQuery";

import FeaturedSaleCard from "../FeaturedSaleCard";
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
}: IProps): JSX.Element | null {
  const { space, colors, breakpoints } = useTheme();
  const router = useRouter();
  const [activeIndex, setActiveIndex] = useState(0);

  const { matches: isMobile } = useMediaQuery(`(max-width: ${breakpoints[0]})`);

  const openSale = (saleId: number): void => {
    router.query.sale = `${saleId}`;
    router.push(router, undefined, { shallow: true });
  };

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

  if (isMobile === undefined) return null;

  if (isMobile) {
    return (
      <Box>
        <Swiper
          slidesPerView={1}
          onSlideChange={(swiper) => {
            setActiveIndex(swiper.activeIndex);
            setActiveItem(swiper.activeIndex);
          }}
        >
          {sales.map((sale) => (
            <SwiperSlide key={sale.id}>
              <FeaturedSaleCard sale={sale} onClick={() => openSale(sale.id)} />
            </SwiperSlide>
          ))}
        </Swiper>
        <Flex pt={space.xs} gridGap={6} justifyContent="center">
          {Array(sales.length)
            .fill("")
            .map((_, index) => (
              <Box
                w={6}
                h={6}
                bg={colors.textPrimary}
                borderRadius="50%"
                opacity={index === activeIndex ? 1 : 0.25}
                key={index}
              />
            ))}
        </Flex>
      </Box>
    );
  }

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
