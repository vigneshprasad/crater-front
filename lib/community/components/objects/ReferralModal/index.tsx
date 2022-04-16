import { useTheme } from "styled-components";

import { Box, Modal, Text } from "@/common/components/atoms";
import { ReferralSummary } from "@/tokens/types/referrals";

import ReferralStepsStatic from "../../../../tokens/components/objects/ReferralStepsStatic";
import TrackReferralsBox from "../TrackReferralsBox";

interface IProps {
  referralSummary?: ReferralSummary;
  visible: boolean;
  onClose: () => void;
}

export default function ReferralModal({
  referralSummary,
  visible,
  onClose,
}: IProps): JSX.Element {
  const { space } = useTheme();

  return (
    <Modal
      maxWidth={800}
      maxHeight={400}
      visible={visible}
      onClose={onClose}
      display="grid"
      gridTemplateColumns={["1fr", "1fr 300px"]}
      gridTemplateRows={["1fr 300px", "1fr"]}
      p={space.xs}
      gridGap={space.xxs}
      overflowY={["auto", "hidden"]}
    >
      <Box>
        <Text textStyle="headline4" pb={space.xs}>
          How it works?
        </Text>

        <ReferralStepsStatic />
      </Box>

      <TrackReferralsBox referralSummary={referralSummary} />
    </Modal>
  );
}
