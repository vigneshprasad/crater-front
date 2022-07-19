import { useTheme } from "styled-components";

import { useRouter } from "next/router";

import {
  AnimatedBox,
  Box,
  Flex,
  Image,
  Shimmer,
} from "@/common/components/atoms";
import { PageRoutes } from "@/common/constants/route.constants";
import { PastStreamListItemWithRecording } from "@/community/types/community";

type IProps = {
  pastStreams?: PastStreamListItemWithRecording[];
  activePastStreamIndex: number;
};

export default function HorizontalVideoSwitch({
  pastStreams,
  activePastStreamIndex,
}: IProps): JSX.Element {
  const router = useRouter();
  const { space, colors } = useTheme();

  return (
    <Flex pt={32} flexDirection="row" gridGap={space.xxxs}>
      {(() => {
        if (!pastStreams) {
          return Array(4)
            .fill("")
            .map((_, index) => <Shimmer w={136} h={78} key={index} />);
        }

        return pastStreams.map((stream, index) => (
          <Box key={stream.id}>
            <AnimatedBox
              animate={{
                scale: activePastStreamIndex === index ? 1.1 : 1.0,
                opacity: activePastStreamIndex === index ? 1 : 0.5,
              }}
              whileHover={{ scale: 1.1, opacity: 1 }}
              whileTap={{ scale: 0.9 }}
              transition={{ duration: 0.3 }}
              cursor="pointer"
              borderBottom={
                activePastStreamIndex === index
                  ? `2px solid ${colors.accentLight}`
                  : "none"
              }
              onClick={() => router.push(PageRoutes.streamVideo(stream.id))}
            >
              <Box mb={space.xxxxs} w={136} h={78}>
                <Image
                  src={stream.topic_detail.image}
                  alt={stream.topic_detail.name}
                />
              </Box>
            </AnimatedBox>
          </Box>
        ));
      })()}
    </Flex>
  );
}
