import { useTheme } from "styled-components";

import useAuthModal from "@/auth/context/AuthModalContext";
import { Modal, Box, Text } from "@/common/components/atoms";

import AuthForm from "../../forms/AuthForm";
import AuthModalLayout from "../../layouts/AuthModalLayout";

export default function AuthModal(): JSX.Element {
  const { onClose, visible } = useAuthModal();
  const { space } = useTheme();
  return (
    <Modal visible={visible} onClose={onClose} maxWidth={840} p={0}>
      <AuthModalLayout>
        <Box px={space.xs} py={space.s}>
          <Text mb={space.s} textStyle="headline4">
            Join Crater Today
          </Text>
          <AuthForm />
        </Box>
      </AuthModalLayout>
    </Modal>
  );
}
