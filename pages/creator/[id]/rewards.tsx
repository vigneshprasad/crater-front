import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import { getSession } from "next-auth/client";
import styled, { useTheme } from "styled-components";

import { Box, Text } from "@/common/components/atoms";
import CreatorApiClient from "@/creators/api";
import CreatorPageLayout from "@/creators/components/layouts/CreatorPageLayout";
import CreatorPage from "@/creators/components/page/CreatorPage";
import { Creator } from "@/creators/types/creator";

interface ServerProps {
  id: string;
  creator: Creator;
}

const Span = styled.span`
  color: ${({ theme }) => theme.colors.accent};
`;

export const getServerSideProps: GetServerSideProps<ServerProps> = async ({
  req,
  query,
}) => {
  const id = query.id as string;
  const session = await getSession({ req });
  const [creator] = await CreatorApiClient({ req }).getCreator(id);

  if (!session || !session.user) {
    return {
      redirect: {
        destination: "/auth/",
        permanent: false,
      },
    };
  }

  if (!creator) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      id,
      creator,
    },
  };
};

type IProps = InferGetServerSidePropsType<typeof getServerSideProps>;

export default function CreatorAbout({ id, creator }: IProps): JSX.Element {
  const { space, colors } = useTheme();
  return (
    <CreatorPageLayout creator={creator} id={id} baseContainerProps={{ pb: 0 }}>
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
              The mentor/creator can <Span>choose</Span> to provide{" "}
              <Span>exclusive</Span> access to their time &amp; content by
              launching their own rewards.
            </Text>
          </Box>
        </Box>
      </CreatorPage>
    </CreatorPageLayout>
  );
}
