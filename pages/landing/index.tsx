import dynamic from "next/dynamic";

const LandingPage = dynamic(
  () => import("@/auth/components/pages/LandingPage")
);

export default function Landing(): JSX.Element {
  return <LandingPage />;
}
