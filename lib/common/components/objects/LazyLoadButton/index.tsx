import styled, { useTheme } from "styled-components";

import { Box, Icon, Text } from "../../atoms";

const StyledBox = styled(Box)`
  cursor: pointer;

  &:hover {
    .label-box {
      background: ${({ theme }) => theme.colors.accent};
    }

    .icon-box {
      background: ${({ theme }) => theme.colors.primaryLight};
    }
  }
`;

interface IProps {
  label: string;
  icon?: JSX.Element;
  iconTransform?: string;
  disabled?: boolean;
  onClick?: () => void;
}

export default function LazyLoadButton({
  label,
  icon,
  iconTransform,
  disabled = false,
  onClick,
}: IProps): JSX.Element {
  const { colors } = useTheme();

  return (
    <StyledBox
      display="flex"
      alignItems="center"
      onClick={onClick}
      style={{ pointerEvents: disabled ? "none" : "auto" }}
    >
      <Box
        className="label-box"
        p="9px 8px 9px 12px"
        h={40}
        bg={colors.primaryLight}
        borderRadius="8px 0px 0px 8px"
      >
        <Text
          fontSize="1.6rem"
          fontWeight={[500, 600]}
          lineHeight="2.4rem"
          color={colors.textSecondaryLight}
        >
          {label}
        </Text>
      </Box>
      <Box
        className="icon-box"
        p="10px 12px"
        bg={colors.primaryDark}
        borderRadius="0px 8px 8px 0px"
      >
        {icon ?? (
          <Icon icon="ShowMore" size={14} h={20} transform={iconTransform} />
        )}
      </Box>
    </StyledBox>
  );
}
