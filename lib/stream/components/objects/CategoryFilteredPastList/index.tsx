import { useTheme } from "styled-components";

import { useRouter } from "next/router";

import { Box } from "@/common/components/atoms";
import usePastStreams from "@/stream/context/PastStreamContext";
import useStreamCategories from "@/stream/context/StreamCategoryContext";

import CategoriesList from "../CategoriesList";
import PastStreamsList from "../PastStreamsList/v2";

export default function CategoryFilteredPastList(): JSX.Element {
  const { streamCategories } = useStreamCategories();
  const { category } = usePastStreams();
  const { space } = useTheme();
  const router = useRouter();

  return (
    <>
      <Box px={space.xxs} mb={space.xxs}>
        <CategoriesList
          categories={streamCategories}
          selectedCategory={category}
          onClickCategory={(cat) => {
            if (cat.pk === category) {
              router.push("/", undefined, { shallow: true });
              return;
            }

            router.push(
              {
                pathname: "/",
                query: {
                  pastCategory: cat.pk,
                },
              },
              undefined,
              { shallow: true }
            );
          }}
        />
      </Box>

      <PastStreamsList />
    </>
  );
}
