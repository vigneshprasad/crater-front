import { useTheme } from "styled-components";

import useAuthModal from "@/auth/context/AuthModalContext";
import { Text } from "@/common/components/atoms";
import ModalWithVideo from "@/common/components/objects/ModalWithVideo";

import AuthForm from "../../forms/AuthForm";

export default function AuthModal(): JSX.Element {
  const { onClose, visible } = useAuthModal();
  const { space } = useTheme();

  return (
    <ModalWithVideo visible={visible} onClose={onClose}>
      <Text mb={space.s} textStyle="headline5">
        Join Crater Today
      </Text>
      <AuthForm />
    </ModalWithVideo>
  );
}
