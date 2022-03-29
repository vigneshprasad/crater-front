import { useTheme } from "styled-components";

import {
  Avatar,
  Box,
  Modal,
  Text,
  Flex,
  Grid,
} from "@/common/components/atoms";

interface IProps {
  visible: boolean;
  onClose: () => void;
}

export default function ReferralModal({
  visible,
  onClose,
}: IProps): JSX.Element {
  const { space, colors } = useTheme();

  const steps = [
    {
      text: "Share the referral link with your friends",
    },
    {
      text: "Your friend uses the link to sign up & watch their first stream",
    },
    {
      text: "You get ₹50 when they watch their first 20min of live content",
    },
    {
      text: "Withdraw the money or use it at the auctions",
    },
  ];

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
      alignItems="center"
    >
      <Box>
        <Text textStyle="headline4" pb={space.xs}>
          How it works?
        </Text>

        <Grid gridAutoFlow="row" gridGap={[space.xs, space.xxs]}>
          {steps.map((step, index) => (
            <Grid
              gridAutoFlow="column"
              gridTemplateColumns="max-content 1fr"
              gridGap={space.xxs}
              alignItems="center"
              key={index}
            >
              <Avatar size={44} />
              <Text>{step.text}</Text>
            </Grid>
          ))}
        </Grid>
      </Box>

      <Box
        px={space.xxs}
        border={`1px solid ${colors.slate}`}
        alignSelf="center"
      >
        <Text textStyle="headline6" py={space.xxs}>
          Track your referrals
        </Text>

        <Flex alignItems="center" justifyContent="space-between" pb={space.xxs}>
          <Text>Referrals who watched streams</Text>
          <Text>10</Text>
        </Flex>

        <Flex alignItems="center" justifyContent="space-between" pb={space.xxs}>
          <Text>Total Payable</Text>
          <Text>500</Text>
        </Flex>

        <Flex alignItems="center" justifyContent="space-between" pb={space.xxs}>
          <Text>Paid out</Text>
          <Text>350</Text>
        </Flex>

        <Flex alignItems="center" justifyContent="space-between" pb={space.xxs}>
          <Text>Outstanding</Text>
          <Text>200</Text>
        </Flex>
      </Box>
    </Modal>
  );
}
