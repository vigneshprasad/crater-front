import { useState } from "react";

import {
  AnimatedBox,
  Box,
  Text,
  BackgroundVideo,
  Grid,
} from "@/common/components/atoms";
import useMeta from "@/common/context/MetaContext";
import { theme } from "@/common/theme";
import NetworkRow from "@/community/components/objects/NetworkRow";
import { useCreatorsList } from "@/creators/context/CreatorsListContext";

import ConnectModal from "../../objects/ConnectModal";
import CreatorsList from "../../objects/CreatorsList";

export type ICommunityPageProps = {
  clubs?: string;
};

export default function CommunityPage(): JSX.Element {
  const [visible, setVisible] = useState(false);
  const { space, colors } = theme;
  const { creators, loading: creatorsLoading } = useCreatorsList();
  const { userTags, loading: tagsLoading } = useMeta();
  const videoUrl =
    "https://1worknetwork-prod.s3.amazonaws.com/media/mp4_community_banner.mp4";

  return (
    <>
      <Box px={[space.xs, space.s]} py={space.xxs}>
        <Text textStyle="headlineBold">Crater Featured</Text>
      </Box>
      <CreatorsList loading={creatorsLoading} creators={creators} />

      <BackgroundVideo my={space.xs} h={[72, 180]} muted autoPlay loop w="100%">
        <source src={videoUrl} type="video/mp4" />
      </BackgroundVideo>

      <Box px={[space.xs, space.s]} py={space.xxs}>
        <Text textStyle="headlineBold">Member Only</Text>
        <Text color={colors.slate}>
          Let the AI match you or request a meeting with your preferences
        </Text>
      </Box>
      <>
        {(() => {
          if (tagsLoading) {
            return (
              <Grid
                gridAutoFlow="column"
                px={[space.xs, space.s]}
                py={space.xs}
                gridGap={space.xs}
                gridAutoColumns="min-content"
              >
                {Array(4)
                  .fill("")
                  .map((_, index) => (
                    <AnimatedBox
                      w={180}
                      key={index}
                      h={[200, 220]}
                      animate={{ background: ["#353535", "#a8a8a8"] }}
                      transition={{ flip: Infinity, duration: 1 }}
                    />
                  ))}
              </Grid>
            );
          }

          return userTags?.map((tag) => (
            <NetworkRow
              px={[space.xs, space.s]}
              py={space.xs}
              tag={tag}
              key={tag.pk}
              onClickItem={() => setVisible(true)}
              onClickCardButton={() => setVisible(true)}
            />
          ));
        })()}
      </>

      <ConnectModal visible={visible} onClose={() => setVisible(false)} />
    </>
  );
}
