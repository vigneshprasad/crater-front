import { useAnimation } from "framer-motion";
import styled, { useTheme } from "styled-components";

import { INavKeys, SIDE_NAV_ITEMS } from "@/common/constants/ui.constants";

import { AnimatedBox, Box, Icon, Link } from "../../atoms";

interface IProps {
  activeTab?: INavKeys;
}

const NavItemContainer = styled(Box)`
  display: grid;
  transition: all 100ms ease-in-out;
  background: ${({ theme }) => theme.colors.black[1]};
  border-radius: 4px;

  &:hover {
    background: ${({ theme }) => theme.colors.black[0]};
  }
`;

export default function AsideNav({ activeTab }: IProps): JSX.Element {
  const { space, colors, borders } = useTheme();
  const animate = useAnimation();

  return (
    <AnimatedBox
      display="grid"
      gridGap={space.xxs}
      gridAutoFlow="row"
      gridAutoRows="min-content"
      initial="collapsed"
      animate={animate}
      variants={{
        expanded: {
          width: 240,
        },
        collapsed: {
          width: 56,
        },
      }}
      bg={colors.black[4]}
      py={space.xxs}
      px={12}
      borderRight={`1px solid ${borders.main}`}
      layout
    >
      {SIDE_NAV_ITEMS.map(({ icon, key, url }) => {
        const color = key === activeTab ? colors.accent : colors.white[1];
        return (
          <Link href={url} key={key}>
            <NavItemContainer size={36}>
              <Icon color={color} size={20} m="auto auto" icon={icon} />
            </NavItemContainer>
          </Link>
        );
      })}
    </AnimatedBox>
  );
}
