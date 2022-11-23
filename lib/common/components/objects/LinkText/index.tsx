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
  font: ${({ theme }) => theme.fonts.body};
  font-size: 1.4rem;
  font-weight: 500;
  line-height: 2.1rem;
  &:hover {
    color: ${({ theme, hoverColor }) =>
      hoverColor ? hoverColor : theme.colors.accentLight};
  }
`;

export default function LinkText({ children, ...rest }: IProps): JSX.Element {
  const { colors } = useTheme();
  return (
    <a target="_blank" rel="noreferrer" {...rest}>
      <StyledText color={colors.textPrimary} fontSize="1.4rem">
        {children}
      </StyledText>
    </a>
  );
}
