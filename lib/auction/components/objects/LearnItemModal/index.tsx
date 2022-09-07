import STATIC_IMAGES from "public/images";
import styled, { useTheme } from "styled-components";

import Image from "next/image";

import SaleApiClient from "@/auction/api/SaleApiClient";
import { RewardSale, RewardSaleLog } from "@/auction/types/sales";
import { Box, Text, Flex, Span, Icon } from "@/common/components/atoms";
import { Button } from "@/common/components/atoms/v2";
import ContainerModal from "@/common/components/objects/ContainerModal";
import { useNotifications } from "@/common/components/objects/NotificationStack/context";
import { GenericError } from "@/common/types/api";

interface IProps {
  creator: number;
  sale: RewardSale;
  visible: boolean;
  onClose: () => void;
}

const StyledSpan = styled(Span)`
  background: linear-gradient(
    0deg,
    #d5bbff 17.58%,
    #9db3ff 85.38%,
    #0d849e 85.38%
  );

  backgroundclip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  textfillcolor: transparent;
`;

export default function LearnItemModal({
  sale,
  visible,
  onClose,
}: IProps): JSX.Element {
  const { colors, space } = useTheme();
  const { showNotification } = useNotifications();

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
      const error = err.response?.data as GenericError;
      if (error.type === "TokensInsufficient") {
        showNotification(
          {
            title: "Payment failed",
            description: error.message,
            iconProps: {
              icon: "AlertCircle",
              color: colors.error,
            },
          },
          2 * 60 * 1000,
          true
        );
      }
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

        <Text display="flex" color={colors.textTertiary} textAlign="center">
          Pay{" "}
          <Flex mx={space.xxxxs} alignItems="center" gridGap={space.xxxxxs}>
            <Text fontSize="1.4rem">
              {sale.price} <StyledSpan>LEARN</StyledSpan>
            </Text>
            <Icon icon="LearnToken" size={16} />
          </Flex>
          to the creator.
        </Text>

        <Button w="100%" label="Confirm" onClick={postRewardSaleLog} />
      </Flex>
    </ContainerModal>
  );
}
