import { AnimatePresence } from "framer-motion";
import { useState } from "react";
import { useTheme } from "styled-components";

import useRewardSalesList from "@/auction/context/RewardSalesListContext";
import { RewardSale } from "@/auction/types/sales";
import useAuth from "@/auth/context/AuthContext";
import {
  Box,
  Icon,
  Grid,
  Text,
  Flex,
  AnimatedBox,
  Shimmer,
} from "@/common/components/atoms";
import { Button } from "@/common/components/atoms/v2";
import { useNotifications } from "@/common/components/objects/NotificationStack/context";
import { useWebinar } from "@/community/context/WebinarContext";

import CreateSaleForm from "../../forms/CreateSaleForm";
import PayItemModal from "../PayItemModal";
import RewardCard, { RewardCardTypes } from "../RewardCard";

enum Pages {
  createBid,
  bidList,
  purchaseBid,
}

export default function BuySubTab(): JSX.Element | null {
  const { space, colors } = useTheme();
  const { webinar } = useWebinar();
  const { user } = useAuth();
  const [showPurchaseModal, setShowPurchaseModal] = useState(false);
  const { sales, isValidating } = useRewardSalesList();
  const [buySale, setBuySale] = useState<RewardSale | undefined>(undefined);
  const { showNotification } = useNotifications();

  const [currentPage, setPage] = useState(Pages.bidList);

  if (!webinar || !user) return null;

  if (!webinar || !user) return null;

  const isHost = webinar.host === user.pk;

  return (
    <Box position="relative" h="100%">
      <AnimatePresence>
        {currentPage === Pages.createBid && (
          <AnimatedBox
            position="absolute"
            top={0}
            left={0}
            right={0}
            bottom={0}
            initial={{
              display: "grid",
              opacity: 0,
            }}
            animate={{
              display: "grid",
              opacity: 1,
            }}
            exit={{
              opacity: 0,
              transitionEnd: {
                display: "none",
              },
            }}
            gridTemplateRows="max-content 1fr"
            overflow="hidden"
            height="100%"
          >
            <Grid
              gridTemplateColumns="1fr 1fr 1fr"
              alignItems="center"
              py={space.xxxxs}
            >
              <Text
                fontWeight="500"
                textStyle="body"
                px={space.xxxxs}
                cursor="pointer"
                onClick={() => setPage(Pages.bidList)}
                color={colors["red-500"]}
              >
                Discard
              </Text>
              <Text
                textAlign="center"
                textStyle="body"
                color={colors.textTertiary}
              >
                NEW SALE
              </Text>
            </Grid>
            <Box position="relative">
              <CreateSaleForm />
            </Box>
          </AnimatedBox>
        )}

        {/* Tab Content */}
        {currentPage === Pages.bidList && (
          <AnimatedBox
            initial={{
              display: "block",
              opacity: 0,
            }}
            animate={{
              display: "block",
              opacity: 1,
            }}
            exit={{
              opacity: 0,
              transitionEnd: {
                display: "none",
              },
            }}
          >
            <Grid
              px={space.xxxxs}
              py={space.xxxxs}
              gridTemplateRows="max-content minmax(0, 1fr)"
              gridGap={space.xxxxs}
            >
              <Box>
                {isHost && (
                  <Button
                    w="100%"
                    variant="outline-dark"
                    onClick={() => setPage(Pages.createBid)}
                  >
                    <Flex
                      alignItems="center"
                      justifyContent="center"
                      gridGap={space.xxxxs}
                    >
                      <Text
                        cursor="pointer"
                        fontSize="inherit"
                        fontWeight="inherit"
                      >
                        Add New
                      </Text>
                      <Icon fill color={colors.white[0]} icon="Add" size={18} />
                    </Flex>
                  </Button>
                )}
              </Box>
              <Flex flexDirection="column" gridGap={space.xxxxs}>
                {(() => {
                  if (isValidating || !sales) {
                    return Array(3)
                      .fill("")
                      .map((_, index) => <Shimmer key={index} h={120} />);
                  }
                  return sales?.map((sale) => (
                    <RewardCard
                      cardType={RewardCardTypes.Sale}
                      webinar={webinar}
                      key={sale.id}
                      title={sale.reward_detail.title}
                      quantity={sale.quantity}
                      buyers={sale.quantity_sold}
                      price={sale.price}
                      description={sale.reward_detail.description}
                      image={sale.reward_detail.photo}
                      onClickBuySale={() => {
                        showNotification(
                          {
                            content: "This is a notification",
                          },
                          2000,
                          false
                        );
                        setBuySale(sale);
                        setShowPurchaseModal(true);
                      }}
                    />
                  ));
                })()}
              </Flex>
            </Grid>
            {buySale && webinar.host_detail.creator_detail?.id && (
              <PayItemModal
                creator={webinar.host_detail.creator_detail.id}
                sale={buySale}
                visible={showPurchaseModal}
                onClose={() => setShowPurchaseModal(false)}
              />
            )}
          </AnimatedBox>
        )}

        {currentPage === Pages.purchaseBid && (
          <AnimatedBox
            initial={{
              display: "block",
              opacity: 0,
            }}
            animate={{
              display: "block",
              opacity: 1,
            }}
            exit={{
              opacity: 0,
              transitionEnd: {
                display: "none",
              },
            }}
          >
            <Flex
              py={space.xxxs}
              px={space.xxxs}
              flexDirection="column"
              gridGap={space.xxxs}
            >
              <Flex justifyContent="space-between" alignItems="center">
                <Text
                  textAlign="center"
                  textStyle="body"
                  color={colors.textTertiary}
                >
                  PURCHASE ITEM
                </Text>
                <Icon
                  icon="Close"
                  cursor="pointer"
                  onClick={() => setPage(Pages.bidList)}
                />
              </Flex>
              <Box>
                <Box
                  p={space.xxs}
                  border={`1px solid ${colors.accent}`}
                  borderRadius={4}
                >
                  <Text>Anime artwork made with water colors</Text>
                </Box>
              </Box>
            </Flex>
          </AnimatedBox>
        )}
      </AnimatePresence>
    </Box>
  );
}
