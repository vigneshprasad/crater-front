import { AnimatePresence } from "framer-motion";
import {
  Dispatch,
  PropsWithChildren,
  SetStateAction,
  useEffect,
  useRef,
  useState,
} from "react";
import styled, { useTheme } from "styled-components";

import useForm from "@/common/hooks/form/useForm";

import { AnimatedBox } from "../Animated";
import { Icon } from "../Icon";
import { Box, Flex, Text } from "../System";
import { Input } from "../v2";

const StyledBox = styled(AnimatedBox)`
  background: rgba(0, 0, 0, 0.6);
  backdrop-filter: blur(24px);
`;

const StyledSheet = styled(AnimatedBox)`
  background: rgba(14, 14, 14, 0.8);
  backdrop-filter: blur(32px);
`;

const StyledScrollBox = styled(Box)`
  scrollbar-width: none;

  ::-webkit-scrollbar {
    display: none;
  }
`;

type SearchFilter = {
  key: string;
  name: string;
  onClick?: () => void;
};

type IProps = PropsWithChildren<{
  filter?: string;
  filters?: SearchFilter[];
  setSearch: Dispatch<SetStateAction<string>>;
}>;

export default function SearchBar({
  filter,
  filters,
  children,
  setSearch,
}: IProps): JSX.Element {
  const { space, colors, radii, zIndices } = useTheme();
  const [searchSheet, setSearchSheet] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const handleClickOutside = (event: Event): void => {
    if (ref.current && !ref.current.contains(event.target as Node)) {
      setSearchSheet(false);
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleClickOutside, false);
    return () => {
      document.removeEventListener("click", handleClickOutside, false);
    };
  }, []);

  const { fields, fieldValueSetter } = useForm<{ searchValue: string }>({
    fields: {
      searchValue: {
        intialValue: "",
        validators: [],
      },
    },
  });

  useEffect(() => {
    const delayDebounceFunc = setTimeout(() => {
      setSearch(fields.searchValue.value);
    }, 1500);

    return () => clearTimeout(delayDebounceFunc);
  }, [fields.searchValue.value, setSearch]);

  return (
    <Box w={566} h="inherit" position="relative" display={["none", "block"]}>
      <StyledBox
        w="inherit"
        position="absolute"
        zIndex={zIndices.searchBar}
        top={10}
        animate={{
          top: searchSheet ? 22 : 10,
          transition: { when: "afterChildren" },
        }}
        transition={{ duration: 0.5 }}
        exit={{
          top: searchSheet ? 10 : 22,
          transition: { when: "beforeChildren" },
        }}
      >
        <Input
          placeholder="Search for streams, creators, etc..."
          suffixElement={
            <Icon icon="Search" size={20} color={colors.textTertiary} />
          }
          containerProps={{
            border: `1px solid ${colors.secondaryLight}`,
            h: 44,
          }}
          onClick={(e) => {
            setSearchSheet(true);
            e.stopPropagation();
          }}
          onChange={(e) =>
            fieldValueSetter("searchValue", e.currentTarget.value)
          }
        />
      </StyledBox>
      <AnimatePresence>
        {searchSheet && (
          <StyledSheet
            w={590}
            h={426}
            position="absolute"
            zIndex={zIndices.navHeader}
            top={10}
            left={-12}
            border={`1px solid ${colors.primaryLight}`}
            borderRadius={radii.xxxxs}
            overflow="hidden"
            initial={{ opacity: 0 }}
            animate={{
              opacity: searchSheet ? 1 : 0,
            }}
            transition={{ duration: 0.3 }}
            exit={{
              opacity: searchSheet ? 0 : 1,
            }}
            ref={ref}
          >
            <Box w="100%" position="absolute" top={54}>
              {filters && (
                <Box
                  p={space.xxxs}
                  borderBottom={`1px solid ${colors.primaryLight}`}
                >
                  <Text
                    textStyle="caption"
                    fontWeight={600}
                    textTransform="uppercase"
                    color={colors.textQuartenary}
                  >
                    Search in
                  </Text>
                  <Flex pt={space.xxxxs} gridGap={space.xxxs}>
                    {filters.map(({ key, name, onClick }) => (
                      <Box
                        px={space.xxxs}
                        py={6}
                        bg={
                          filter === key
                            ? colors.primaryBanner
                            : colors.primaryBackground
                        }
                        border={`1px solid ${colors.primaryLight}`}
                        borderRadius={radii.xxxxs}
                        cursor="pointer"
                        onClick={onClick}
                        key={key}
                      >
                        <Text textStyle="captionLarge">{name}</Text>
                      </Box>
                    ))}
                  </Flex>
                </Box>
              )}

              <StyledScrollBox
                px={space.xxxs}
                pt={space.xxxs}
                pb={space.xs}
                maxHeight={300}
                overflowY="scroll"
              >
                {children}
              </StyledScrollBox>
            </Box>
          </StyledSheet>
        )}
      </AnimatePresence>
    </Box>
  );
}
