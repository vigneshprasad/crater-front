import APPSTORE_BADGE from "public/images/img_appstore_badge.png";
import GOOGLE_PLAY_BADGE from "public/images/img_google_play.png";
import { useMemo } from "react";

import Image from "next/image";

import { PageRoutes } from "@/common/constants/route.constants";

import { Link } from "../../atoms";

export enum AppLinkType {
  apple = "apple",
  android = "android",
}

interface IProps {
  buttonType: AppLinkType;
}

export default function AppLink({ buttonType }: IProps): JSX.Element {
  const url = useMemo(() => {
    if (buttonType === AppLinkType.android) {
      return "//play.google.com/store/apps/details?id=com.wurknet.mobile&hl=en_IN&gl=US";
    }

    if (buttonType === AppLinkType.apple) {
      return "//apps.apple.com/us/app/worknetwork/id1504844194";
    }
    return PageRoutes.home;
  }, [buttonType]);

  const src = useMemo(() => {
    if (buttonType === AppLinkType.android) {
      return GOOGLE_PLAY_BADGE;
    }

    if (buttonType === AppLinkType.apple) {
      return APPSTORE_BADGE;
    }
    return GOOGLE_PLAY_BADGE;
  }, [buttonType]);

  return (
    <Link
      href={url}
      boxProps={{
        target: "_blank",
        position: "relative",
        h: 54,
        w: 160,
      }}
    >
      <Image layout="fill" objectFit="contain" src={src} alt="App download" />
    </Link>
  );
}
