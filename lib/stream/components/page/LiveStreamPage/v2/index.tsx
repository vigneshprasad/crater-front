import { LiveStreamPage as Content, PageProps } from "./LiveStreamPage";
import { Container } from "./container";

export default function LiveStreamPage(props: PageProps): JSX.Element {
  const { streamId, stream } = props;
  return (
    <Container streamId={streamId} stream={stream}>
      <Content {...props} />
    </Container>
  );
}
