import { AnimatePresence } from "framer-motion";
import EMOJI_IMAGE_LIST, { EmojiKeys } from "public/images/emoji";
import { useState, useEffect } from "react";
import { useTheme } from "styled-components";

import { AnimatedBox, Grid, Box, Image } from "@/common/components/atoms";

interface IProps {
  visible?: boolean;
  onClose?: () => void;
  onClickItem: (item: EmojiKeys) => void;
}

export default function ChatEmojiSheet({
  visible: controlledValue,
  onClose,
  onClickItem,
}: IProps): JSX.Element {
  const [visible, setVisible] = useState(controlledValue ?? false);
  const { colors, radii, space } = useTheme();

  useEffect(() => {
    if (controlledValue !== undefined) {
      setVisible(controlledValue);
    }
  }, [controlledValue]);
  return (
    <AnimatePresence>
      {visible && (
        <>
          <AnimatedBox
            position="fixed"
            top={0}
            left={0}
            right={0}
            bottom={0}
            onClick={() => {
              if (controlledValue !== undefined) {
                onClose && onClose();
              } else {
                setVisible(false);
              }
            }}
          />
          <AnimatedBox
            initial={{
              y: "-100%",
              top: 24,
            }}
            animate={{
              y: "-100%",
              top: -4,
            }}
            right={0}
            position="absolute"
            w={300}
            h={240}
            bg={colors.primaryDark}
            border={`1px solid ${colors.secondaryLight}`}
            borderRadius={radii.xxxxs}
            overflowY="auto"
          >
            {(() => {
              const children = [] as JSX.Element[];
              for (const item in EMOJI_IMAGE_LIST) {
                children.push(
                  <Box
                    title={item}
                    cursor="pointer"
                    w={60}
                    h={60}
                    position="relative"
                    onClick={(e) => {
                      e.stopPropagation();
                      onClickItem(item as EmojiKeys);
                    }}
                  >
                    <Image
                      src={EMOJI_IMAGE_LIST[item as EmojiKeys]}
                      layout="fill"
                      objectFit="contain"
                      alt="image"
                    />
                  </Box>
                );
              }

              return (
                <Grid
                  p={space.xxxs}
                  gridGap={space.xxxs}
                  gridTemplateColumns="repeat(4, 1fr)"
                >
                  {children}
                </Grid>
              );
            })()}
          </AnimatedBox>
        </>
      )}
    </AnimatePresence>
  );
}
