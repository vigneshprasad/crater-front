import STATIC_IMAGES from "public/images";
import { useTheme } from "styled-components";
import useSWR from "swr";

import Image from "next/image";

import SaleApiClient from "@/auction/api/SaleApiClient";
import { RewardSale, RewardSaleLog } from "@/auction/types/sales";
import {
  Box,
  Text,
  Flex,
  Span,
  Icon,
  Spinner,
  Grid,
} from "@/common/components/atoms";
import { Button } from "@/common/components/atoms/v2";
import ContainerModal from "@/common/components/objects/ContainerModal";
import { useNotifications } from "@/common/components/objects/NotificationStack/context";
import { API_URL_CONSTANTS } from "@/common/constants/url.constants";
import { CreatorUpiInfo } from "@/creators/types/creator";

interface IProps {
  creator: number;
  sale: RewardSale;
  visible: boolean;
  onClose: () => void;
}

export default function PayItemModal({
  creator,
  sale,
  visible,
  onClose,
}: IProps): JSX.Element {
  const { showNotification } = useNotifications();
  const { data: upiInfo } = useSWR<CreatorUpiInfo>(
    API_URL_CONSTANTS.creator.retrieveCreatorUpiInfo(creator)
  );
  const { colors, space } = useTheme();

  async function postRewardSaleLog(): Promise<void> {
    const data: Partial<RewardSaleLog> = {
      reward_sale: sale.id,
      quantity: 1,
      price: sale.price,
      payment_type: sale.payment_type,
    };

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [res, err] = await SaleApiClient().postRewardSaleLog(data);

    if (err) {
      showNotification(
        {
          title: "Payment failed",
          description: "Something went wrong try agian later.",
          iconProps: {
            icon: "AlertCircle",
            color: colors.error,
          },
        },
        30 * 1000,
        true
      );
      onClose();
      return;
    }

    showNotification(
      {
        title: "Purchase Successful",
        description:
          "Our team will connect you with the creator after the stream ends.",
        iconProps: {
          icon: "CheckCircle",
          color: colors.greenSuccess,
        },
      },
      30000,
      true
    );

    onClose();

    return;
  }

  return (
    <ContainerModal heading="ITEM FOR SALE" visible={visible} onClose={onClose}>
      {(() => {
        if (!upiInfo) {
          return (
            <Grid minHeight={360}>
              <Spinner m="auto auto" />
            </Grid>
          );
        }

        return (
          <Flex
            px={space.xxxs}
            py={space.xxxxs}
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
              to the creator via UPI
            </Text>

            <Text
              bg={colors.primaryBackground}
              px={space.xxs}
              py={space.xxxs}
              borderRadius={4}
              textStyle="body"
              fontWeight="600"
            >
              {upiInfo.upi_id}
            </Text>

            <Flex alignItems="center" gridGap={space.xxxxs}>
              <Icon icon="Info" size={16} fill color={colors.textPrimary} />
              <Text textAlign="center" textStyle="small">
                Click here to inform the creator that you made the payment.
              </Text>
            </Flex>

            <Button
              w="100%"
              label="I made the payment, notify creator"
              onClick={postRewardSaleLog}
            />
          </Flex>
        );
      })()}
    </ContainerModal>
  );
}
