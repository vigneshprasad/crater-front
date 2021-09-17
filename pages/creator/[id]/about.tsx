import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import { getSession } from "next-auth/client";

import CreatorApiClient from "@/creators/api";
import CreatorPageLayout from "@/creators/components/layouts/CreatorPageLayout";
import AboutTab from "@/creators/components/objects/AboutTab";
import CreatorPage from "@/creators/components/page/CreatorPage";
import { Creator } from "@/creators/types/creator";

interface ServerProps {
  id: string;
  creator: Creator;
}

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
  return (
    <CreatorPageLayout creator={creator} id={id}>
      <CreatorPage selectedTab="about">
        <AboutTab />
      </CreatorPage>
    </CreatorPageLayout>
  );
}
