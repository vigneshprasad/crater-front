import { useMemo } from "react";
import styled from "styled-components";

import { PageRoutes } from "@/common/constants/route.constants";
import { IconOptions } from "@/common/theme";
import useAnalytics from "@/common/utils/analytics/AnalyticsContext";
import { AnalyticsEvents } from "@/common/utils/analytics/types";

import { Button, ButtonProps, Icon } from "../../atoms";
import { AppLinkType } from "../AppLink";

interface IProps {
  buttonType: AppLinkType;
  analyticsEventName?: string;
}

const LinkButton = styled(Button)<ButtonProps>`
  background: #333333;
  border-color: #333333;
  border-radius: 4px;

  &:hover {
    background: #121212;
    border-color: #121212;
  }
`;

export default function AppLinkButton({
  buttonType,
  analyticsEventName,
}: IProps): JSX.Element {
  const { track } = useAnalytics();

  const buttonData = useMemo<{
    url: string;
    text: string;
    icon?: IconOptions;
  }>(() => {
    if (buttonType === AppLinkType.android) {
      return {
        url: "https://play.google.com/store/apps/details?id=com.wurknet.mobile&hl=en_IN&gl=US",
        text: "Google Play",
        icon: "GooglePlay",
      };
    }

    if (buttonType === AppLinkType.apple) {
      return {
        url: "https://apps.apple.com/us/app/worknetwork/id1504844194",
        text: "App Store",
        icon: "AppStore",
      };
    }

    return {
      url: PageRoutes.home,
      text: "App Download",
    };
  }, [buttonType]);

  return (
    <a href={buttonData.url} target="_blank" rel="noreferrer">
      <LinkButton
        variant="full-width-outline-small"
        gridTemplateColumns="50px 1fr"
        gridGap={4}
        text={buttonData.text}
        onClick={() => {
          track(analyticsEventName ?? AnalyticsEvents.mobile_app_badge_clicked);
        }}
        prefixElement={
          buttonData.icon && (
            <Icon size={20} icon={buttonData.icon} justifySelf="end" />
          )
        }
        textProps={{
          textAlign: "start",
          px: 0,
          color: "#d5bbff",
          w: "100%",
          justifySelf: "start",
        }}
      />
    </a>
  );
}
