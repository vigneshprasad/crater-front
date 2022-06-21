import styled from "styled-components";

import { Text, TextProps } from "@/common/components/atoms/System";

type Props = TextProps;

const StyledText = styled(Text)<Props>`
  position: relative;
  font-weight: 400;

  &::before {
    font-family: ${({ theme }) => theme.fonts.heading};
    position: absolute;
    content: "Crater";
    font-size: 10.8rem;
    font-weight: 400;
    color: ${({ theme }) => theme.colors.whiteAlpha[1]};
    top: 50%;
    transform: translateY(-60%);
  }

  &::after {
    left: 0;
    bottom: ${({ theme }) => `-${theme.space.xs}px`};
    position: absolute;
    content: "";
    width: 24px;
    height: 4px;
    background: ${({ theme }) => theme.colors.accent};
    border-radius: 12px;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints[0]}) {
    &::before {
      font-size: 6.8rem;
      font-weight: 600;
    }

    &::after {
      bottom: ${({ theme }) => `-${theme.space.xxs}px`};
      width: 24px;
    }
  }
`;

StyledText.defaultProps = {
  textStyle: "headline3",
};

export default function TabHeading({ children, ...rest }: Props): JSX.Element {
  return (
    <StyledText as="h4" {...rest}>
      {children}
    </StyledText>
  );
}
