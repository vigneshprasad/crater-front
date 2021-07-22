import HomePage from "@common/components/pages/HomePage";
import { API_URL_CONSTANTS } from "@constants/url.constants";
import ApiClient from "lib/common/api";
import AuthProvider from "lib/modules/auth/context/auth";
import { GetServerSideProps } from "next";
import { User } from "next-auth";
import { getSession } from "next-auth/client";

const Home: React.FC<{ user: User }> = ({ user }) => {
  return (
    <AuthProvider user={user}>
      <HomePage />
    </AuthProvider>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getSession(context);
  const token = session?.user?.apiToken;

  if (!session) {
    return {
      redirect: {
        permanent: true,
        destination: "/auth",
      },
    };
  }

  if (token) {
    const response = await ApiClient({
      url: API_URL_CONSTANTS.auth.getUser,
      headers: {
        Authorization: `JWT ${token}`,
      },
    });

    const user = response.data;

    return {
      props: {
        user,
      },
    };
  }

  return {
    props: {},
  };
};

export default Home;
