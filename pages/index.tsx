import { GetServerSideProps } from "next";

// interface ServerProps {
//   liveStreams: Webinar[];
//   upcoming: Webinar[];
// }

export const getServerSideProps: GetServerSideProps = async () => {
  return {
    redirect: {
      destination: "//joincrater.club",
      permanent: false,
    },
  };
};

export default function Index(): null {
  return null;
}

// export const getStaticProps: GetStaticProps<ServerProps> = async () => {
//   return {
//     redirect: {
//       destination: "//joincrater.club",
//       permanent: false,
//     },
//   };
//   const [liveStreams] = await WebinarApiClient().getAllLiveWebinars();
//   const [upcoming] = await WebinarApiClient().getAllUpcominWebinars();

//   return {
//     props: {
//       liveStreams: liveStreams || [],
//       upcoming: upcoming || [],
//     },
//     revalidate: 60 * 5,
//   };
// };

// export type IProps = InferGetStaticPropsType<typeof getStaticProps>;

// export default function Home({ liveStreams, upcoming }: IProps): JSX.Element {
//   return (
//     <HomePageLayout
//       seo={{
//         title: "Crater Club: Streams",
//         description:
//           "Crater Club is the world’s leading live streaming platform for gamers and the things we love. Watch and chat now with millions of other fans from around the world",
//       }}
//       heading="Streams"
//       activeTab="streams"
//     >
//       <LiveStreamsProvider initial={liveStreams}>
//         <UpcomingStreamsProvider initial={upcoming}>
//           <StreamsPage />
//         </UpcomingStreamsProvider>
//       </LiveStreamsProvider>
//     </HomePageLayout>
//   );
// }
