import { useMemo } from "react";

import { Icon, Link } from "@/common/components/atoms";
import { Button } from "@/common/components/atoms/v2";
import useAnalytics from "@/common/utils/analytics/AnalyticsContext";
import { AnalyticsEvents } from "@/common/utils/analytics/types";

export enum AppLinkType {
  apple = "apple",
  android = "android",
}

interface IProps {
  buttonType: AppLinkType;
  analyticsEventName?: string;
}

export default function AppLink({
  buttonType,
  analyticsEventName,
}: IProps): JSX.Element {
  const { track } = useAnalytics();

  const prefixElement = useMemo(() => {
    switch (buttonType) {
      case AppLinkType.android:
        return <Icon icon="PlayStore" />;
      case AppLinkType.apple:
        return <Icon icon="AppStore" />;
    }
  }, [buttonType]);

  const url = useMemo(() => {
    switch (buttonType) {
      case AppLinkType.android:
        return "https://play.google.com/store/apps/details?id=com.wurknet.mobile&hl=en_IN&gl=US";
      case AppLinkType.apple:
        return "https://apps.apple.com/us/app/worknetwork/id1504844194";
    }
  }, [buttonType]);

  return (
    <Link href={url} boxProps={{ target: "_blank" }}>
      <Button
        variant="displayLarge"
        label={buttonType === AppLinkType.android ? "Google Play" : "App Store"}
        prefixElement={prefixElement}
        onClick={() => {
          track(analyticsEventName ?? AnalyticsEvents.mobile_app_badge_clicked);
        }}
      />
    </Link>
  );
}
