import STATIC_IMAGES from "public/images";
import { useTheme } from "styled-components";

import Image from "next/image";

import { Box, Text, Flex, Span, Icon } from "@/common/components/atoms";
import { Button } from "@/common/components/atoms/v2";
import ContainerModal from "@/common/components/objects/ContainerModal";

interface IProps {
  upiId: string;
  price: number;
  name: string;
  visible: boolean;
  onClose: () => void;
}

export default function PayItemModal({
  upiId,
  price,
  name,
  visible,
  onClose,
}: IProps): JSX.Element {
  const { colors, space } = useTheme();
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

        <Text>{name}</Text>

        <Text color={colors.textTertiary} textAlign="center">
          Pay{" "}
          <Span color={colors.textPrimary} fontWeight="700">
            ₹{price}.00
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
          {upiId}
        </Text>

        <Flex alignItems="center" gridGap={space.xxxxs}>
          <Icon icon="Info" size={16} fill color={colors.textPrimary} />
          <Text textAlign="center" textStyle="small">
            Click here to inform the creator that you made the payment.
          </Text>
        </Flex>

        <Button w="100%" label="I made the payment, notify creator" />
      </Flex>
    </ContainerModal>
  );
}
