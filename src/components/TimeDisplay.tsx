"use client";

import React, { useState, useEffect } from "react";
import Text from "./Text";

export default function TimeDisplay() {
  const formatTime = () => {
    const formatter = new Intl.DateTimeFormat("en-US", {
      hour12: false,
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      timeZoneName: "short",
    });
    const parts = formatter.formatToParts(new Date());
    const tz = parts.find((p) => p.type === "timeZoneName")?.value ?? "UTC";
    const time = [
      parts.find((p) => p.type === "hour")?.value ?? "00",
      parts.find((p) => p.type === "minute")?.value ?? "00",
      parts.find((p) => p.type === "second")?.value ?? "00",
    ].join(":");
    return `${tz} ${time}`;
  };

  const [time, setTime] = useState<string>(() => formatTime());

  useEffect(() => {
    const interval = setInterval(() => setTime(formatTime()), 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <Text
      variant="body"
      className="whitespace-pre tabular-nums uppercase text-xs text-black "
    >
      {time}
    </Text>
  );
}
