import { useState } from "react";
import styled, { useTheme } from "styled-components";

import {
  Box,
  Flex,
  Icon,
  Image,
  Span,
  Text,
  Toggle,
} from "@/common/components/atoms";
import Footer from "@/common/components/objects/Footer";
import { useFollower } from "@/creators/context/FollowerContext";
import {
  RewardSaleFeaturedItemsListContext,
  RewardSaleFeaturedItemsListProvider,
} from "@/tokens/context/RewardSaleFeaturedItemsListContext";
import {
  RewardSaleItemsListContext,
  RewardSaleItemsListProvider,
} from "@/tokens/context/RewardSaleItemsListContext";
import useRewardSaleTopSellersList from "@/tokens/context/RewardSaleTopSellersListContext";
import { RewardSalePaymentType } from "@/tokens/types/store";

import StorePageLayout from "../../layout/StorePageLayout";
import MoreSaleItems from "../../objects/MoreSaleItems";
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

export default function StoreBuyNowPage(): JSX.Element {
  const { space, colors, radii } = useTheme();
  const {
    sellers,
    loading: sellersLoading,
    mutateRewardSaleTopSellers,
  } = useRewardSaleTopSellersList();
  const { subscribeCreator } = useFollower();
  const [followingCreator, setFollowingCreator] = useState<number | null>(null);
  const [paymentType, setPaymentType] = useState<
    RewardSalePaymentType | undefined
  >(undefined);

  const followCreator = async (creator: number): Promise<void> => {
    if (creator) {
      setFollowingCreator(creator);
      await subscribeCreator(creator);
      await mutateRewardSaleTopSellers();
      setFollowingCreator(null);
    }
  };

  return (
    <Box>
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
        <RewardSaleFeaturedItemsListProvider paymentType={paymentType}>
          <RewardSaleItemsListProvider paymentType={paymentType}>
            <StorePageLayout
              header={<StoreHeader />}
              tabs={
                <>
                  <StoreTabs activeTab="buy-now" />

                  <Box
                    my={28}
                    px={28}
                    py={24}
                    bg={colors.primaryDark}
                    borderRadius={radii.xs}
                  >
                    <Flex alignItems="center" justifyContent="space-between">
                      <Flex alignItems="center" gridGap={space.xxxxxs}>
                        <Toggle
                          value={paymentType !== RewardSalePaymentType.Learn}
                          activeColor={colors.secondaryLight}
                          inactiveColor={colors.greenSuccess}
                          onChange={() =>
                            setPaymentType((prev) =>
                              !prev ? RewardSalePaymentType.Learn : undefined
                            )
                          }
                        />
                        <Text ml={space.xxxxs} color={colors.textPrimary}>
                          Pay using{" "}
                          <StyledSpan fontWeight={700}>LEARN</StyledSpan> tokens
                        </Text>
                        <Icon icon="LearnToken" size={20} />
                      </Flex>
                      <Flex alignItems="center" gridGap={space.xxxxs}>
                        <Text color={colors.textPrimary}>
                          Know more about{" "}
                          <StyledSpan fontWeight={700}>LEARN</StyledSpan> tokens
                        </Text>
                        <Icon
                          icon="PopOut"
                          size={20}
                          color={colors.textPrimary}
                        />
                      </Flex>
                    </Flex>
                  </Box>
                </>
              }
              featured={
                <RewardSaleFeaturedItemsListContext.Consumer>
                  {() => <TopItemsForSale />}
                </RewardSaleFeaturedItemsListContext.Consumer>
              }
              explore={
                <RewardSaleItemsListContext.Consumer>
                  {() => <MoreSaleItems />}
                </RewardSaleItemsListContext.Consumer>
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
          </RewardSaleItemsListProvider>
        </RewardSaleFeaturedItemsListProvider>
      </Box>
      <Box px={[space.xxs, space.s]} py={space.xxs} bg={colors.primaryDark}>
        <Footer />
      </Box>
    </Box>
  );
}
