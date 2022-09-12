import { useTheme } from "styled-components";

import { RewardSale, SalePaymentType } from "@/auction/types/sales";
import { Box, Flex, Grid, Icon, Image, Text } from "@/common/components/atoms";

type IProps = {
  sale: RewardSale;
  onClick?: (saleId: number) => void;
};

export default function FeaturedSaleCard({
  sale,
  onClick,
}: IProps): JSX.Element {
  const { space, colors, radii } = useTheme();

  const payWithLearn = sale.payment_type === SalePaymentType.LEARN;

  return (
    <Box
      maxWidth={295}
      p={space.xs}
      bg={colors.primaryDark}
      cursor={onClick ? "pointer" : "default"}
      onClick={() => onClick && onClick(sale.id)}
    >
      <Grid
        gridAutoFlow="row"
        gridTemplateRows="1fr max-content max-content"
        gridGap={space.xxs}
      >
        {sale.reward_detail.photo && (
          <Image
            src={sale.reward_detail.photo}
            alt={sale.reward_detail.title}
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
        <Box>
          <Text textStyle="formLabel">{sale.reward_detail.title}</Text>
          <Text
            pt={space.xxxxs}
            textStyle="body"
            fontWeight={500}
            color={colors.textQuartenary}
            maxLines={3}
            overflowY="auto"
          >
            {sale.reward_detail.description}
          </Text>
          {sale.reward_detail.description && (
            <Text textStyle="body" fontWeight={600} color={colors.accentLight}>
              Show more
            </Text>
          )}
        </Box>
        <Flex justifyContent="space-between" alignItems="center">
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
      </Grid>
    </Box>
  );
}
