import styled, { useTheme } from "styled-components";

import useAuthModal from "@/auth/context/AuthModalContext";
import { Text } from "@/common/components/atoms";
import ModalWithVideo from "@/common/components/objects/ModalWithVideo";

import AuthForm from "../../forms/AuthForm";

const Span = styled.span`
  color: ${({ theme }) => theme.colors.accent};
`;

export default function AuthModal(): JSX.Element {
  const { onClose, visible } = useAuthModal();
  const { colors, space } = useTheme();

  return (
    <ModalWithVideo visible={visible} onClose={onClose}>
      <Text textStyle="headline5">
        Welcome to <Span>Crater</Span>
      </Text>
      <Text mb={space.xxs} variant="terms-conditions" color={colors.black[0]}>
        Crater is where 1000s of people come together every day to watch live
        streams by mentors & creators, interact with like minds and grow their
        network.
      </Text>
      <AuthForm />
    </ModalWithVideo>
  );
}
