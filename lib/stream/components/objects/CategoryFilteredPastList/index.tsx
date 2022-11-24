import { useRouter } from "next/router";

import usePastStreams from "@/stream/context/PastStreamContext";
import useStreamCategories from "@/stream/context/StreamCategoryContext";

import CategoriesList from "../CategoriesList";
import PastStreamsList from "../PastStreamsList/v2";

export default function CategoryFilteredPastList(): JSX.Element {
  const { streamCategories } = useStreamCategories();
  const { categorySlug } = usePastStreams();
  const router = useRouter();

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
                past: cat.slug,
              },
            },
            undefined,
            { shallow: true }
          );
        }}
      />

      <PastStreamsList />
    </>
  );
}
