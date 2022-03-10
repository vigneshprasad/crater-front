import styled, { useTheme } from "styled-components";

import { Text, TextProps } from "../../atoms";

type IProps = React.HTMLAttributes<HTMLAnchorElement> & {
  children?: React.ReactNode;
  href: string;
};

const StyledText = styled(Text)<
  TextProps & {
    hoverColor?: string;
  }
>`
  &:hover {
    color: ${({ theme, hoverColor }) =>
      hoverColor ? hoverColor : theme.colors.accent};
  }
`;

export default function LinkText({ children, ...rest }: IProps): JSX.Element {
  const { colors } = useTheme();
  return (
    <a target="_blank" rel="noreferrer" {...rest}>
      <StyledText color={colors.slate} fontSize="1.4rem">
        {children}
      </StyledText>
    </a>
  );
}
