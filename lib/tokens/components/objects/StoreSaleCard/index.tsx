import STATIC_IMAGES from "public/images";
import { useTheme } from "styled-components";

import { RewardSale, SalePaymentType } from "@/auction/types/sales";
import {
  Avatar,
  Box,
  Flex,
  Grid,
  Icon,
  Image,
  Text,
} from "@/common/components/atoms";
import useMediaQuery from "@/common/hooks/ui/useMediaQuery";

type IProps = {
  sale: RewardSale;
  onClick?: (saleId: number) => void;
};

export default function StoreSaleCard({
  sale,
  onClick,
}: IProps): JSX.Element | null {
  const { space, colors, radii, breakpoints } = useTheme();

  const { matches: isMobile } = useMediaQuery(`(max-width: ${breakpoints[0]})`);

  const { payment_type, quantity, quantity_sold, reward_detail } = sale;
  const payWithLearn = payment_type === SalePaymentType.LEARN;
  const quantitySold = quantity - quantity_sold;

  if (isMobile == undefined) return null;

  return (
    <Box
      w={[162, 278]}
      h={reward_detail.photo ? [275, 468] : [185, 300]}
      px={[space.xxxxs, space.xs]}
      pt={[space.xxxxs, space.xs]}
      pb={[space.xxxs, space.xxs]}
      bg={colors.primaryDark}
      borderRadius={radii.xs}
      border={`1px solid ${colors.primaryLight}`}
      cursor={onClick ? "pointer" : "default"}
      onClick={() => onClick && onClick(sale.id)}
    >
      <Grid
        h="100%"
        gridAutoFlow="row"
        gridTemplateRows={["repeat(3, 1fr)", "repeat(4, 1fr)"]}
        gridGap={[space.xxxxs, space.xxxs]}
      >
        {reward_detail.photo ? (
          <Image
            src={reward_detail.photo}
            alt={reward_detail.title}
            objectFit="cover"
            boxProps={{
              position: "relative",
              w: [146, 238],
              h: [146, 238],
              borderRadius: radii.s,
              overflow: "hidden",
            }}
          />
        ) : (
          <Box pb={space.xxxs}>
            <Image
              src={STATIC_IMAGES.ImageDefaultSaleItem}
              alt={reward_detail.title}
              objectFit="cover"
              boxProps={{
                position: "relative",
                w: 56,
                h: 56,
              }}
            />
          </Box>
        )}
        <Text
          pt={4}
          textStyle={isMobile ? "body" : "bodyLarge"}
          fontWeight={600}
        >
          {reward_detail.title}
        </Text>
        <Box>
          <Flex alignItems="center" gridGap={space.xxxxs}>
            <Text
              textStyle={isMobile ? "caption" : "captionLarge"}
              color={colors.textQuartenary}
            >
              Price:
            </Text>
            {payWithLearn ? (
              <Flex alignItems="center" gridGap={space.xxxxxs}>
                <Text
                  textStyle={isMobile ? "caption" : "menu"}
                  fontWeight={600}
                >
                  {sale.price} LEARN
                </Text>
                <Icon icon="LearnToken" size={16} />
              </Flex>
            ) : (
              <Text textStyle={isMobile ? "caption" : "menu"} fontWeight={600}>
                ₹{sale.price}
              </Text>
            )}
          </Flex>
          <Flex
            pt={[space.xxxxxs, space.xxxxs]}
            alignItems="center"
            gridGap={space.xxxxs}
          >
            <Text
              textStyle={isMobile ? "caption" : "captionLarge"}
              color={colors.textQuartenary}
            >
              Stock Left:
            </Text>
            <Text textStyle={isMobile ? "caption" : "menu"} fontWeight={600}>
              {quantitySold === 0 ? "-" : quantitySold}
            </Text>
          </Flex>
        </Box>
        {!isMobile && (
          <Flex
            alignSelf="end"
            pt={space.xxs}
            borderTop={`1px solid ${colors.secondaryLight}`}
            alignItems="center"
            gridGap={space.xxxxs}
          >
            <Avatar
              size={24}
              image={reward_detail.creator_detail.photo ?? undefined}
            />
            <Text textStyle="captionLarge">
              {reward_detail.creator_detail.name}
            </Text>
          </Flex>
        )}
      </Grid>
    </Box>
  );
}
