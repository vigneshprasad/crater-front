import BlockchainBull from "public/images/emoji/img_blockchain_bull.png";
import Confused from "public/images/emoji/img_confused.png";
import Eye from "public/images/emoji/img_eye.png";
import Happy from "public/images/emoji/img_happy.png";
import Hi from "public/images/emoji/img_hi.png";
import Interesting from "public/images/emoji/img_interesting.png";
import Question from "public/images/emoji/img_question.png";
import ISeeYou from "public/images/emoji/img_rahil_i_see_you.png";
import Awesome from "public/images/emoji/img_rohas_awesome.png";
import KnockOut from "public/images/emoji/img_rohas_tko.png";
import Shy from "public/images/emoji/img_shy.png";
import ThatsSoCool from "public/images/emoji/img_simran_thats_so_cool.png";
import Speechless from "public/images/emoji/img_speechless.png";
import VeryHardDay from "public/images/emoji/img_tarun_hard_day.png";
import ThumbsUp from "public/images/emoji/img_thumbup.png";
import PaisaHiPaisa from "public/images/emoji/img_yash_gawde_paisa.png";
import ArreyYaar from "public/images/emoji/jashvi_arrey_yaar.png";
import JashviOhDamn from "public/images/emoji/jashvi_oh_damn.png";
import KaiseHo from "public/images/emoji/kaise_ho.png";

const EMOJI_IMAGE_LIST = {
  Hi,
  Confused,
  Interesting,
  Eye,
  Happy,
  Shy,
  Question,
  ThumbsUp,
  JashviOhDamn,
  ArreyYaar,
  KaiseHo,
  BlockchainBull,
  ISeeYou,
  Awesome,
  KnockOut,
  ThatsSoCool,
  Speechless,
  VeryHardDay,
  PaisaHiPaisa,
};

export type EmojiKeys = keyof typeof EMOJI_IMAGE_LIST;

export default EMOJI_IMAGE_LIST;
