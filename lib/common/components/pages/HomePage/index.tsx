import HomePageLayout from "../../layouts/HomePageLayout";
import { HomeNavBar } from "../../objects/HomeNavBar";
import Page from "../../objects/Page";

type IProps = {
  tab?: string;
};

const HomePage: React.FC<IProps> = () => {
  return (
    <Page
      seo={{
        title: "Home Page",
        description: "Crater Club",
      }}
    >
      <HomePageLayout>
        {{
          navbar: <HomeNavBar />,
          tabContent: <div>Hello</div>,
        }}
      </HomePageLayout>
    </Page>
  );
};

export default HomePage;
