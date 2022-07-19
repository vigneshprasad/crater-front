import { useState } from "react";
import { useTheme } from "styled-components";

import { Box, Flex, Icon } from "@/common/components/atoms";
import { Button } from "@/common/components/atoms/v2";
import TopCreatorsList from "@/creators/components/objects/TopCreatorsList";
import useCreatorRankList from "@/creators/context/CreatorRankListContext";

export default function CategoryPageTopCreators(): JSX.Element {
  const { space, colors } = useTheme();
  const [initialClick, setInitialClick] = useState(true);
  const { creators, nextPage, setCreatorsPage } = useCreatorRankList();

  return (
    <Box>
      <TopCreatorsList creators={creators} />
      {nextPage && (
        <Flex
          mx={space.xxs}
          gridGap={space.xxs}
          alignItems="center"
          display={["none", "flex"]}
        >
          <Flex flex="1" h={1} bg={colors.black[0]} />
          <Button
            suffixElement={<Icon icon="ChevronDown" size={20} />}
            variant="dark-flat"
            label="Show More"
            onClick={() => {
              if (initialClick) {
                setCreatorsPage((page) => page + 1);
                setInitialClick(false);
                return;
              }

              setCreatorsPage((page) => page + 2);
            }}
          />
          <Flex flex="1" h={1} bg={colors.black[0]} />
        </Flex>
      )}
    </Box>
  );
}
