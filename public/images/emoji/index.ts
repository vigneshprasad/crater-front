import Confused from "public/images/emoji/img_confused.png";
import Hi from "public/images/emoji/img_hi.png";
import Interesting from "public/images/emoji/img_interesting.png";

const EMOJI_IMAGE_LIST = {
  Hi,
  Confused,
  Interesting,
};

export type EmojiKeys = keyof typeof EMOJI_IMAGE_LIST;

export default EMOJI_IMAGE_LIST;
