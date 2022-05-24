import { useAnimation } from "framer-motion";
import { useCallback, useEffect, useState } from "react";
import styled, { useTheme } from "styled-components";
import useSWR from "swr";

import { AnimatedBox } from "../Animated";
import { Icon } from "../Icon";
import { Box, Grid, Text } from "../System";

export type SelectProps<T> = {
  async?: boolean;
  items?: T[];
  dataUrl?: string;
  value?: unknown;
  itemLabelGetter: (val: T) => string;
  label: string;
  onChange?: (val: unknown) => void;
  dataTransform?: (val: T) => unknown;
};

const Container = styled(Box)`
  position: relative;
  background: ${({ theme: { colors } }) => colors.primaryLight};
  padding: 0.6em 1em;
  border-radius: ${({ theme: { radii } }) => radii.xxs}px;
  border: 1px solid ${({ theme: { colors } }) => colors.primaryDark};
  cursor: pointer;
  outline: none;

  &:hover {
    background: ${({ theme: { colors } }) => colors.primaryDarkSecondary};
  }

  &:focus {
    background: ${({ theme: { colors } }) => colors.primaryDarkSecondary};
    border: 1px solid ${({ theme: { colors } }) => colors.accent};
  }
`;

export function Select<T>({
  value: controlledValue,
  async = false,
  dataUrl,
  itemLabelGetter,
  label,
  items: intialItems,
  onChange,
  dataTransform,
}: SelectProps<T>): JSX.Element {
  const [items, setItems] = useState<T[]>(intialItems ?? []);
  const [value, setValue] = useState<T>();
  const [opened, setOpened] = useState(false);
  const { data: itemData, error } = useSWR<T[]>(dataUrl || null);

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
        onChange(data);
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
    if (!itemData || error) {
      return <Box>Loading...</Box>;
    }
  }

  return (
    <Container tabIndex={0} onBlur={() => setOpened(false)}>
      <Grid
        zIndex={50}
        gridTemplateColumns="1fr min-content"
        onClick={handleContainerClick}
      >
        {value ? (
          <Text textStyle="menu">{itemLabelGetter(value)}</Text>
        ) : (
          <Text textStyle="body" color={colors.slate}>
            {label}
          </Text>
        )}
        <Icon icon="ExpandMore" color={colors.textPrimary} fill />
      </Grid>
      <AnimatedBox
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
            top: "calc(100% + 6px)",
          },
        }}
        zIndex={10}
        position="absolute"
        borderRadius={radii.xxs}
        right={4}
        left={4}
        bg={colors.primaryLight}
        maxHeight={200}
        overflowY="auto"
      >
        {items.map((item) => (
          <Box
            cursor="pointer"
            key={itemLabelGetter(item)}
            px={space.xs}
            py={space.xxs}
            onClick={(event) => {
              event.stopPropagation();
              handleItemClick(item);
            }}
          >
            <Text>{itemLabelGetter(item)}</Text>
          </Box>
        ))}
      </AnimatedBox>
    </Container>
  );
}
