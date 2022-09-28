import { useTheme } from "styled-components";

import { RewardSale, SalePaymentType } from "@/auction/types/sales";
import { Box, Flex, Grid, Icon, Image, Text } from "@/common/components/atoms";
import useMediaQuery from "@/common/hooks/ui/useMediaQuery";

type IProps = {
  sale: RewardSale;
  onClick?: (saleId: number) => void;
};

export default function FeaturedSaleCard({
  sale,
  onClick,
}: IProps): JSX.Element | null {
  const { space, colors, radii, breakpoints } = useTheme();

  const { matches: isMobile } = useMediaQuery(`(max-width: ${breakpoints[0]})`);

  const payWithLearn = sale.payment_type === SalePaymentType.LEARN;

  if (isMobile === undefined) return null;

  return (
    <Box
      maxWidth={["100%", 295]}
      p={[space.xxxxs, space.xs]}
      bg={colors.primaryDark}
      borderRadius={[radii.xxs, radii.s]}
      cursor={onClick ? "pointer" : "default"}
      onClick={() => onClick && onClick(sale.id)}
    >
      <Grid
        gridAutoFlow={["column", "row"]}
        gridTemplateRows={["minmax(0, 1fr)", "1fr max-content max-content"]}
        gridTemplateColumns={["max-content 1fr", "1fr"]}
        gridGap={space.xxs}
      >
        {sale.reward_detail.photo && (
          <Image
            src={sale.reward_detail.photo}
            alt={sale.reward_detail.title}
            objectFit="cover"
            boxProps={{
              position: "relative",
              w: [117, 255],
              h: [117, 255],
              borderRadius: radii.s,
              overflow: "hidden",
            }}
          />
        )}
        <Box>
          <Text
            pt={[space.xxxxs, 0]}
            textStyle={isMobile ? "caption" : "formLabel"}
            fontWeight={600}
          >
            {sale.reward_detail.title}
          </Text>
          <Text
            pt={[space.xxxxxs, space.xxxxs]}
            textStyle={isMobile ? "caption" : "body"}
            fontWeight={500}
            color={colors.textQuartenary}
            maxLines={3}
            overflowY="auto"
          >
            {sale.reward_detail.description}
          </Text>
          {sale.reward_detail.description && (
            <Text
              textStyle={isMobile ? "caption" : "body"}
              fontWeight={600}
              color={colors.accentLight}
            >
              Show more
            </Text>
          )}
        </Box>
        <Flex
          justifyContent="space-between"
          alignItems="center"
          display={["none", "block"]}
        >
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
