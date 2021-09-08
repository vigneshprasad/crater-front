import { useAnimation } from "framer-motion";
import { useEffect, useState } from "react";
import styled, { useTheme } from "styled-components";

import { AnimatedBox } from "../Animated";
import { Icon } from "../Icon";
import { Box, Grid, Text } from "../System";

export type SelectItem = {
  value: string | number;
  id: string | number;
};

export type SelectProps = {
  label: string;
  items: SelectItem[];
};

const Container = styled(Box)`
  position: relative;
  background: ${({ theme: { colors } }) => colors.black[3]};
  padding: 16px 18px;
  border-radius: ${({ theme: { radii } }) => radii.xxs}px;
  border: 2px solid transparent;
  cursor: pointer;
  outline: none;

  &:hover {
    background: ${({ theme: { colors } }) => colors.black[2]};
    border: 2px solid ${({ theme: { colors } }) => colors.accent};
  }

  &:focus {
    background: ${({ theme: { colors } }) => colors.black[2]};
    border: 2px solid ${({ theme: { colors } }) => colors.accent};
  }
`;

export const Select = ({ label, items }: SelectProps) => {
  const [value, setValue] = useState<SelectItem>();
  const [opened, setOpened] = useState(false);

  const { colors, space, radii } = useTheme();

  const animate = useAnimation();

  const handleContainerClick = () => {
    setOpened((state) => !state);
  };

  const handleItemClick = (item: SelectItem) => {
    setValue(item);
    setOpened((state) => !state);
  };

  useEffect(() => {
    const variant = opened ? "opened" : "closed";
    animate.start(variant);
  }, [opened, animate]);

  return (
    <Container tabIndex={0} onBlur={() => setOpened(false)}>
      <Grid
        zIndex={50}
        gridTemplateColumns="1fr min-content"
        onClick={handleContainerClick}
      >
        <Text textStyle="menu">{value ? value.value : label}</Text>
        <Icon icon="ExpandMore" />
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
        bg={colors.black[2]}
      >
        {items.map((item) => (
          <Box
            cursor="pointer"
            key={item.id}
            px={space.xs}
            py={space.xs}
            onClick={(event) => {
              event.stopPropagation();
              handleItemClick(item);
            }}
          >
            <Text>{item.value}</Text>
          </Box>
        ))}
      </AnimatedBox>
    </Container>
  );
};
