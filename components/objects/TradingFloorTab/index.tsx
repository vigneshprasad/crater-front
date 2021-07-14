import { ListColumn, SectionWrapper, StickyHeader } from "./styles";

interface IProps {
  heading: string;
}

const TradingFloorTab: React.FC<IProps> = ({ heading }) => (
  <SectionWrapper>
    <ListColumn>
      <StickyHeader>
        <h4>{heading}</h4>
      </StickyHeader>
    </ListColumn>
  </SectionWrapper>
);

export default TradingFloorTab;
