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

type IProps = {
  sale: RewardSale;
  onClick?: (saleItemId: number) => void;
};

export default function StoreSaleCard({ sale, onClick }: IProps): JSX.Element {
  const { space, colors, radii } = useTheme();

  const { payment_type, quantity, quantity_sold, reward_detail } = sale;
  const payWithLearn = payment_type === SalePaymentType.LEARN;
  const quantitySold = quantity - quantity_sold;

  return (
    <Box
      w={278}
      h={reward_detail.photo ? 468 : 300}
      px={space.xs}
      pt={space.xs}
      pb={space.xxs}
      bg={colors.primaryDark}
      borderRadius={radii.xs}
      border={`1px solid ${colors.primaryLight}`}
      cursor={onClick ? "pointer" : "default"}
      onClick={() => onClick && onClick(reward_detail.id)}
    >
      <Grid
        h="100%"
        gridAutoFlow="row"
        gridTemplateRows="repeat(4, 1fr)"
        gridGap={space.xxxs}
      >
        {reward_detail.photo ? (
          <Image
            src={reward_detail.photo}
            alt={reward_detail.title}
            objectFit="cover"
            boxProps={{
              position: "relative",
              w: 238,
              h: 238,
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
        <Text pt={4} textStyle="bodyLarge" fontWeight={600}>
          {reward_detail.title}
        </Text>
        <Box>
          <Flex alignItems="center" gridGap={space.xxxxs}>
            <Text textStyle="captionLarge" color={colors.textQuartenary}>
              Price:
            </Text>
            {payWithLearn ? (
              <Flex alignItems="center" gridGap={space.xxxxxs}>
                <Text textStyle="menu">{sale.price} LEARN</Text>
                <Icon icon="LearnToken" size={16} />
              </Flex>
            ) : (
              <Text textStyle="menu">₹{sale.price}</Text>
            )}
          </Flex>
          <Flex pt={space.xxxxs} alignItems="center" gridGap={space.xxxxs}>
            <Text textStyle="captionLarge" color={colors.textQuartenary}>
              Stock Left:
            </Text>
            <Text textStyle="menu">
              {quantitySold === 0 ? "-" : quantitySold}
            </Text>
          </Flex>
        </Box>
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
      </Grid>
    </Box>
  );
}
