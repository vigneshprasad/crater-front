import { useState } from "react";
import { useTheme } from "styled-components";

import { Box, Grid, Text } from "@/common/components/atoms";
import useAnalytics from "@/common/utils/analytics/AnalyticsContext";
import { AnalyticsEvents } from "@/common/utils/analytics/types";
import { useCreatorCommunityMembers } from "@/creators/context/CreatorCommunityContext";

import CommunityMemberItem from "../CommunityMemberItem";
import ConnectModal from "../ConnectModal";

export default function CreatorClubTab(): JSX.Element {
  const [showConnect, setShowConnect] = useState(false);
  const { space } = useTheme();
  const { members, loading } = useCreatorCommunityMembers();
  const { track } = useAnalytics();

  return (
    <Box px={[space.xs, space.s]}>
      <ConnectModal
        visible={showConnect}
        onClose={() => setShowConnect(false)}
      />

      <Box py={[space.xs, space.s]}>
        <Text textStyle="title">Community Members</Text>
      </Box>

      <Grid
        gridTemplateColumns={["1fr", "repeat(auto-fill, minmax(160px, 1fr))"]}
      >
        {(() => {
          if (loading) {
            return <Box>Loading...</Box>;
          }

          if (!members || !members.length) {
            return <Box>No members</Box>;
          }

          return members.map((member) => (
            <CommunityMemberItem
              key={member.id}
              name={member.profile_detail.name}
              image={member.profile_detail.photo}
              tagLine={member.profile_detail.tag_list[0]?.name}
              onClick={() => {
                track(AnalyticsEvents.connect_with_clicked);
                setShowConnect(true);
              }}
            />
          ));
        })()}
      </Grid>
    </Box>
  );
}
