import { Box, Text } from "@/common/components/atoms";
import Page from "@/common/components/objects/Page";
import { theme } from "@/common/theme";

import AuthForm from "../../forms/AuthForm";
import AuthPageLayout from "../../layouts/AuthPageLayout";

const { space } = theme;

const AuthPage: React.FC = () => {
  return (
    <Page
      seo={{
        title: "Sign-in",
        description: "Sign in page",
      }}
    >
      <AuthPageLayout>
        <Box m="auto auto">
          <Text textStyle="headline3" py={space.xs}>
            Sign-in to <br />
            Crater.Club
          </Text>
          <AuthForm />
        </Box>
      </AuthPageLayout>
    </Page>
  );
};

export default AuthPage;
