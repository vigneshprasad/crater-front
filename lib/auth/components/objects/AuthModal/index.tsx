import { useTheme } from "styled-components";

import useAuthModal from "@/auth/context/AuthModalContext";
import { Modal, Box, Text } from "@/common/components/atoms";

import AuthForm from "../../forms/AuthForm";

export default function AuthModal(): JSX.Element {
  const { onClose, visible } = useAuthModal();
  const { space } = useTheme();
  return (
    <Modal visible={visible} onClose={onClose} maxWidth={420} p={0}>
      <Box px={space.xs} py={space.s}>
        <Text mb={space.s} textStyle="headline5">
          Join Crater Today
        </Text>
        <AuthForm />
      </Box>
    </Modal>
  );
}
