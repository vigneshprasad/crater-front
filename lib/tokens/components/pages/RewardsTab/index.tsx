import { useState } from "react";
import { useTheme } from "styled-components";

import { useRouter } from "next/router";

import { Box, Text, Span } from "@/common/components/atoms";
import TypingText from "@/common/components/objects/TypingText";
import colors from "@/common/theme/colors";
import { Creator } from "@/creators/types/creator";
import useRewardTypeList from "@/tokens/context/RewardTypeListContext";
import {
  RewardsListProvider,
  RewardsContext,
} from "@/tokens/context/RewardsListContext";
import { Reward } from "@/tokens/types/token";

import RewardBidModal from "../../objects/RewardBidModal";
import RewardsList from "../../objects/RewardsList";

export default function RewardsTab(): JSX.Element {
  const { space, radii } = useTheme();
  const { types } = useRewardTypeList();
  const router = useRouter();

  const [showModal, setShowModal] = useState(false);
  const [activeCreator, setActiveCreator] = useState<Creator | undefined>(
    undefined
  );
  const [activeReward, setActiveReward] = useState<Reward | undefined>(
    undefined
  );

  return (
    <>
      {activeCreator && activeReward && (
        <RewardBidModal
          creator={activeCreator}
          reward={activeReward}
          visible={showModal}
          onClose={() => setShowModal(false)}
        />
      )}
      <Box px={[space.xxs, space.s]}>
        <Box
          my={space.xs}
          background={colors.whiteAlpha[1]}
          px={space.xxs}
          py={space.xxs}
          borderRadius={radii.xxs}
          backgroundImage={`url('/images/img_auction_inactive.png')`}
          backgroundSize="contain"
          backgroundPosition="right"
          backgroundRepeat="no-repeat"
        >
          <Text textStyle="headline6" mb={space.xxxxs}>
            Get access to exclusive{" "}
            <Span color={colors.accent}>
              <TypingText strings={["Content", "Time", "Communities", "Art"]} />
            </Span>{" "}
            with Creators
          </Text>
          <Text>
            Think of it like Ebay but for content &amp; communities. Bid &gt;
            Accept &gt; Get access
          </Text>
        </Box>

        {types &&
          types.map((type) => (
            <RewardsListProvider key={type.id} filterRewardTypeId={type.id}>
              <RewardsContext.Consumer>
                {({ rewards, loading }) => (
                  <Box>
                    <Text textStyle="headline6">{type.name}</Text>
                    <RewardsList
                      rewards={rewards}
                      loading={loading}
                      key={type.id}
                      onClickReward={(reward) => {
                        setActiveCreator(reward.creator_detail);
                        setActiveReward(reward);
                        // setShowModal(true);
                        router.push(
                          `/auction/${reward.creator_detail.slug}/${reward.id}`
                        );
                      }}
                    />
                  </Box>
                )}
              </RewardsContext.Consumer>
            </RewardsListProvider>
          ))}
      </Box>
    </>
  );
}
