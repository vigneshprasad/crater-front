import { AnimatePresence } from "framer-motion";
import { useState } from "react";
import { useTheme } from "styled-components";

import useAuth from "@/auth/context/AuthContext";
import {
  Box,
  Icon,
  Grid,
  Text,
  Flex,
  AnimatedBox,
} from "@/common/components/atoms";
import { Button } from "@/common/components/atoms/v2";
import { useWebinar } from "@/community/context/WebinarContext";

import CreateAuctionForm from "../../forms/CreateAuctionForm";
import RewardCard, { RewardCardTypes } from "../RewardCard";

export default function AuctionsTab(): JSX.Element | null {
  const { space, colors } = useTheme();
  const { webinar } = useWebinar();
  const { user } = useAuth();

  const [formVisible, setFormVisible] = useState(false);

  if (!webinar || !user) return null;

  if (!webinar || !user) return null;

  const isHost = webinar.host === user.pk;

  return (
    <Box position="relative">
      <AnimatePresence>
        {formVisible === true && (
          <AnimatedBox
            position="absolute"
            top={0}
            left={0}
            right={0}
            bottom={0}
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
              h="100%"
              py={space.xxxs}
              gridTemplateRows="max-content minmax(0, 1fr)"
            >
              <Grid gridTemplateColumns="1fr 1fr 1fr" alignItems="center">
                <Text
                  fontWeight="500"
                  textStyle="body"
                  px={space.xxxxs}
                  cursor="pointer"
                  onClick={() => setFormVisible(false)}
                  color={colors["red-500"]}
                >
                  Discard
                </Text>
                <Text
                  textAlign="center"
                  textStyle="body"
                  color={colors.textTertiary}
                >
                  NEW AUCTION
                </Text>
              </Grid>
              <CreateAuctionForm />
            </Grid>
          </AnimatedBox>
        )}

        {/* Tab Content */}
        {!formVisible && (
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
                    onClick={() => setFormVisible(true)}
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
                <RewardCard
                  cardType={RewardCardTypes.Auction}
                  webinar={webinar}
                  buyers={12}
                  title="Anime Artwork - Watercolor"
                  price={500}
                  image="https://1worknetwork-prod.s3.amazonaws.com/media/c085c770-b7c5-4fdc-bb03-8b73684ee97f.png"
                  quantity={1}
                  description="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."
                />
                <RewardCard
                  cardType={RewardCardTypes.Auction}
                  webinar={webinar}
                  buyers={12}
                  title="Anime Artwork - Watercolor"
                  price={500}
                  image="https://1worknetwork-prod.s3.amazonaws.com/media/c085c770-b7c5-4fdc-bb03-8b73684ee97f.png"
                  quantity={1}
                />
              </Flex>
            </Grid>
          </AnimatedBox>
        )}
      </AnimatePresence>
    </Box>
  );
}
