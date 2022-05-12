import { forwardRef } from "react";

import { Image, Link, Box } from "@/common/components/atoms";
import { Webinar } from "@/community/types/community";

interface IProps {
  stream: Webinar;
  link?: string;
}

const StreamCard = forwardRef<HTMLDivElement, IProps>(
  ({ stream, link }, ref) => {
    return (
      <Link href={link ?? `/session/${stream.id}`}>
        <Box ref={ref}>
          <Box position="relative" pt="56.25%">
            <Image
              objectFit="cover"
              layout="fill"
              src={stream.topic_detail?.image}
              alt={stream.topic_detail.name}
            />
          </Box>
        </Box>
      </Link>
    );
  }
);

StreamCard.displayName = "StreamCard";

StreamCard.defaultProps = {
  link: undefined,
};

export default StreamCard;
