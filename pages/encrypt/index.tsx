import { GetServerSideProps } from "next";

import dynamic from "next/dynamic";

import Page from "@/common/components/objects/Page";
import { PageRoutes } from "@/common/constants/route.constants";
import StreamApiClient from "@/stream/api";
import { PastStreamsWithRecordingProvider } from "@/stream/context/PastStreamsWithRecordingContext";
import { UpcomingStreamsProvider } from "@/stream/context/UpcomingStreamsContext";

const EncryptHackathonPage = dynamic(
  () => import("@/stream/components/page/EncryptHackathonPage")
);

interface Props {
  category: number;
}

export const getServerSideProps: GetServerSideProps<Props> = async () => {
  const [category] = await StreamApiClient().retrieveStreamCategory(
    "encrypt-2022"
  );

  if (!category) {
    return {
      redirect: {
        destination: PageRoutes.home,
        permanent: false,
      },
    };
  }

  return { props: { category: category.pk } };
};

export default function EncryptHackathon({ category }: Props): JSX.Element {
  return (
    <Page
      seo={{
        title: "Encrypt 2022",
        description:
          "Stream, Chat, learn & stand to win Rs. 100,000 for building a solution that leads us to a better world",
      }}
    >
      <UpcomingStreamsProvider category={category}>
        <PastStreamsWithRecordingProvider category={category} pageSize={4}>
          <EncryptHackathonPage />
        </PastStreamsWithRecordingProvider>
      </UpcomingStreamsProvider>
    </Page>
  );
}
