import { useTheme } from "styled-components";

import { Text } from "@/common/components/atoms";
import ModalWithVideo from "@/common/components/objects/ModalWithVideo";

interface IProps {
  visible: boolean;
  onClose: () => void;
}

export default function TokenBidModal({
  visible,
  onClose,
}: IProps): JSX.Element {
  const { space, colors } = useTheme();

  return (
    <ModalWithVideo visible={visible} onClose={onClose}>
      <Text textStyle="headline5">is getting ready to stream live to you!</Text>

      <Text my={space.xs} color={colors.white[1]}>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
        veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
        commodo consequat. Duis aute irure dolor in reprehenderit in voluptate
        velit esse cillum dolore eu fugiat nulla pariatur.
      </Text>

      <Text textStyle="caption" mb={space.xxs}>
        Make Some Noise?
      </Text>
    </ModalWithVideo>
  );
}
