import { useTheme } from "styled-components";

import { useRouter } from "next/router";

import { RewardSale } from "@/auction/types/sales";
import { AnimatedBox, AnimatedBoxProps } from "@/common/components/atoms";

import FeaturedSaleCard from "../FeaturedSaleCard";

type IProps = AnimatedBoxProps & {
  sale: RewardSale;
};

export default function SaleItemSlide({
  sale,
  animate,
  ...rest
}: IProps): JSX.Element {
  const { colors, radii } = useTheme();
  const router = useRouter();

  const openSale = (saleId: number): void => {
    router.query.sale = `${saleId}`;
    router.push(router, undefined, { shallow: true });
  };

  const variants = {
    next: {
      display: "block",
      top: "50%",
      right: "50%",
      x: "90%",
      y: "-50%",
      scale: 0.7,
      zIndex: 10,
      opacity: 0.6,
      boxShadow: "none",
    },
    prev: {
      display: "block",
      top: "50%",
      right: "50%",
      x: "10%",
      y: "-50%",
      scale: 0.7,
      zIndex: 10,
      opacity: 0.6,
      boxShadow: "none",
    },
    active: {
      opacity: 1,
      display: "block",
      top: "50%",
      right: "50%",
      x: "50%",
      y: "-50%",
      scale: 1.0,
      zIndex: 50,
      boxShadow: "0px 0px 16px 0px #000000",
    },
    hidden: {
      top: "50%",
      right: "50%",
      x: "50%",
      y: "-50%",
      opacity: 0,
      zIndex: -1,
      transitionEnd: {
        display: "none",
      },
    },
  };

  return (
    <AnimatedBox
      transition={{
        default: {
          type: "sprint",
          stiffness: 80,
        },
      }}
      bg={colors.primaryDark}
      position="absolute"
      variants={variants}
      borderRadius={radii.s}
      overflow="hidden"
      animate={animate}
      {...rest}
    >
      <FeaturedSaleCard
        sale={sale}
        onClick={animate === "active" ? openSale : undefined}
      />
    </AnimatedBox>
  );
}
