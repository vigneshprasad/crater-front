import styled from "styled-components";

import { Text, TextProps } from "@/common/components/atoms/System";

type Props = TextProps;

const StyledText = styled(Text)<Props>`
  position: relative;

  &::before {
    font-family: ${({ theme }) => theme.fonts.heading};
    position: absolute;
    content: "Crater";
    font-size: 10.8rem;
    font-weight: 600;
    color: ${({ theme }) => theme.colors.whiteAlpha[1]};
    top: 50%;
    transform: translateY(-50%);
  }

  &::after {
    left: 0;
    bottom: ${({ theme }) => `-${theme.space.xs}px`};
    position: absolute;
    content: "";
    width: 3%;
    height: 4px;
    background: ${({ theme }) => theme.colors.accent};
    border-radius: 12px;
  }
`;

StyledText.defaultProps = {
  textStyle: "headline3",
};

const TabHeading: React.FC<Props> = ({ children, ...rest }) => {
  return (
    <StyledText as="h4" {...rest}>
      {children}
    </StyledText>
  );
};

export default TabHeading;
