import { useTheme } from "styled-components";
import useSWR from "swr";

import { Text, Span } from "@/common/components/atoms";
import ModalWithVideo from "@/common/components/objects/ModalWithVideo";
import { API_URL_CONSTANTS } from "@/common/constants/url.constants";
import DateTime from "@/common/utils/datetime/DateTime";
import { Creator } from "@/creators/types/creator";
import { Auction } from "@/tokens/types/tokens";

interface IProps {
  visible: boolean;
  onClose: () => void;
  creatorId: number;
}

export default function TokenBidModal({
  visible,
  creatorId,
  onClose,
}: IProps): JSX.Element {
  const { space } = useTheme();

  const { data: creator } = useSWR<Creator>(
    API_URL_CONSTANTS.creator.retrieveCreator(creatorId)
  );

  const { data: auctions } = useSWR<Auction[]>(
    `${API_URL_CONSTANTS.coins.getAuctions}?coin__creator=${creatorId}`
  );

  return (
    <ModalWithVideo visible={visible} onClose={onClose}>
      <Text textStyle="headline5">Place a bid</Text>

      <Text my={space.xs}>
        You will be notified when {creator?.profile_detail.name} auction is
        live.
      </Text>

      {(() => {
        const auction = auctions?.[0];
        if (!auction) {
          return <Text>No active auctions</Text>;
        }

        const now = DateTime.now();
        const start = DateTime.parse(auction.start);
        const end = DateTime.parse(auction.end);

        if (now > start) {
          return (
            <Text fontSize="1.7rem" fontWeight="600">
              Auction ends in{" "}
              <Span>{end.diffNow().toFormat("d'd' h'h' m'm'")}</Span>
            </Text>
          );
        }

        return (
          <Text fontSize="1.7rem">
            Auction starts in{" "}
            <Span fontWeight="600">
              {start.diffNow().toFormat("d'd' h'h' m'm'")}
            </Span>
          </Text>
        );
      })()}

      <Text textStyle="caption" my={space.xxs}>
        Auctions are where you buy tokens by placing a bid. These tokens are
        then used to get claim tickets that give you exclusive access to the
        creators / educators time or content. You can learn more here.
      </Text>
    </ModalWithVideo>
  );
}
