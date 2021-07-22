import Page from "lib/common/components/layouts/Page";
import AuthForm from "lib/modules/auth/components/forms/AuthForm";
import AuthPageLayout from "lib/modules/auth/components/layouts/AuthPageLayout";

const AuthPage: React.FC = () => {
  return (
    <Page title="Crater.Club: Sign-up">
      <AuthPageLayout>
        <AuthForm />
      </AuthPageLayout>
    </Page>
  );
};

export default AuthPage;
