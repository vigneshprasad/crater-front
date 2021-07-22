import Button from "@common/components/atoms/Button";
import { signout } from "next-auth/client";

import { useRouter } from "next/dist/client/router";

import { SectionWrapper, StickyHeader } from "./styles";

interface IProps {
  heading: string;
}

const AccountTab: React.FC<IProps> = ({ heading }) => {
  const router = useRouter();
  const performLogout = async () => {
    await signout();
    router.push("/auth");
  };

  return (
    <SectionWrapper>
      <StickyHeader>
        <h4>{heading}</h4>
        <div>
          <Button label="sign out" onClick={() => performLogout()} />
        </div>
      </StickyHeader>
    </SectionWrapper>
  );
};

export default AccountTab;
