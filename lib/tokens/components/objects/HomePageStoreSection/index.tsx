import STATIC_IMAGES from "public/images";
import { useTheme } from "styled-components";

import Image from "next/image";
import { useRouter } from "next/router";

import { RewardSale } from "@/auction/types/sales";
import {
  Box,
  Flex,
  Grid,
  Icon,
  Link,
  Shimmer,
  Span,
  Text,
} from "@/common/components/atoms";
import GlassBox from "@/common/components/atoms/GlassBox";
import LazyLoadButton from "@/common/components/objects/LazyLoadButton";
import { PageRoutes } from "@/common/constants/route.constants";
import useMediaQuery from "@/common/hooks/ui/useMediaQuery";

interface IProps {
  sales?: RewardSale[];
}

export default function HomePageStoreSection({
  sales,
}: IProps): JSX.Element | null {
  const { space, colors, radii, breakpoints } = useTheme();
  const router = useRouter();

  const { matches: isMobile } = useMediaQuery(`(max-width: ${breakpoints[0]})`);

  if (isMobile === undefined) return null;

  return (
    <Grid
      py={space.xs}
      pr={[space.xxxs, 24]}
      gridTemplateColumns={["1fr", "1fr 1fr"]}
      gridGap={24}
    >
      <Box h={[460, "100%"]} bg="#5F1DAB" borderRadius={radii.xs}>
        <Flex h="100%" position="relative">
          <Box
            w={[296, 425]}
            h={[260, 375]}
            position="absolute"
            right={0}
            left={[0, "unset"]}
            mx={["auto", 0]}
            zIndex={1}
          >
            <Image
              src={STATIC_IMAGES.ImageStoreHome}
              alt="Store Home"
              layout="fill"
            />
          </Box>
          <GlassBox
            w={["100%", "50%"]}
            m={[space.xxxs, 34]}
            p={24}
            style={{ backdropFilter: "blur(18px)" }}
            alignSelf={["flex-end", "center"]}
            zIndex={2}
          >
            <Text
              pb={space.xxxs}
              fontSize={["3.2rem", "4.0rem"]}
              lineHeight={["3.8rem", "4.8rem"]}
              fontWeight={600}
              maxLines={3}
            >
              Discover, Buy and Sell Art & Digital Goods
            </Text>
            <Text
              pb={space.xxs}
              textStyle="body"
              fontWeight={500}
              color={colors.textSecondaryLight}
            >
              Crater&apos;s live marketplace for art, content, communities and
              more.{" "}
            </Text>
            <LazyLoadButton
              label="Visit Store"
              iconTransform="rotate(-90deg)"
              onClick={() => router.push(PageRoutes.store())}
            />
          </GlassBox>
        </Flex>
      </Box>

      <Box maxWidth={800}>
        <Flex justifyContent="space-between" alignItems="center">
          <Text textStyle="headline5Small">Recently Added</Text>
          <Link href={PageRoutes.store()}>
            <Flex gridGap={space.xxxxs} alignItems="center">
              <Text
                textStyle="captionLarge"
                fontWeight={600}
                color={colors.textQuartenary}
              >
                View all
              </Text>
              <Icon
                icon="ShowMore"
                size={12}
                transform="rotate(-90deg)"
                color={colors.textQuartenary}
              />
            </Flex>
          </Link>
        </Flex>
        <Flex
          pt={[space.xxs, space.xxxs]}
          flexDirection="column"
          gridGap={[space.xxxs, space.xxs]}
        >
          {(() => {
            if (!sales) {
              return Array(3)
                .fill("")
                .map((_, index) => (
                  <Shimmer
                    w="100%"
                    h={100}
                    borderRadius={radii.xxs}
                    key={index}
                  />
                ));
            }

            return sales.map((sale) => (
              <Box
                py={space.xxxs}
                pl={space.xs}
                pr={space.xxxs}
                bg={colors.primaryDark}
                borderRadius={radii.xxs}
                boxShadow="0px 0px 16px #000000"
                key={sale.id}
              >
                <Flex justifyContent="space-between" alignItems="center">
                  <Box>
                    <Text
                      textStyle={isMobile ? "title" : "formLabel"}
                      fontWeight={600}
                    >
                      {sale.reward_detail.title}
                    </Text>
                    <Text
                      pt={[space.xxxxs, space.xxxs]}
                      fontSize={["1.4rem", "1.6rem"]}
                      fontWeight={600}
                      lineHeight={["1.6rem", "2.0rem"]}
                    >
                      ₹{sale.price}{" "}
                      <Span
                        fontSize="1.0rem"
                        lineHeight="1.2rem"
                        color={colors.textQuartenary}
                      >
                        ({sale.quantity_sold} Buyers)
                      </Span>
                    </Text>
                  </Box>
                  <Box
                    w={78}
                    h={78}
                    position="relative"
                    borderRadius={radii.xxs}
                    overflow="hidden"
                  >
                    <Image
                      src={
                        sale.reward_detail.photo ??
                        STATIC_IMAGES.ImageDefaultSaleItem
                      }
                      alt={sale.reward_detail.title}
                      layout="fill"
                    />
                  </Box>
                </Flex>
              </Box>
            ));
          })()}
        </Flex>
      </Box>
    </Grid>
  );
}
