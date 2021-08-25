import AgoraRTC from "agora-rtc-sdk-ng";

const agoraClient = AgoraRTC.createClient({ mode: "rtc", codec: "h264" });

export default agoraClient;
