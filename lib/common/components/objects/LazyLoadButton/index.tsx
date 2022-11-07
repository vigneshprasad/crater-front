import styled, { useTheme } from "styled-components";

import { Box, Icon, Text } from "../../atoms";

const StyledBox = styled(Box)`
  cursor: pointer;

  &:hover {
    .label-box {
      background: ${({ theme }) => theme.colors.secondaryLight};
    }

    .icon-box {
      background: ${({ theme }) => theme.colors.primaryLight};
    }
  }
`;

interface IProps {
  label: string;
  iconTransform?: string;
  onClick: () => void;
}

export default function LazyLoadButton({
  label,
  iconTransform,
  onClick,
}: IProps): JSX.Element {
  const { colors } = useTheme();

  return (
    <StyledBox display="flex" alignItems="center" onClick={onClick}>
      <Box
        className="label-box"
        p="9px 8px 9px 12px"
        h={40}
        bg={colors.primaryLight}
        borderRadius="8px 0px 0px 8px"
      >
        <Text
          textStyle="label"
          lineHeight="1.8rem"
          color={colors.textSecondary}
        >
          {label}
        </Text>
      </Box>
      <Box
        className="icon-box"
        p="9px 12px"
        h={40}
        bg={colors.primaryDark}
        borderRadius="0px 8px 8px 0px"
      >
        <Icon icon="ShowMore" size={14} h={20} transform={iconTransform} />
      </Box>
    </StyledBox>
  );
}
