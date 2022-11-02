import { useAnimation } from "framer-motion";
import { useCallback, useEffect, useMemo, useState } from "react";
import styled, { useTheme } from "styled-components";
import useSWR from "swr";

import { AnimatedBox, Flex } from "..";
import { Icon } from "../Icon";
import { Box, BoxProps } from "../System/Box";
import { Grid } from "../System/Grid";
import { Text } from "../System/Text";

type BaseProps<T> = {
  labelGetter: (item: T) => string;
  placeholder?: string;
  value?: T[];
  maxLength?: number;
  error?: string;
  containerProps?: BoxProps & {
    hoverBorder?: string;
  };
  boxProps?: BoxProps;
  containerItemProps?: BoxProps;
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

const Container = styled(Box)<
  BoxProps & {
    hoverBorder?: string;
  }
>`
  &:hover {
    border: 1px solid
      ${({ theme: { colors }, hoverBorder }) =>
        hoverBorder ? hoverBorder : colors.textQuartenary};
  }

  &:focus {
    background: ${({ theme: { colors } }) => colors.primaryBackground};
    border: 1px solid
      ${({ theme: { colors }, hoverBorder }) =>
        hoverBorder ? hoverBorder : colors.textQuartenary};
  }

  &:disabled {
    border: 1px solid ${({ theme: { colors } }) => colors.secondaryLight};
    cursor: "not-allowed";
  }
`;

const StyledAnimatedBox = styled(AnimatedBox)`
  ::-webkit-scrollbar {
    width: 4px;
  }

  ::-webkit-scrollbar-thumb {
    background: ${({ theme: { colors } }) => colors.secondaryLight};
  }

  ::-webkit-scrollbar-track {
    background: ${({ theme: { colors } }) => colors.primaryDark};
  }
`;

const DropDownItemContainer = styled(Grid)`
  transition: all 200ms ease-in;

  &:hover {
    background: ${({ theme }) => theme.colors.secondaryLight};
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
  containerProps,
  boxProps,
  containerItemProps,
}: IMultiSelectProps<T>): JSX.Element {
  const [value, setValue] = useState([] as T[]);
  const { colors, space, radii, zIndices } = useTheme();
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

  const border = useMemo(() => {
    if (error) {
      return `1px solid ${colors.error}`;
    }

    return `1px solid ${colors.primaryLight}`;
  }, [error, colors]);

  return (
    <Box>
      <Container
        position="relative"
        p="0.8em 1em"
        bg={colors.primaryLight}
        borderRadius={radii.xxxxs}
        cursor="pointer"
        tabIndex={0}
        border={border}
        onBlur={handleBlur}
        hoverBorder={colors.accentLight}
        {...containerProps}
      >
        <Grid
          alignItems="center"
          gridTemplateColumns="1fr min-content"
          zIndex={zIndices.dropdownContainer}
          onClick={handleOnClickDropDown}
        >
          {(() => {
            if (!value.length) {
              return (
                <Text textStyle="captionLarge" color={colors.textQuartenary}>
                  {placeholder}
                </Text>
              );
            }

            return (
              <Grid
                gridAutoFlow="column"
                gridAutoColumns="min-content"
                alignItems="center"
                gridGap={space.xxxs}
              >
                {value.map((val) => (
                  <Flex
                    pl={space.xxxxs}
                    pr={space.xxxxxs}
                    py={4}
                    bg={colors.accent}
                    borderRadius={radii.xxs}
                    gridGap={space.xxxxxs}
                    alignItems="center"
                    key={labelGetter(val)}
                  >
                    <Text textStyle="captionLarge" color={colors.textPrimary}>
                      {labelGetter(val)}
                    </Text>
                    <Icon
                      icon="Close"
                      size={18}
                      onClick={(event) => {
                        event.stopPropagation();
                        handleItemClick(val);
                      }}
                    />
                  </Flex>
                ))}
              </Grid>
            );
          })()}
          <Icon icon="ArrowDown" color={colors.textQuartenary} fill />
        </Grid>
        <StyledAnimatedBox
          w="100%"
          maxHeight={220}
          overflowY="auto"
          animate={animate}
          initial="closed"
          variants={{
            closed: {
              display: "none",
              opacity: 0,
              top: 0,
            },
            opened: {
              display: "block",
              opacity: 1,
              top: "calc(100% + 2px)",
            },
          }}
          zIndex={10}
          position="absolute"
          borderRadius={radii.xxxxs}
          bg={colors.primaryDark}
          right={0}
          boxShadow="0px 4px 16px #000000"
          {...boxProps}
        >
          {listItems?.map((item) => {
            const checked = value.includes(item);
            return (
              <DropDownItemContainer
                my={space.xxs}
                mx={space.xxxs}
                cursor="pointer"
                key={labelGetter(item)}
                px={space.xxxs}
                py={space.xxxxs}
                gridTemplateColumns="1fr max-content"
                gridGap={space.xxxs}
                bg={checked ? colors.secondaryLight : undefined}
                borderRadius={radii.xxxxs}
                onClick={(event) => {
                  event.stopPropagation();
                  handleItemClick(item);
                }}
                {...containerItemProps}
              >
                <Text textStyle="body">{labelGetter(item)}</Text>
                <Icon
                  visibility={checked ? "visible" : "hidden"}
                  color={colors.accent}
                  size={18}
                  icon="Check"
                />
              </DropDownItemContainer>
            );
          })}
        </StyledAnimatedBox>
      </Container>
      {error && (
        <Text mt={space.xxxxxs} textStyle="error" color={colors.error}>
          {error}
        </Text>
      )}
    </Box>
  );
}
