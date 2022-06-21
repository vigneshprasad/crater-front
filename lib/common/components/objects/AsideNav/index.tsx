import { motion, AnimateSharedLayout } from "framer-motion";
import styled, { useTheme } from "styled-components";

import { INavKeys, SIDE_NAV_ITEMS } from "@/common/constants/ui.constants";

import { AnimatedBox, Grid, Icon, Link, Text } from "../../atoms";

interface IProps {
  activeTab?: INavKeys;
}

const NavItemContainer = styled(Grid)`
  border-radius: 4px;

  &:hover {
    background: ${({ theme }) => theme.colors.black[0]};
  }
`;

const AnimatedText = motion(Text);

AnimatedText.defaultProps = {
  transition: {
    duration: 0.2,
  },
  variants: {
    hidden: {
      opacity: 0,
      transitionEnd: {
        display: "none",
      },
    },
    collapsed: {
      opacity: 0,
      transitionEnd: {
        display: "none",
      },
    },
    expanded: {
      display: "block",
      opacity: 1,
    },
  },
};

export default function AsideNav({ activeTab }: IProps): JSX.Element {
  const { space, colors, borders, zIndices } = useTheme();

  return (
    <AnimateSharedLayout>
      <AnimatedBox
        layout
        role="nav"
        display="grid"
        gridGap={space.xxs}
        gridAutoFlow="row"
        gridAutoRows="max-content"
        gridAutoColumns="1fr"
        variants={{
          collapsed: {
            width: 56,
            opacity: 1,
            transition: {
              when: "beforeChildren",
              staggerChildren: 0.1,
            },
          },
          hidden: {
            width: 0,
            opacity: 0,
            transition: {
              when: "afterChildren",
            },
          },
          expanded: {
            width: 200,
            opacity: 1,
            transition: {
              duration: 0.2,
              when: "beforeChildren",
              staggerChildren: 0.1,
            },
          },
        }}
        bg={colors.black[5]}
        py={[space.xxs]}
        px={[0, 16]}
        borderRight={`1px solid ${borders.main}`}
        justifyContent={["start", "center"]}
        zIndex={zIndices.asideNav}
      >
        {SIDE_NAV_ITEMS.map(({ icon, key, url, label, iconFill }) => {
          const color = key === activeTab ? colors.accent : colors.white[1];
          return (
            <Link href={url} key={key}>
              <NavItemContainer
                px={[space.xxxs, 0]}
                w={["auto", 40]}
                h={40}
                alignItems={["center"]}
                gridTemplateColumns={["40px 1fr", "1fr"]}
                gridGap={[space.xxxs, space.xxs]}
              >
                <Icon
                  color={color}
                  size={20}
                  m="auto auto"
                  icon={icon}
                  fill={iconFill}
                />
                <AnimatedText textStyle="menu" color={color}>
                  {label}
                </AnimatedText>
              </NavItemContainer>
            </Link>
          );
        })}
      </AnimatedBox>
    </AnimateSharedLayout>
  );
}
