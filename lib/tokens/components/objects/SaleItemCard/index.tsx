import STATIC_IMAGES from "public/images";
import { useTheme } from "styled-components";

import {
  Avatar,
  Box,
  Flex,
  Grid,
  Icon,
  Image,
  Text,
} from "@/common/components/atoms";
import { RewardSalePaymentType, SaleItem } from "@/tokens/types/store";

type IProps = {
  saleItem: SaleItem;
  onClick?: (saleItemId: number) => void;
};

export default function SaleItemCard({
  saleItem,
  onClick,
}: IProps): JSX.Element {
  const { space, colors, radii } = useTheme();

  const rewardSale = saleItem.reward_sale_details[0];
  const payWithLearn = rewardSale.payment_type === RewardSalePaymentType.Learn;
  const quantitySold = rewardSale.quantity - rewardSale.quantity_sold;

  return (
    <Box
      w={278}
      h={saleItem.photo ? 468 : 300}
      px={space.xs}
      pt={space.xs}
      pb={space.xxs}
      bg={colors.primaryDark}
      borderRadius={radii.xs}
      border={`1px solid ${colors.primaryLight}`}
      cursor={onClick ? "pointer" : "default"}
      onClick={() => onClick && onClick(saleItem.id)}
    >
      <Grid
        h="100%"
        gridAutoFlow="row"
        gridTemplateRows="repeat(4, 1fr)"
        gridGap={space.xxxs}
      >
        {saleItem.photo ? (
          <Image
            src={saleItem.photo}
            alt={saleItem.title}
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
              alt={saleItem.title}
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
          {saleItem.title}
        </Text>
        <Box>
          <Flex alignItems="center" gridGap={space.xxxxs}>
            <Text textStyle="captionLarge" color={colors.textQuartenary}>
              Price:
            </Text>
            {payWithLearn ? (
              <Flex alignItems="center" gridGap={space.xxxxxs}>
                <Text textStyle="menu">{rewardSale.price} LEARN</Text>
                <Icon icon="LearnToken" size={16} />
              </Flex>
            ) : (
              <Text textStyle="menu">₹{rewardSale.price}</Text>
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
            image={saleItem.creator_detail.photo ?? undefined}
          />
          <Text textStyle="captionLarge">{saleItem.creator_detail.name}</Text>
        </Flex>
      </Grid>
    </Box>
  );
}
