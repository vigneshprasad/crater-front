import { useRouter } from "next/router";

import useStreamCategories from "@/stream/context/StreamCategoryContext";
import useUpcomingStreams from "@/stream/context/UpcomingStreamsContext";

import CategoriesList from "../CategoriesList";
import UpcomingStreamsList from "../UpcomingStreamsList";

export default function CategoryFilteredUpcomingList(): JSX.Element {
  const { categorySlug } = useUpcomingStreams();
  const router = useRouter();
  const { streamCategories } = useStreamCategories();

  return (
    <>
      <CategoriesList
        categories={streamCategories}
        selectedCategory={categorySlug}
        onClickCategory={(cat) => {
          if (cat.slug === categorySlug) {
            router.push("/", undefined, { shallow: true });
            return;
          }

          router.push(
            {
              pathname: "/",
              query: {
                upcoming: cat.slug,
              },
            },
            undefined,
            { shallow: true }
          );
        }}
      />

      <UpcomingStreamsList />
    </>
  );
}
