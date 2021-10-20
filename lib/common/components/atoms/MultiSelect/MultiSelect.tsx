import { useAnimation } from "framer-motion";
import { useCallback, useEffect, useMemo, useState } from "react";
import styled, { useTheme } from "styled-components";
import useSWR from "swr";

import { AnimatedBox } from "..";
import { Icon } from "../Icon";
import { Box } from "../System/Box";
import { Grid } from "../System/Grid";
import { Text } from "../System/Text";

type BaseProps<T> = {
  labelGetter: (item: T) => string;
  placeholder?: string;
  value?: T[];
  maxLength?: number;
  error?: string;
  onChange?: (value: T[]) => void;
};

type AsyncProps<T> = BaseProps<T> & {
  dataUrl: string;
  items?: undefined;
};

type StaticProps<T> = BaseProps<T> & {
  items: T[];
  dataUrl?: undefined;
};

export type IMultiSelectProps<T> = AsyncProps<T> | StaticProps<T>;

const Container = styled(Box)`
  position: relative;
  background: ${({ theme: { colors } }) => colors.black[4]};
  padding: 10px 16px;
  border-radius: ${({ theme: { radii } }) => radii.xxs}px;
  border: 2px solid transparent;
  cursor: pointer;
  outline: none;

  &:hover {
    background: ${({ theme: { colors } }) => colors.black[2]};
  }

  &:focus {
    background: ${({ theme: { colors } }) => colors.black[2]};
    border: 2px solid ${({ theme: { colors } }) => colors.accent};
  }
`;

const DropDownItemContainer = styled(Grid)`
  transition: all 200ms ease-in;

  &:hover {
    background: ${({ theme }) => theme.colors.accent};
  }
`;

export function MultiSelect<T>({
  dataUrl,
  items,
  placeholder = "Select a value",
  maxLength = 1,
  error,
  labelGetter,
  onChange,
  value: controlledValue,
}: IMultiSelectProps<T>): JSX.Element {
  const [value, setValue] = useState([] as T[]);
  const { colors, space, radii } = useTheme();
  const animate = useAnimation();
  const { data: remoteItems } = useSWR<T[]>(dataUrl ? dataUrl : null);

  const handleOnClickDropDown = (): void => {
    animate.start("opened");
  };

  const handleBlur = (): void => {
    animate.start("closed");
  };

  const handleItemClick = useCallback(
    (item: T): void => {
      let newVal;
      if (value.includes(item)) {
        newVal = value.filter((e) => e !== item);
      } else {
        if (value.length < maxLength) {
          newVal = [...value, item];
        }
      }

      if (newVal) {
        setValue(newVal);
        if (onChange) {
          onChange(newVal);
        }
      }
    },
    [onChange, value, maxLength]
  );

  const listItems = useMemo(() => {
    if (dataUrl) {
      return remoteItems as T[];
    }
    return items as T[];
  }, [remoteItems, items, dataUrl]);

  useEffect(() => {
    if (controlledValue && controlledValue !== value) {
      setValue(controlledValue);
    }
  }, [controlledValue, setValue, value]);

  return (
    <>
      <Container tabIndex={0} onBlur={handleBlur}>
        <Grid
          alignItems="center"
          gridTemplateColumns="1fr max-content"
          onClick={handleOnClickDropDown}
        >
          {(() => {
            if (!value.length) {
              return (
                <Text color={colors.slate} textStyle="placeholder">
                  {placeholder}
                </Text>
              );
            }

            return (
              <Grid
                gridAutoFlow="column"
                gridAutoColumns="min-content"
                gridGap={space.xxxs}
              >
                {value.map((val) => (
                  <Box
                    px={space.xxxs}
                    py={4}
                    key={labelGetter(val)}
                    bg={colors.accent}
                    borderRadius={radii.xxs}
                  >
                    <Text textStyle="dropdownItem">{labelGetter(val)}</Text>
                  </Box>
                ))}
              </Grid>
            );
          })()}

          <Icon icon="ExpandMore" color={colors.white[0]} fill />
        </Grid>
        <AnimatedBox
          borderRadius={`0 0 ${radii.xxs}px ${radii.xxs}px`}
          initial="closed"
          right={4}
          left={4}
          maxHeight={180}
          overflowY="auto"
          bg={colors.black[2]}
          position="absolute"
          animate={animate}
          variants={{
            closed: {
              opacity: 0,
              y: 0,
              transitionEnd: {
                display: "none",
              },
            },
            opened: {
              display: "block",
              opacity: 1,
              y: 16,
            },
          }}
        >
          {listItems?.map((item) => {
            const checked = value.includes(item);
            return (
              <DropDownItemContainer
                py={space.xxxs}
                px={space.xxs}
                key={labelGetter(item)}
                gridTemplateColumns="max-content 1fr"
                gridGap={space.xxxs}
                alignItems="center"
                onClick={() => handleItemClick(item)}
              >
                <Icon
                  visibility={checked ? "visible" : "hidden"}
                  color={colors.accent}
                  size={18}
                  icon="Check"
                />
                <Text>{labelGetter(item)}</Text>
              </DropDownItemContainer>
            );
          })}
        </AnimatedBox>
      </Container>
      {error && (
        <Text textStyle="error" color={colors.error}>
          {error}
        </Text>
      )}
    </>
  );
}
