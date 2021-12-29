import { GetStaticPaths, GetStaticProps, InferGetStaticPropsType } from "next";
import styled, { useTheme } from "styled-components";

import useAuth from "@/auth/context/AuthContext";
import { Box, Text } from "@/common/components/atoms";
import CreatorPageLayout from "@/creators/components/layouts/CreatorPageLayout";
import CreatorPage, {
  CreatorPageParams,
  CreatorPageProps,
  getCreatorStaticPaths,
  getCreatorStaticProps,
} from "@/creators/components/page/CreatorPage";
import { FollowerProvider } from "@/creators/context/FollowerContext";

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

export default function CreatorAbout({ slug, creator }: IProps): JSX.Element {
  const { space, colors } = useTheme();
  const { user } = useAuth();

  return (
    <CreatorPageLayout
      creator={creator}
      slug={slug}
      baseContainerProps={{ pb: 0 }}
    >
      <FollowerProvider creator={creator.id} user={user?.pk}>
        <CreatorPage selectedTab="rewards">
          <Box
            minHeight="270vh"
            backgroundSize="cover"
            backgroundImage="url('/images/rewards_coming_soon.png')"
          >
            <Box
              position="sticky"
              top={300}
              zIndex={10}
              pt={[space.xs, space.m]}
              mx={[space.xxxs, space.xxl]}
            >
              <Text
                textStyle="headline3Bold"
                color={colors.accent}
                textAlign="center"
                mb={space.xxs}
              >
                COMING SOON
              </Text>
              <Text
                m="0 auto"
                textStyle="headline6"
                textAlign="center"
                maxWidth={["100%", "50%"]}
              >
                The mentor/creator can <Span>choose</Span> to provide{" "}
                <Span>exclusive</Span> access to their time &amp; content by
                launching their own rewards.
              </Text>
            </Box>
          </Box>
        </CreatorPage>
      </FollowerProvider>
    </CreatorPageLayout>
  );
}
