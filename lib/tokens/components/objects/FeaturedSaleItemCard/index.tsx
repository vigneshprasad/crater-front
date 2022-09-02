import { useTheme } from "styled-components";

import { Box, Flex, Icon, Image, Text } from "@/common/components/atoms";
import { RewardSalePaymentType, SaleItem } from "@/tokens/types/store";

type IProps = {
  saleItem: SaleItem;
};

export default function FeaturedSaleItemCard({
  saleItem,
}: IProps): JSX.Element {
  const { space, colors, radii } = useTheme();

  const payWithLearn =
    saleItem.reward_sale_details.find(
      (sale) => sale.payment_type === RewardSalePaymentType.Learn
    ) ?? false;

  return (
    <Box maxWidth={295} p={space.xs} bg={colors.primaryDark}>
      {saleItem.photo && (
        <Image
          src={saleItem.photo}
          alt={saleItem.title}
          objectFit="cover"
          boxProps={{
            position: "relative",
            w: 255,
            h: 255,
            borderRadius: radii.s,
            overflow: "hidden",
          }}
        />
      )}
      <Text pt={space.xxs} textStyle="formLabel">
        {saleItem.title}
      </Text>
      <Text
        pt={space.xxxxs}
        textStyle="body"
        fontWeight={500}
        color={colors.textQuartenary}
        maxLines={3}
        overflowY="auto"
      >
        {saleItem.description}
      </Text>
      <Flex pt={28} justifyContent="space-between" alignItems="center">
        {payWithLearn && (
          <Flex alignItems="center" gridGap={space.xxxxxs}>
            <Text textStyle="menu">Pay with LEARN</Text>
            <Icon icon="LearnToken" size={16} />
          </Flex>
        )}
        {/* <Box
          px={space.xxxs}
          py={10}
          bg={colors.primaryBackground}
          borderRadius={10}
        >
          <Flex alignItems="center" gridGap={6}>
            <Icon icon="Heart" size={20} />
            <Text>21</Text>
          </Flex>
        </Box> */}
      </Flex>
    </Box>
  );
}
