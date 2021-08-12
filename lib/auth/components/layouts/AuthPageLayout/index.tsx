import { Box } from "@/common/components/atoms";
import BaseLayout from "@/common/components/layouts/BaseLayout";
import { Logo } from "@/common/components/objects/Logo";
import { theme } from "@/common/theme";

const AuthPageLayout: React.FC = ({ children }) => {
  const { space } = theme;
  return (
    <BaseLayout
      gridTemplateColumns={["1fr 2fr"]}
      gridTemplateRows={["1fr"]}
      minHeight={["100vh"]}
      variant="grid"
    >
      <Box bg="#6C5DD3" px={[space.s]} py={[space.s]}>
        <Logo withText />
      </Box>
      {children}
    </BaseLayout>
  );
};

export default AuthPageLayout;
