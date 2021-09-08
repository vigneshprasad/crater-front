import { ProfileProvider } from "@/auth/context/ProfileContext";
import { Compose } from "@/common/components/atoms";
import HomePage from "@/common/components/pages/HomePage";

const Home: React.FC = () => {
  return (
    <Compose providers={[ProfileProvider]}>
      <HomePage />
    </Compose>
  );
};

export default Home;
