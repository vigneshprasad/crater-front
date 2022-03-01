import { useState } from "react";
import { useTheme } from "styled-components";

import { Box, Text } from "@/common/components/atoms";
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
      <Box px={space.s}>
        <Box
          my={space.xxs}
          background={colors.whiteAlpha[1]}
          px={space.xxs}
          py={space.xxs}
          borderRadius={radii.xxs}
        >
          <Text textStyle="headline6" mb={space.xxxxs}>
            Get access to exclusive (Content, Time, Communities, Art, NFTS )
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
                        setShowModal(true);
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
