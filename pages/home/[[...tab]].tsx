import { ProfileProvider } from "@/auth/context/ProfileContext";
import { Compose } from "@/common/components/atoms";
import HomePage from "@/common/components/pages/HomePage";

export default function Home(): JSX.Element {
  return (
    <Compose providers={[ProfileProvider]}>
      <HomePage />
    </Compose>
  );
}
