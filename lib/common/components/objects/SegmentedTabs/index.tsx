import { useEffect, useState } from "react";

import { Flex } from "../../atoms";
import Tab from "./Tab";

interface IProps {
  tabs: string[];
  selected?: string;
  onTabClick?: (tab: string) => void;
}

export default function SegmentedTabs({
  tabs,
  selected,
  onTabClick,
}: IProps): JSX.Element {
  const [activeTab, setActiveTab] = useState(selected ?? tabs[0]);

  useEffect(() => {
    if (selected) setActiveTab(selected);
  }, [selected]);

  return (
    <Flex>
      {tabs.map((tab, index) => {
        const variant =
          index === 0
            ? "initial"
            : index === tabs.length - 1
            ? "end"
            : "middle";
        return (
          <Tab
            active={activeTab === tab}
            variant={variant}
            label={tab}
            key={tab}
            onClick={() => {
              if (onTabClick) {
                onTabClick(tab);
              }

              if (!selected) {
                setActiveTab(tab);
              }
            }}
          />
        );
      })}
    </Flex>
  );
}
