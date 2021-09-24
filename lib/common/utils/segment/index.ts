interface ISegmentUtils {
  actionName: string;
  datetime: string;
  username?: string;
}

const sendDataToSegment = (segmentData: ISegmentUtils): void => {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  window.analytics.track(segmentData.actionName, {
    datetime: segmentData.datetime,
    username: segmentData.username,
  });
};

export default sendDataToSegment;
