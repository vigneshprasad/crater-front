import { useAnimation } from "framer-motion";
import { useTheme } from "styled-components";

import { SIDE_NAV_ITEMS } from "@/common/constants/ui.constants";

import { AnimatedBox, Icon } from "../../atoms";

export default function AsideNav(): JSX.Element {
  const { space, colors, borders } = useTheme();
  const animate = useAnimation();

  return (
    <AnimatedBox
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
      {SIDE_NAV_ITEMS.map(({ icon, key }) => (
        <AnimatedBox display="grid" w={32} h={32} key={key} gridGap={space.xxs}>
          <Icon color={colors.white[1]} size={20} m="auto auto" icon={icon} />
        </AnimatedBox>
      ))}
    </AnimatedBox>
  );
}
