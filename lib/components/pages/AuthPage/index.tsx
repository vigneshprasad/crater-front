import AuthForm from "lib/components/forms/AuthForm";
import AuthPageLayout from "lib/components/layouts/AuthPageLayout";
import Page from "lib/components/layouts/Page";

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
