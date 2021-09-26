import { useTheme } from "styled-components";

import { Grid, Text } from "@/common/components/atoms";
import AppLink, { AppLinkType } from "@/common/components/objects/AppLink";
import ModalWithVideo from "@/common/components/objects/ModalWithVideo";

interface IProps {
  visible: boolean;
  onClose: () => void;
}

export default function ConnectModal({
  visible,
  onClose,
}: IProps): JSX.Element {
  const { space, colors } = useTheme();

  const text = `
    To connect with members for curated live 1:1 interactions. 
    Download the mobile app & start networking. 
  `;
  return (
    <ModalWithVideo visible={visible} onClose={onClose} display="grid">
      <Text textStyle="headline5">Your network is waiting for you!</Text>

      <Text my={space.xs} color={colors.white[1]}>
        {text}
      </Text>

      <Text textStyle="caption" mb={space.xxs}>
        Get the app:
      </Text>

      <Grid
        gridAutoFlow="column"
        mt={space.xs}
        alignItems="start"
        gridGap={space.xs}
        gridAutoColumns="min-content"
      >
        <AppLink buttonType={AppLinkType.android} />
        <AppLink buttonType={AppLinkType.apple} />
      </Grid>
    </ModalWithVideo>
  );
}
