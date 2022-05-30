import { useTheme } from "styled-components";

import { useRouter } from "next/router";

import { Box } from "@/common/components/atoms";
import useStreamCategories from "@/stream/context/StreamCategoryContext";
import useUpcomingStreams from "@/stream/context/UpcomingStreamsContext";

import CategoriesList from "../CategoriesList";
import UpcomingStreamsList from "../UpcomingStreamsList";

export default function CategoryFilteredUpcomingList(): JSX.Element {
  const { space } = useTheme();
  const { category } = useUpcomingStreams();
  const router = useRouter();
  const { streamCategories } = useStreamCategories();
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
                  upcomigCategory: cat.pk,
                },
              },
              undefined,
              { shallow: true }
            );
          }}
        />
      </Box>

      <UpcomingStreamsList />
    </>
  );
}
