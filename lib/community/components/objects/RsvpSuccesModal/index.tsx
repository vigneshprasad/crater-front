import { useState, useEffect } from "react";
import { useTheme } from "styled-components";

import { Grid, Text, Icon, Link } from "@/common/components/atoms";
import { Button } from "@/common/components/atoms/Button";
import ModalWithVideo from "@/common/components/objects/ModalWithVideo";
import { PageRoutes } from "@/common/constants/route.constants";
import useAnalytics from "@/common/utils/analytics/AnalyticsContext";
import { AnalyticsEvents } from "@/common/utils/analytics/types";
import { Webinar } from "@/community/types/community";

import UrlShare from "../UrlShare";

interface IProps {
  group: Webinar;
  visble: boolean;
  onClose: () => void;
}

export default function RsvpSuccesModal({
  visble,
  group,
  onClose,
}: IProps): JSX.Element {
  const { space, colors } = useTheme();
  const hostName = group.host_detail?.name;
  const [url, setUrl] = useState("");
  const { track } = useAnalytics();

  useEffect(() => {
    const location = window.location.href;
    setUrl(location);
  }, []);

  const text = `
    While you wait you
    can network with other like minds that are going to be tuning in
    using the mobile app.
  `;
  return (
    <ModalWithVideo visible={visble} onClose={onClose}>
      <Text textStyle="headline5">
        {hostName} is getting ready to stream live to you!
      </Text>

      <Text my={space.xs} color={colors.white[1]}>
        {text}
      </Text>

      <Text textStyle="caption" mb={space.xxs}>
        Make Some Noise?
      </Text>

      <UrlShare />

      <Grid
        mt={space.xs}
        gridTemplateColumns="1fr 1fr"
        alignItems="start"
        gridGap={space.xs}
      >
        <Link
          passHref
          href={`//www.linkedin.com/shareArticle?mini=true&url=${url}&title=${group.topic_detail?.name}`}
          prefetch={false}
          boxProps={{ target: "_blank" }}
        >
          <Button
            variant="full-width"
            bg={colors.black[5]}
            border="1px solid rgba(255, 255, 255, 0.1)"
            prefixElement={
              <Icon size={20} icon="Linkedin" fill color={colors.white[0]} />
            }
            text="Share"
          />
        </Link>
        <Link
          passHref
          href={`//twitter.com/share?text=${group.topic_detail?.name}&url=${url}`}
          prefetch={false}
          boxProps={{ target: "_blank" }}
        >
          <Button
            variant="full-width"
            border="1px solid rgba(255, 255, 255, 0.1)"
            bg={colors.black[5]}
            prefixElement={
              <Icon size={20} icon="Twitter" fill color={colors.white[0]} />
            }
            text="Tweet"
          />
        </Link>
      </Grid>
      <Link href={PageRoutes.home}>
        <Button
          onClick={() => track(AnalyticsEvents.explore_more_clicked)}
          mt={space.xs}
          variant="full-width"
          text="Explore other streams"
        />
      </Link>
    </ModalWithVideo>
  );
}
