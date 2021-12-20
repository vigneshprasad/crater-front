import { DateTime as LuxonDatetime } from "luxon";

export default class DateTime extends LuxonDatetime {
  static DEFAULT_DATETIME_INPUT_FORMAT = "yyyy-MM-dd'T'HH:mm";
  static DEFAULT_FORMAT = "d MMM @ H:mm";

  static parse(input: string): DateTime {
    const formatted = input.replace("T", " ").replace(".000000", "");
    return LuxonDatetime.fromFormat(
      formatted,
      "yyyy-MM-dd HH:mm:ss ZZZ"
    ) as DateTime;
  }

  static parse_with_milliseconds(input: string): DateTime {
    const formatted = input
      .replace("T", " ")
      .replace(/\d\d\d\d\d\d/, "")
      .replace(".", "");
    console.log("FORMATTED", formatted);
    return LuxonDatetime.fromFormat(
      formatted,
      "yyyy-MM-dd HH:mm:ss ZZZ"
    ) as DateTime;
  }
}
