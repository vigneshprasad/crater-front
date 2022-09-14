import { useCallback, useMemo, useState } from "react";

import CreatorsSearchList from "@/creators/components/objects/CreatorsSearchList";
import { CreatorsSearchProvider } from "@/creators/context/CreatorsSearchContext";
import GlobalSearchList from "@/stream/components/objects/GlobalSearchList";
import PastStreamsSearchList from "@/stream/components/objects/PastStreamsSearchList";
import StreamCategorySearchList from "@/stream/components/objects/StreamCategorySearchList";
import UpcomingStreamsSearchList from "@/stream/components/objects/UpcomingStreamsSearchList";
import { PastStreamsSearchProvider } from "@/stream/context/PastStreamsSearchContext";
import { StreamCategorySearchProvider } from "@/stream/context/StreamCategorySearchContext";
import { UpcomingStreamsSearchProvider } from "@/stream/context/UpcomingStreamsSearchContext";

import { Box } from "../../atoms";
import SearchBar from "../../atoms/SearchBar";

type SearchFilterKeys =
  | "upcomingStreams"
  | "pastStreams"
  | "creators"
  | "categories";

export default function GlobalSearch(): JSX.Element {
  const [search, setSearch] = useState<string>("");
  const [filter, setFilter] = useState<SearchFilterKeys | undefined>(undefined);

  const selectFilter = useCallback((filter: SearchFilterKeys) => {
    setFilter((prev) => {
      if (!prev) return filter;

      return prev === filter ? undefined : filter;
    });
  }, []);

  const searchFilters = useMemo<
    {
      key: SearchFilterKeys;
      name: string;
      onClick?: () => void;
      display?: JSX.Element;
    }[]
  >(() => {
    return [
      {
        key: "upcomingStreams",
        name: "Upcoming Streams",
        onClick: () => selectFilter("upcomingStreams"),
        display: <UpcomingStreamsSearchList />,
      },
      {
        key: "pastStreams",
        name: "Past Streams",
        onClick: () => selectFilter("pastStreams"),
        display: <PastStreamsSearchList />,
      },
      {
        key: "creators",
        name: "Creators",
        onClick: () => selectFilter("creators"),
        display: <CreatorsSearchList />,
      },
      {
        key: "categories",
        name: "Categories",
        onClick: () => selectFilter("categories"),
        display: <StreamCategorySearchList />,
      },
    ];
  }, [selectFilter]);

  return (
    <UpcomingStreamsSearchProvider search={search}>
      <PastStreamsSearchProvider search={search}>
        <CreatorsSearchProvider search={search}>
          <StreamCategorySearchProvider search={search}>
            <SearchBar
              filter={filter}
              filters={searchFilters}
              setSearch={setSearch}
            >
              {(() => {
                if (!search && !filter) {
                  return <UpcomingStreamsSearchList />;
                }

                if (!filter) {
                  return <GlobalSearchList />;
                }

                return searchFilters.map(
                  ({ key, display }) =>
                    key === filter && <Box key={key}>{display}</Box>
                );
              })()}
            </SearchBar>
          </StreamCategorySearchProvider>
        </CreatorsSearchProvider>
      </PastStreamsSearchProvider>
    </UpcomingStreamsSearchProvider>
  );
}
