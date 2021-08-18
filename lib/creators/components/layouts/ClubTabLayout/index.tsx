import { Box } from "@/common/components/atoms/System";
import BaseLayout from "@/common/components/layouts/BaseLayout";
import TabHeading from "@/common/components/objects/TabHeading";
import { theme } from "@/common/theme";

type IProps = {
  heading: string;
};

const ClubTabLayout: React.FC<IProps> = ({ heading, children }) => {
  const { space } = theme;
  return (
    <BaseLayout pb={[space.l]}>
      <Box p={[space.s]}>
        <TabHeading>{heading}</TabHeading>
      </Box>
      {children}
    </BaseLayout>
  );
};

export default ClubTabLayout;
