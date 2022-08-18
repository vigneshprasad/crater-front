import { AnimatePresence } from "framer-motion";
import { useState } from "react";
import { useTheme } from "styled-components";

import { AnimatedBox, Box, Grid } from "@/common/components/atoms";
import SegmentedTabs from "@/common/components/objects/SegmentedTabs";

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

export default function LiveStreamAuctions(): JSX.Element | null {
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
            <BuySubTab />
          </AnimatedTab>
        )}
      </AnimatePresence>
    </Grid>
  );
}
