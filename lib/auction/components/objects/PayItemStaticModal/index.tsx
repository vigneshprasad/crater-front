import STATIC_IMAGES from "public/images";
import { useState } from "react";
import { useTheme } from "styled-components";

import Image from "next/image";

import SaleApiClient from "@/auction/api/SaleApiClient";
import {
  RewardSale,
  RewardSaleLog,
  SalePaymentType,
} from "@/auction/types/sales";
import {
  Box,
  Text,
  Flex,
  Span,
  Icon,
  Spinner,
} from "@/common/components/atoms";
import { Button } from "@/common/components/atoms/v2";
import ContainerModal from "@/common/components/objects/ContainerModal";
import { CRATER_UPI_ID } from "@/common/constants/global.constants";

interface IProps {
  sale: RewardSale;
  visible: boolean;
  onClose: () => void;
}

export default function PayItemStaticModal({
  sale,
  visible,
  onClose,
}: IProps): JSX.Element {
  const { colors, space } = useTheme();
  const [loading, setLoading] = useState(false);

  async function postRewardSaleLog(): Promise<void> {
    await setLoading(true);
    const data: Partial<RewardSaleLog> = {
      reward_sale: sale.id,
      quantity: 1,
      price: sale.price,
      payment_type: SalePaymentType.UPI,
    };

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [_, err] = await SaleApiClient().postRewardSaleLog(data);

    if (err) {
      return;
    }

    await setLoading(false);
    onClose();

    return;
  }

  return (
    <ContainerModal heading="ITEM FOR SALE" visible={visible} onClose={onClose}>
      <Flex
        px={space.xxxs}
        pt={space.xxs}
        pb={28}
        alignItems="center"
        gridGap={space.xxxs}
        flexDirection="column"
      >
        <Box w={160} h={160} position="relative">
          <Image
            layout="fill"
            src={STATIC_IMAGES.ImagePurchaseItem}
            alt="Purchase Item"
          />
        </Box>

        <Text>{sale.reward_detail.name}</Text>

        <Text color={colors.textTertiary} textAlign="center">
          Pay{" "}
          <Span color={colors.textPrimary} fontWeight="700">
            ₹{sale.price}
          </Span>{" "}
          to Crater via UPI
        </Text>

        <Text
          bg={colors.primaryBackground}
          px={space.xxs}
          py={space.xxxs}
          borderRadius={4}
          textStyle="body"
          fontWeight="600"
        >
          {CRATER_UPI_ID}
        </Text>

        <Flex alignItems="center" gridGap={space.xxxxs}>
          <Icon icon="Info" size={16} fill color={colors.textPrimary} />
          <Text textAlign="center" textStyle="small">
            Click here to inform Crater that you made the payment.
          </Text>
        </Flex>

        <Button
          w={364}
          h={44}
          label="I made the payment, notify creator"
          suffixElement={loading && <Spinner />}
          onClick={postRewardSaleLog}
          disabled={loading}
        />
      </Flex>
    </ContainerModal>
  );
}
