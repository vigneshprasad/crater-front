import { AnimatePresence } from "framer-motion";
import { useTheme } from "styled-components";

import { AnimatedBox, Box, Icon, Text, Link } from "@/common/components/atoms";
import useAsideNavState from "@/common/hooks/ui/useAsideNavState";

import { NAV_ABOUT_LINKS } from "../../AppNavBar/v2/contants";
import { NAV_ITEMS, INavKeys } from "./constants";

interface IProps {
  activeTab?: INavKeys;
}

export default function MobileNav({ activeTab }: IProps): JSX.Element {
  const { zIndices, space, colors, borders } = useTheme();
  const { opened, setOpened } = useAsideNavState();
  return (
    <Box>
      {opened && (
        <AnimatedBox
          onClick={() => setOpened(false)}
          initial={{
            display: "block",
            opacity: 0,
          }}
          animate={{
            opacity: 1,
            transition: {
              duration: 0.1,
            },
          }}
          exit={{
            opacity: 0,
            transitionEnd: {
              display: "none",
            },
          }}
          zIndex={zIndices.overlay}
          position="fixed"
          top={0}
          right={0}
          left={0}
          bottom={0}
          bg={colors.overlay}
        />
      )}

      <AnimatePresence>
        {opened && (
          <AnimatedBox
            position="fixed"
            top={0}
            bottom={0}
            w={234}
            left={0}
            bg={colors.primaryDark}
            zIndex={zIndices.mobileAsideNav}
            initial={{
              display: "block",
              x: "-50%",
              opacity: 0,
            }}
            animate={{
              x: 0,
              opacity: 1,
              transition: {
                stiffness: 1,
                duration: 0.3,
              },
            }}
            exit={{
              x: "-50%",
              opacity: 0,
              transitionEnd: {
                display: "none",
              },
            }}
          >
            <Box
              py={space.xxxs}
              px={space.xxs}
              borderBottom={`1px solid ${borders.primary}`}
            >
              <Icon icon="Logo" w={93} h={40} />
            </Box>
            <Box borderBottom={`1px solid ${borders.primary}`}>
              {NAV_ITEMS.map(({ key, icon, label, route }) => {
                const active = activeTab === key;
                return (
                  <Link
                    href={route}
                    key={key}
                    boxProps={{ onClick: () => setOpened(false) }}
                  >
                    <AnimatedBox
                      gridGap={space.xxxs}
                      py={space.xxs}
                      px={space.xs}
                      display="flex"
                      color={active ? colors.accentLight : colors.textPrimary}
                    >
                      <Icon color="inherit" icon={icon} />
                      <Text color="inherit" textStyle="menu">
                        {label}
                      </Text>
                    </AnimatedBox>
                  </Link>
                );
              })}
            </Box>
            <Box py={space.xxxs} px={space.xxs}>
              <Text
                color={colors.textSecondary}
                textStyle="caption"
                textTransform="uppercase"
              >
                About
              </Text>
              {NAV_ABOUT_LINKS.map(({ key, route, label }) => (
                <Link
                  href={route}
                  key={key}
                  boxProps={{ onClick: () => setOpened(false) }}
                >
                  <Text py={space.xxs} color="inherit" textStyle="menu">
                    {label}
                  </Text>
                </Link>
              ))}
            </Box>
          </AnimatedBox>
        )}
      </AnimatePresence>
    </Box>
  );
}
