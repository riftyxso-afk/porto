"use client";

import * as React from "react";

export function LiveTime() {
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
      const formatted = new Intl.DateTimeFormat("en-US", options).format(now);
      setTimeString(`${formatted} local time`);
    }

    update();
    const interval = setInterval(update, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <span className="text-sm text-zinc-500 dark:text-zinc-400 font-normal">
      {timeString || "WITA local time"}
    </span>
  );
}
