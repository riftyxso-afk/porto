"use client";

import * as React from "react";
import { useT } from "@/i18n/LanguageProvider";

export function LiveTime() {
  const t = useT();
  const [timeString, setTimeString] = React.useState<string>("");

  React.useEffect(() => {
    function update() {
      // Local time in Bali, Indonesia (WITA - Asia/Makassar)
      const now = new Date();
      const options: Intl.DateTimeFormatOptions = {
        timeZone: "Asia/Makassar",
        hour: "numeric",
        minute: "numeric",
        hour12: true,
      };
      // Follows the chosen language: 14.30 becomes 2.30 PM under Indonesian
      // rules, which is what someone reading the page in Indonesian expects.
      const locale = document.documentElement.lang || "en";
      const formatted = new Intl.DateTimeFormat(locale, options).format(now);
      setTimeString(`${formatted} ${t.info.localTime}`);
    }

    update();
    const interval = setInterval(update, 1000);
    return () => clearInterval(interval);
  }, [t.info.localTime]);

  return (
    <span className="text-sm text-zinc-500 dark:text-zinc-400 font-normal">
      {timeString || t.info.localTime}
    </span>
  );
}