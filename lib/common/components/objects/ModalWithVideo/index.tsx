import { PropsWithChildren } from "hoist-non-react-statics/node_modules/@types/react";
import styled, { useTheme } from "styled-components";

import { Modal, IModalProps, Grid, Box } from "../../atoms";

type IProps = IModalProps &
  PropsWithChildren<{
    visible: boolean;
    onClose?: () => void;
  }>;

const Video = styled.video`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

export default function ModalWithVideo({
  visible,
  onClose,
  children,
  ...rest
}: IProps): JSX.Element {
  const { space } = useTheme();
  const videoUrl =
    "https://1worknetwork-prod.s3.amazonaws.com/media/mp4_rsvp.mp4";
  return (
    <Modal
      maxWidth={["calc(100% - 32px)", 720]}
      visible={visible}
      px={0}
      py={0}
      onClose={onClose}
      overflowY="auto"
      {...rest}
    >
      <Grid gridTemplateColumns={["1fr", "1fr 1fr"]} gridGap={space.s}>
        <Video autoPlay loop muted>
          <source src={videoUrl} type="video/mp4" />
        </Video>
        <Box px={[space.xxs, space.xs]} py={[space.xxs, space.m]}>
          {children}
        </Box>
      </Grid>
    </Modal>
  );
}
