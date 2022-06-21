import { useTheme } from "styled-components";

import { IconOptions } from "@/common/theme";

import { Flex, Icon, Text } from "../../atoms";
import { Button, ButtonProps } from "../../atoms/v2";

interface IProps extends ButtonProps {
  label: string;
  icon: IconOptions;
}

export default function SocialShareButtons({
  label,
  icon,
  ...rest
}: IProps): JSX.Element {
  const { space } = useTheme();
  return (
    <Button variant="outline" {...rest}>
      <Flex gridGap={space.xxxs} alignItems="center" justifyContent="center">
        <Icon size={20} color="inherit" fill icon={icon} />
        <Text fontSize="inherit" fontWeight="500">
          {label}
        </Text>
      </Flex>
    </Button>
  );
}
