import { useEffect, useState } from "react";
import styled, { useTheme } from "styled-components";

import { useRouter } from "next/router";

import {
  RewardSalesListContext,
  RewardSalesListProvider,
} from "@/auction/context/RewardSalesListContext";
import { RewardSale, SalePaymentType } from "@/auction/types/sales";
import {
  Box,
  Flex,
  Icon,
  Image,
  Link,
  Span,
  Text,
  Toggle,
} from "@/common/components/atoms";
import { SideDrawer } from "@/common/components/atoms/SideDrawer";
import Footer from "@/common/components/objects/Footer";
import useMediaQuery from "@/common/hooks/ui/useMediaQuery";
import { useFollower } from "@/creators/context/FollowerContext";
import { RewardApiClient } from "@/tokens/api";
import useRewardSaleTopSellersList from "@/tokens/context/RewardSaleTopSellersListContext";
import {
  RewardSalesFeaturedListContext,
  RewardSalesFeaturedListProvider,
} from "@/tokens/context/RewardSalesFeaturedListContext";

import StorePageLayout from "../../layout/StorePageLayout";
import MoreSaleItems from "../../objects/MoreSaleItems";
import RewardSalePayment from "../../objects/RewardSalePayment";
import SellOnCraterStatic from "../../objects/SellOnCraterStatic";
import StoreHeader from "../../objects/StoreHeader";
import StoreTabs from "../../objects/StoreTabs";
import TopItemsForSale from "../../objects/TopItemsForSale";
import TopSellersList from "../../objects/TopSellersList";

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

export default function StoreBuyNowPage(): JSX.Element | null {
  const { space, colors, radii, breakpoints } = useTheme();
  const router = useRouter();
  const {
    sellers,
    loading: sellersLoading,
    mutateRewardSaleTopSellers,
  } = useRewardSaleTopSellersList();
  const { subscribeCreator } = useFollower();
  const [followingCreator, setFollowingCreator] = useState<number | null>(null);
  const [paymentType, setPaymentType] = useState<SalePaymentType | undefined>(
    undefined
  );
  const [saleToShow, setSaleToShow] = useState<RewardSale | null>(null);

  const { matches: isMobile } = useMediaQuery(`(max-width: ${breakpoints[0]})`);

  useEffect(() => {
    const saleId = router.query?.sale as string;
    if (saleId) {
      retrieveSale();
    }

    async function retrieveSale(): Promise<void> {
      const [data] = await RewardApiClient().retrieveRewardSale(saleId);
      if (data) setSaleToShow(data);
    }
  }, [router.query]);

  const followCreator = async (creator: number): Promise<void> => {
    if (creator) {
      setFollowingCreator(creator);
      await subscribeCreator(creator);
      await mutateRewardSaleTopSellers();
      setFollowingCreator(null);
    }
  };

  const onCloseSideDrawer = (): void => {
    setSaleToShow(null);
    delete router.query.sale;
    router.push(router, undefined, { shallow: true });
  };

  if (isMobile === undefined) return null;

  if (isMobile) {
    return (
      <Text py={space.xxs} textAlign="center">
        Please view this in a desktop for best experience.
      </Text>
    );
  }

  return (
    <Box>
      {saleToShow && (
        <SideDrawer
          px={0}
          py={0}
          visible={saleToShow ? true : false}
          heading="Crater Store"
          boxProps={{ ml: space.xs, mr: 22, pt: 28 }}
          onClose={() => onCloseSideDrawer()}
        >
          <RewardSalePayment sale={saleToShow} />
        </SideDrawer>
      )}
      <Box pt={space.l} pb={36} overflow="hidden" position="relative">
        <Box
          w={968}
          h={780}
          position="absolute"
          bottom={-50}
          left={778}
          opacity={0.24}
          zIndex={-1}
        >
          <Image src="/images/img_astronaut_store.png" alt="Store Img" />
        </Box>
        <RewardSalesFeaturedListProvider paymentType={paymentType}>
          <RewardSalesListProvider paymentType={paymentType}>
            <StorePageLayout
              header={<StoreHeader />}
              tabs={
                <>
                  <StoreTabs activeTab="buy-now" />

                  <Box
                    my={28}
                    px={28}
                    py={24}
                    bg="transparent"
                    borderRadius={radii.xs}
                    position="relative"
                  >
                    <Box
                      position="absolute"
                      w="100%"
                      h="100%"
                      background="linear-gradient(65.32deg, #f1616a, #9146ff, #9db3ff, #0d849e)"
                      opacity={0.12}
                      left={0}
                      top={0}
                      borderRadius={radii.xs}
                    />
                    <Flex alignItems="center" justifyContent="space-between">
                      <Flex alignItems="center" gridGap={space.xxxxxs}>
                        <Toggle
                          value={paymentType !== SalePaymentType.LEARN}
                          activeColor={colors.secondaryLight}
                          inactiveColor={colors.greenSuccess}
                          onChange={() =>
                            setPaymentType((prev) =>
                              !prev ? SalePaymentType.LEARN : undefined
                            )
                          }
                        />
                        <Text ml={space.xxxxs} color={colors.textPrimary}>
                          Pay using{" "}
                          <StyledSpan fontWeight={700}>LEARN</StyledSpan> tokens
                        </Text>
                        <Icon icon="LearnToken" size={20} />
                      </Flex>
                      <Link
                        href="https://web3.crater.club/"
                        boxProps={{ target: "_blank" }}
                      >
                        <Flex alignItems="center" gridGap={space.xxxxs}>
                          <Text color={colors.textPrimary}>
                            Know more about{" "}
                            <StyledSpan fontWeight={700}>LEARN</StyledSpan>{" "}
                            tokens
                          </Text>
                          <Icon
                            icon="PopOut"
                            size={20}
                            color={colors.textPrimary}
                          />
                        </Flex>
                      </Link>
                    </Flex>
                  </Box>
                </>
              }
              featured={
                <RewardSalesFeaturedListContext.Consumer>
                  {() => <TopItemsForSale />}
                </RewardSalesFeaturedListContext.Consumer>
              }
              explore={
                <RewardSalesListContext.Consumer>
                  {() => <MoreSaleItems />}
                </RewardSalesListContext.Consumer>
              }
              topSellers={
                <TopSellersList
                  sellers={sellers}
                  loading={sellersLoading}
                  followingCreator={followingCreator}
                  onFollow={followCreator}
                />
              }
              staticSection={<SellOnCraterStatic />}
            />
          </RewardSalesListProvider>
        </RewardSalesFeaturedListProvider>
      </Box>
      <Box px={[space.xxs, space.s]} py={space.xxs} bg={colors.primaryDark}>
        <Footer />
      </Box>
    </Box>
  );
}
