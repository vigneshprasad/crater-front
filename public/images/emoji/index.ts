import Fifty from "public/images/emoji/50.png";
import Confused from "public/images/emoji/img_confused.png";
import Eye from "public/images/emoji/img_eye.png";
import Happy from "public/images/emoji/img_happy.png";
import Hi from "public/images/emoji/img_hi.png";
import Interesting from "public/images/emoji/img_interesting.png";
import Question from "public/images/emoji/img_question.png";
import Shy from "public/images/emoji/img_shy.png";
import ThumbsUp from "public/images/emoji/img_thumbup.png";
import Jashvi50 from "public/images/emoji/jashvi_50.png";
import ArreyYaar from "public/images/emoji/jashvi_arrey_yaar.png";
import JashviOhDamn from "public/images/emoji/jashvi_oh_damn.png";
import KaiseHo from "public/images/emoji/kaise_ho.png";
import NotJashvi from "public/images/emoji/not_jashvi.png";

const EMOJI_IMAGE_LIST = {
  Hi,
  Confused,
  Interesting,
  Eye,
  Happy,
  Shy,
  Question,
  ThumbsUp,
  Jashvi50,
  Fifty,
  JashviOhDamn,
  ArreyYaar,
  NotJashvi,
  KaiseHo,
};

export type EmojiKeys = keyof typeof EMOJI_IMAGE_LIST;

export default EMOJI_IMAGE_LIST;
