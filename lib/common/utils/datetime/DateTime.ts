import { DateTime as LuxonDatetime } from "luxon";

export default class DateTime extends LuxonDatetime {
  static DEFAULT_FORMAT = "d MMM @ H:mm";

  static parse(input: string): DateTime {
    const formatted = input.replace("T", " ").replace(".000000", "");
    return LuxonDatetime.fromFormat(
      formatted,
      "yyyy-MM-dd HH:mm:ss ZZZ"
    ) as DateTime;
  }
}
