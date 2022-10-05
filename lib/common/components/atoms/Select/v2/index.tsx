import { useAnimation } from "framer-motion";
import { useCallback, useEffect, useMemo, useState } from "react";
import styled, { useTheme } from "styled-components";
import useSWR from "swr";

import { AnimatedBox } from "../../Animated";
import { Icon } from "../../Icon";
import Spinner from "../../Spinner";
import { Box, BoxProps, Grid, Text, TextProps } from "../../System";

export type SelectProps<T> = {
  async?: boolean;
  items?: T[];
  dataUrl?: string;
  value?: unknown;
  defaultValue?: unknown;
  label: string;
  disabled?: boolean;
  error?: string;
  containerProps?: BoxProps & {
    hoverBorder?: string;
  };
  boxProps?: BoxProps;
  labelProps?: TextProps;
  containerItemProps?: BoxProps;
  itemLabelGetter: (val: T) => string;
  onChange?: (val: unknown) => void;
  dataTransform?: (val: T) => unknown;
};

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

const ContainerItem = styled(Box)`
  &:hover {
    background: ${({ theme: { colors } }) => colors.secondaryLight};
  }
`;

export default function Select<T>({
  value: controlledValue,
  defaultValue,
  async = false,
  dataUrl,
  itemLabelGetter,
  label,
  items: intialItems,
  onChange,
  dataTransform,
  disabled = false,
  error,
  containerProps,
  boxProps,
  labelProps,
  containerItemProps,
}: SelectProps<T>): JSX.Element {
  const [items, setItems] = useState<T[]>(intialItems ?? []);
  const [value, setValue] = useState<T>();
  const [opened, setOpened] = useState(false);
  const { data: itemData, error: itemDataError } = useSWR<T[]>(dataUrl || null);

  const { colors, space, radii } = useTheme();

  const animate = useAnimation();

  useEffect(() => {
    if (itemData) {
      setItems(itemData);
    }
  }, [itemData, setItems]);

  const handleItemChange = useCallback(
    (item: T) => {
      if (onChange) {
        const data = dataTransform ? dataTransform(item) : item;
        onChange(data as T);
      }
    },
    [onChange, dataTransform]
  );

  const handleContainerClick = (): void => {
    setOpened((state) => !state);
  };

  const handleItemClick = (item: T): void => {
    if (!controlledValue) {
      setValue(item);
    }

    setOpened((state) => !state);
    handleItemChange(item);
  };

  const border = useMemo(() => {
    if (disabled) {
      return `1px solid ${colors.secondaryLight}`;
    }

    return `1px solid ${error ? colors.error : colors.primaryLight}`;
  }, [disabled, error, colors]);

  useEffect(() => {
    const variant = opened ? "opened" : "closed";
    animate.start(variant);
  }, [opened, animate]);

  useEffect(() => {
    if (controlledValue && items) {
      const val = items.filter((item) => {
        if (dataTransform) {
          return dataTransform(item) === controlledValue;
        }
        return controlledValue === item;
      })[0];

      if (val) {
        setValue(val);
      }
    }
  }, [controlledValue, items, dataTransform]);

  if (async) {
    if (!itemData || itemDataError) {
      return <Spinner size={24} strokeColor={colors.textPrimary} />;
    }
  }

  return (
    <Box>
      <Container
        position="relative"
        p="0.8em 1em"
        bg={colors.primaryBackground}
        borderRadius={radii.xxxxs}
        cursor="pointer"
        tabIndex={0}
        onBlur={() => setOpened(false)}
        border={border}
        style={{ pointerEvents: disabled ? "none" : "auto" }}
        {...containerProps}
      >
        <Grid
          zIndex={50}
          gridTemplateColumns="1fr min-content"
          alignItems="center"
          onClick={handleContainerClick}
        >
          {value ? (
            <Text
              textStyle="body"
              color={disabled ? colors.secondaryLight : colors.textPrimary}
            >
              {itemLabelGetter(value)}
            </Text>
          ) : (
            <Text
              textStyle="body"
              color={disabled ? colors.secondaryLight : colors.textPrimary}
              {...labelProps}
            >
              {label}
            </Text>
          )}
          <Icon
            icon="ArrowDown"
            color={disabled ? colors.secondaryLight : colors.textQuartenary}
            fill
          />
        </Grid>
        <StyledAnimatedBox
          py={space.xxxxs}
          w="100%"
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
          boxShadow="0px 0px 16px #000000"
          {...boxProps}
        >
          {items.map((item) => {
            const selectedValue = value ? itemLabelGetter(value) : defaultValue;
            const selected = selectedValue === itemLabelGetter(item);

            return (
              <ContainerItem
                my={space.xxxxxs}
                cursor="pointer"
                key={itemLabelGetter(item)}
                px={space.xxxs}
                py={space.xxxxs}
                bg={selected ? colors.secondaryLight : undefined}
                borderRadius={2}
                onClick={(event) => {
                  event.stopPropagation();
                  handleItemClick(item);
                }}
                {...containerItemProps}
              >
                <Text textStyle="body">{itemLabelGetter(item)}</Text>
              </ContainerItem>
            );
          })}
        </StyledAnimatedBox>
      </Container>
      {error && (
        <Text mt={space.xxxxxs} color={colors.error} textStyle="error">
          {error}
        </Text>
      )}
    </Box>
  );
}
