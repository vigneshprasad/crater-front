interface ISegmentUtils {
  actionName: String;
  datetime: String;
  username?: String;
}

const sendDataToSegment = (segmentData: ISegmentUtils): void => {
  global.analytics.track(segmentData.actionName, {
    datetime: segmentData.datetime,
    username: segmentData.username,
  });
};

export default sendDataToSegment;
