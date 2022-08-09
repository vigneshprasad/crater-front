import { AnimationControls } from "framer-motion";
import { CountryCode } from "libphonenumber-js";
import { useCallback, useMemo, useRef } from "react";
import styled, { useTheme } from "styled-components";

import { AnimatedBox, Text, Grid } from "@/common/components/atoms";
import { PhoneLib } from "@/common/utils/phone_lib";

interface ICountrListProps {
  active: CountryCode;
  animate: AnimationControls;
  backgroundColor?: string;
  onChange?: (code: CountryCode) => void;
}

const ItemWrapper = styled(Grid)`
  cursor: pointer;
  &:hover {
    background: ${({ theme }) => theme.colors.accent};
  }
`;

export default function CountriesList({
  active,
  animate,
  backgroundColor,
  onChange,
}: ICountrListProps): JSX.Element {
  const listContainerRef = useRef<HTMLDivElement>(null);
  const listItemsRef = useRef<Map<CountryCode, HTMLDivElement>>(new Map());
  const phoneLib = useMemo(() => new PhoneLib(), []);
  const { colors, zIndices, space, borders, radii } = useTheme();

  const handleOnChange = useCallback(
    (code: CountryCode) => {
      animate.start("hidden");
      if (onChange) {
        onChange(code);
      }
    },
    [onChange, animate]
  );

  const scrollIntoView = useCallback(() => {
    if (active) {
      const element = listItemsRef.current.get(active);
      const container = listContainerRef.current;
      if (element && container) {
        const top = element.offsetTop;
        const offset = 120;

        const scroll = top - offset;
        container.scroll({
          top: scroll,
        });
      }
    }
  }, [listItemsRef, active, listContainerRef]);

  return (
    <AnimatedBox
      onAnimationComplete={(anim) => {
        if (anim === "visible") {
          scrollIntoView();
        }
      }}
      ref={listContainerRef}
      onMouseDown={(e) => e.preventDefault()}
      position="absolute"
      pt={space.xxs}
      role="list"
      maxHeight={220}
      overflowY="auto"
      zIndex={zIndices.dropdownSheet}
      initial="hidden"
      animate={animate}
      left={0}
      right={0}
      bg={backgroundColor ?? colors.black[1]}
      border={`1px solid ${borders.input}`}
      borderRadius={radii.xxs}
      transition={{ duration: 0.2 }}
      variants={{
        hidden: {
          y: 0,
          opacity: 0,
          transitionEnd: {
            display: "none",
          },
        },
        visible: {
          display: "block",
          y: 44,
          opacity: 1,
        },
      }}
    >
      {phoneLib.countries.map((country) => {
        const isActive = country.cca2 === active;

        let phoneExtension;

        phoneExtension = `${country.idd.root}${country.idd.suffixes?.[0]}`;

        if (country.idd.suffixes.length > 1) {
          phoneExtension = country.idd.root;
        }

        return (
          <ItemWrapper
            ref={(ref) =>
              listItemsRef.current.set(
                country.cca2 as CountryCode,
                ref as HTMLDivElement
              )
            }
            onClick={() => handleOnChange(country.cca2 as CountryCode)}
            bg={isActive ? colors.accent : "transparent"}
            role="listitem"
            py={space.xxxs}
            key={country.cca3}
            gridTemplateColumns={["48px 1fr"]}
          >
            <Text textAlign="center">{country.flag}</Text>
            <Text>
              {country.name.common} ({phoneExtension})
            </Text>
          </ItemWrapper>
        );
      })}
    </AnimatedBox>
  );
}
