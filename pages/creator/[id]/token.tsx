import { GetStaticPaths, GetStaticProps, InferGetStaticPropsType } from "next";
import styled, { useTheme } from "styled-components";

import { Box, Text } from "@/common/components/atoms";
import CreatorPageLayout from "@/creators/components/layouts/CreatorPageLayout";
import CreatorPage, {
  CreatorPageParams,
  CreatorPageProps,
  getCreatorStaticPaths,
  getCreatorStaticProps,
} from "@/creators/components/page/CreatorPage";

const Span = styled.span`
  color: ${({ theme }) => theme.colors.accent};
`;

export const getStaticPaths: GetStaticPaths<CreatorPageParams> =
  getCreatorStaticPaths;

export const getStaticProps: GetStaticProps<
  CreatorPageProps,
  CreatorPageParams
> = getCreatorStaticProps;

type IProps = InferGetStaticPropsType<typeof getStaticProps>;

export default function CreatorAbout({ id, creator }: IProps): JSX.Element {
  const { colors, space } = useTheme();
  return (
    <CreatorPageLayout creator={creator} id={id} baseContainerProps={{ pb: 0 }}>
      <CreatorPage selectedTab="token">
        <Box
          minHeight="200vh"
          backgroundImage="url('/images/token_coming_soon.png')"
        >
          <Box
            position="sticky"
            top={300}
            zIndex={10}
            pt={space.m}
            mx={space.xxl}
          >
            <Text
              textStyle="headline3Bold"
              color={colors.accent}
              textAlign="center"
              mb={space.xxs}
            >
              COMING SOON
            </Text>
            <Text textStyle="headline5" textAlign="center">
              Mentors &amp; creators will have a option to <Span>auction</Span>{" "}
              tokens, think of them as tickets, for you to buy to access their
              rewards. Helping you get exclusive access &amp; them with price
              discovery &amp; monetization.
            </Text>
          </Box>
        </Box>
      </CreatorPage>
    </CreatorPageLayout>
  );
}
