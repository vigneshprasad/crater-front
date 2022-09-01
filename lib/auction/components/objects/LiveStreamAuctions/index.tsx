import { AnimatePresence } from "framer-motion";
import { useState } from "react";
import { useTheme } from "styled-components";

import { RewardSalesListProvider } from "@/auction/context/RewardSalesListContext";
import { AnimatedBox, Box, Grid } from "@/common/components/atoms";
import SegmentedTabs from "@/common/components/objects/SegmentedTabs";
import { Webinar } from "@/community/types/community";

import AuctionsTab from "../AuctionsTab";
import BuySubTab from "../BuySubTab";

function AnimatedTab({
  children,
}: {
  children?: React.ReactNode | undefined;
}): JSX.Element {
  return (
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
      {children}
    </AnimatedBox>
  );
}

interface IProps {
  webinar: Webinar;
}

export default function LiveStreamAuctions({
  webinar,
}: IProps): JSX.Element | null {
  const [activeTab, setActiveTab] = useState("Buy");
  const { space, colors } = useTheme();

  return (
    <Grid bg={colors.primaryDark} gridTemplateRows="max-content 1fr">
      <Box
        pt={space.xxxs}
        px={space.xxxxs}
        pb={space.xxxs}
        borderBottom={`1px solid ${colors.primaryLight}`}
      >
        <SegmentedTabs
          selected={activeTab}
          onTabClick={(tab) => {
            setActiveTab(tab);
          }}
          tabs={["Auctions", "Buy"]}
        />
      </Box>
      <AnimatePresence>
        {activeTab === "Auctions" && (
          <AnimatedTab>
            <AuctionsTab />
          </AnimatedTab>
        )}
        {activeTab === "Buy" && (
          <AnimatedTab>
            <RewardSalesListProvider
              creator={webinar.host_detail.creator_detail?.id}
            >
              <BuySubTab />
            </RewardSalesListProvider>
          </AnimatedTab>
        )}
      </AnimatePresence>
    </Grid>
  );
}
