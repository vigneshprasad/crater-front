import { useTheme } from "styled-components";

import { useRouter } from "next/router";

import { RewardSale } from "@/auction/types/sales";
import useAuth from "@/auth/context/AuthContext";
import useAuthModal from "@/auth/context/AuthModalContext";
import { Box } from "@/common/components/atoms";
import { Button } from "@/common/components/atoms/v2";

import SaleItemInfo from "../SaleItemInfo";

type IProps = {
  sale: RewardSale;
};

export default function BuyNowBox({ sale }: IProps): JSX.Element {
  const { space, radii } = useTheme();
  const router = useRouter();
  const { user } = useAuth();
  const { openModal } = useAuthModal();

  const disableBuyNow =
    user?.pk === sale.reward_detail.creator_detail.user ||
    sale.is_active === false;

  const openSale = (saleId: number): void => {
    router.query.sale = `${saleId}`;
    router.push(router, undefined, { shallow: true });
  };

  return (
    <Box
      w={["100%", 496]}
      h={["fit-content", 460]}
      px={[space.xxxs, 28]}
      py={[space.xs, 32]}
      background="linear-gradient(147.18deg, rgba(79, 119, 167, 0.16) 8.77%, rgba(79, 119, 167, 0) 81.65%)"
      borderRadius={radii.s}
    >
      <SaleItemInfo sale={sale} showPrice={true} />

      <Button
        mt={[space.xs, 24]}
        w="100%"
        minHeight={44}
        label="Buy Now 🎉"
        textProps={{ fontSize: "1.6rem" }}
        onClick={() => {
          user ? openSale(sale.id) : openModal();
        }}
        disabled={disableBuyNow}
      />
    </Box>
  );
}
