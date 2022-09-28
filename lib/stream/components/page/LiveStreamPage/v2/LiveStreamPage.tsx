import { useEffect, useState } from "react";

import { useRouter } from "next/router";

import { MultiStream, Webinar } from "@/community/types/community";
import MultiLiveStreamPageLayout from "@/stream/components/layouts/MultiLiveStreamPageLayout";
import MultiStreamControlBar from "@/stream/components/objects/MultiStreamControlBar";
import MultiStreamPlayer from "@/stream/components/objects/MultiStreamPlayer";
import StreamDytePlayer from "@/stream/components/objects/StreamDytePlayer";

interface IProps {
  stream: Webinar;
  streamId: number;
  multiStreamMode: boolean;
  multistream?: MultiStream;
}

export function LiveStreamPage({
  stream,
  streamId,
  multiStreamMode,
  multistream,
}: IProps): JSX.Element {
  const router = useRouter();
  const [activeStreamId, setActiveStreamId] = useState(streamId);

  useEffect(() => {
    const id = router.query.id as string;
    id && setActiveStreamId(parseInt(id, 10));
  }, [router]);

  return (
    <MultiLiveStreamPageLayout streamId={activeStreamId} stream={stream}>
      {{
        streamPlayer: (
          <>
            {multiStreamMode === true && multistream && (
              <MultiStreamPlayer
                multistream={multistream}
                active={activeStreamId}
                onClickStream={(id) => {
                  router.push(`/livestream/${id}/multi`, undefined, {
                    shallow: true,
                  });
                }}
              />
            )}
            {multiStreamMode === false && <StreamDytePlayer />}
          </>
        ),
        controlBar: multistream ? (
          <MultiStreamControlBar multistream={multistream} />
        ) : null,
      }}
    </MultiLiveStreamPageLayout>
  );
}
