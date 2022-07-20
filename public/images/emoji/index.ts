import Confused from "public/images/emoji/img_confused.png";
import Eye from "public/images/emoji/img_eye.png";
import Happy from "public/images/emoji/img_happy.png";
import Hi from "public/images/emoji/img_hi.png";
import Interesting from "public/images/emoji/img_interesting.png";
import Question from "public/images/emoji/img_question.png";
import Shy from "public/images/emoji/img_shy.png";
import ThumbsUp from "public/images/emoji/img_thumbup.png";

const EMOJI_IMAGE_LIST = {
  Hi,
  Confused,
  Interesting,
  Eye,
  Happy,
  Shy,
  Question,
  ThumbsUp,
};

export type EmojiKeys = keyof typeof EMOJI_IMAGE_LIST;

export default EMOJI_IMAGE_LIST;
