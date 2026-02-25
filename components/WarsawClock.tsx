'use client';

import { useState, useEffect } from 'react';

interface WarsawTime {
  hours: number;
  minutes: number;
  seconds: number;
}

const getWarsawTime = (): WarsawTime => {
  const now = new Date();
  const str = now.toLocaleTimeString('en-GB', {
    timeZone: 'Europe/Warsaw',
    hour12: false,
  });
  const [h, m, s] = str.split(':').map(Number);
  return { hours: h || 0, minutes: m || 0, seconds: s || 0 };
};

const EVEN_HOURS = [0, 2, 4, 6, 8, 10];
const SIZE = 400;
const CENTER = SIZE / 2;
const FACE_RADIUS = 180;
const NUMBER_RADIUS = 148;
const TICK_OUTER = 174;
const TICK_INNER_MAJOR = 164;
const TICK_INNER_MINOR = 168;

const WarsawClock = () => {
  const [time, setTime] = useState<WarsawTime | null>(null);

  useEffect(() => {
    setTime(getWarsawTime());
    const interval = setInterval(() => setTime(getWarsawTime()), 1000);
    return () => clearInterval(interval);
  }, []);

  if (time === null) return null;

  const { hours, minutes, seconds } = time;

  // Angles (degrees from 12 o'clock)
  const secondAngle = seconds * 6;
  const minuteAngle = minutes * 6 + seconds * 0.1;
  const hourAngle = (hours % 12) * 30 + minutes * 0.5;

  return (
    <svg
      width={SIZE}
      height={SIZE}
      viewBox={`0 0 ${SIZE} ${SIZE}`}
      className="opacity-60"
      style={{ fontFamily: 'OT Neue Montreal medium' }}
    >
      {/* Tick marks */}
      {Array.from({ length: 60 }, (_, i) => {
        const angle = (i * 6 - 90) * (Math.PI / 180);
        const isMajor = i % 5 === 0;
        const inner = isMajor ? TICK_INNER_MAJOR : TICK_INNER_MINOR;
        return (
          <line
            key={`tick-${i}`}
            x1={CENTER + inner * Math.cos(angle)}
            y1={CENTER + inner * Math.sin(angle)}
            x2={CENTER + TICK_OUTER * Math.cos(angle)}
            y2={CENTER + TICK_OUTER * Math.sin(angle)}
            stroke="currentColor"
            strokeWidth={isMajor ? 2 : 1}
          />
        );
      })}

      {/* Even hour numbers (0, 2, 4, 6, 8, 10) */}
      {EVEN_HOURS.map((h) => {
        const angle = (h * 30 - 90) * (Math.PI / 180);
        const x = CENTER + NUMBER_RADIUS * Math.cos(angle);
        const y = CENTER + NUMBER_RADIUS * Math.sin(angle);
        return (
          <text
            key={`num-${h}`}
            x={x}
            y={y}
            textAnchor="middle"
            dominantBaseline="central"
            fill="currentColor"
            fontSize="20"
            fontWeight="400"
          >
            {h}
          </text>
        );
      })}

      {/* Hour hand */}
      <line
        x1={CENTER}
        y1={CENTER}
        x2={CENTER + 90 * Math.sin((hourAngle * Math.PI) / 180)}
        y2={CENTER - 90 * Math.cos((hourAngle * Math.PI) / 180)}
        stroke="currentColor"
        strokeWidth={4}
        strokeLinecap="round"
      />

      {/* Minute hand */}
      <line
        x1={CENTER}
        y1={CENTER}
        x2={CENTER + 130 * Math.sin((minuteAngle * Math.PI) / 180)}
        y2={CENTER - 130 * Math.cos((minuteAngle * Math.PI) / 180)}
        stroke="currentColor"
        strokeWidth={3}
        strokeLinecap="round"
      />

      {/* Second hand */}
      <line
        x1={CENTER - 25 * Math.sin((secondAngle * Math.PI) / 180)}
        y1={CENTER + 25 * Math.cos((secondAngle * Math.PI) / 180)}
        x2={CENTER + 140 * Math.sin((secondAngle * Math.PI) / 180)}
        y2={CENTER - 140 * Math.cos((secondAngle * Math.PI) / 180)}
        stroke="#FACC15"
        strokeWidth={1.5}
      />

      {/* Center dot */}
      <circle cx={CENTER} cy={CENTER} r={5} fill="#FACC15" />

      {/* Timezone label */}
      <text
        x={CENTER}
        y={CENTER + 50}
        textAnchor="middle"
        dominantBaseline="central"
        fill="currentColor"
        fontSize="13"
        fontWeight="400"
        opacity={0.6}
        style={{ fontFamily: 'system-ui, -apple-system, sans-serif' }}
      >
        GMT+1
      </text>
    </svg>
  );
};

export default WarsawClock;
