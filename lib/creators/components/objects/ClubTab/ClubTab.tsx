import { Box, Text, Flex, Scroll } from "@/common/components/atoms";
import { TabBar } from "@/common/components/objects/TabBar";
import { theme } from "@/common/theme";

import ClubTabLayout from "../../layouts/ClubTabLayout";
import CreatorCard from "../CreatorCard";

export type IClubTabProps = {
  clubs?: string;
};

export const ClubTab: React.FC<IClubTabProps> = () => {
  const items = ["All", "Owned"];
  const { space, colors } = theme;

  return (
    <ClubTabLayout heading="Clubs">
      <Box px={[space.s]} py={[space.xs]}>
        <TabBar
          items={items}
          renderItem={(item) => (
            <Box
              cursor="pointer"
              borderRadius={[18]}
              marginRight={[space.xxs]}
              bg={colors.accent}
              key={item}
              minWidth={[84]}
              py={[space.xxxs]}
              px={[space.xxs]}
            >
              <Text textStyle="menu" textAlign="center">
                {item}
              </Text>
            </Box>
          )}
        />
      </Box>
      <Scroll py={[24]} scroll="horizontal">
        <Flex px={[space.s]} py={[space.s]}>
          <CreatorCard image="https://media.beam.usnews.com/d1/d8/8501ba714a21aed9a7327e02ade1/180515-10thingselonmusk-editorial.jpg" />
          <CreatorCard image="https://media.beam.usnews.com/d1/d8/8501ba714a21aed9a7327e02ade1/180515-10thingselonmusk-editorial.jpg" />
          <CreatorCard image="https://media.beam.usnews.com/d1/d8/8501ba714a21aed9a7327e02ade1/180515-10thingselonmusk-editorial.jpg" />
          <CreatorCard image="https://media.beam.usnews.com/d1/d8/8501ba714a21aed9a7327e02ade1/180515-10thingselonmusk-editorial.jpg" />
          <CreatorCard image="https://media.beam.usnews.com/d1/d8/8501ba714a21aed9a7327e02ade1/180515-10thingselonmusk-editorial.jpg" />
          <CreatorCard image="https://media.beam.usnews.com/d1/d8/8501ba714a21aed9a7327e02ade1/180515-10thingselonmusk-editorial.jpg" />
          <CreatorCard image="https://media.beam.usnews.com/d1/d8/8501ba714a21aed9a7327e02ade1/180515-10thingselonmusk-editorial.jpg" />
        </Flex>
      </Scroll>
    </ClubTabLayout>
  );
};
