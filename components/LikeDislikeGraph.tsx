import React from 'react';

interface DataPoint {
  label: string;
  x: number; // -100 (Wholesome) to 100 (Toxic)
  y: number; // -100 (Dislike) to 100 (Like)
}

const LikeDislikeGraph = () => {
  const data: DataPoint[] = [
    { label: 'Cooking', x: -80, y: 80 },
    { label: 'Hybrid training', x: -70, y: 90 },
    { label: 'To Pimp a Butterfly', x: -60, y: 85 },
    { label: 'Cowboy Bebop', x: -40, y: 75 },
    { label: 'Star Wars', x: -20, y: 50 },
    { label: 'Coffee', x: 20, y: 70 },
    { label: 'Coke Zero', x: 60, y: 60 },
    { label: 'Bad bitches', x: 90, y: 70 },
    { label: 'Bad bitches', x: 90, y: -60 },
    { label: 'Small talk', x: 30, y: -40 },
    { label: 'OKRs', x: 70, y: -80 },
  ];

  // Convert coordinate (-100 to 100) to percentage (0 to 100)
  // X: -100 -> 0%, 100 -> 100%
  // Y: 100 -> 0% (Top), -100 -> 100% (Bottom)
  const getX = (val: number) => ((val + 100) / 200) * 100;
  const getY = (val: number) => ((100 - val) / 200) * 100;

  return (
    <div className="pointer-events-none relative mx-auto my-12 aspect-4/3 w-full max-w-2xl select-none">
      {/* Background Grid/Axes */}
      <div className="absolute inset-0 rounded-xl border border-neutral-800/50 bg-neutral-900/20" />

      {/* Axes Lines */}
      {/* Y Axis */}
      <div className="absolute top-4 bottom-4 left-1/2 w-px bg-neutral-700">
        <div className="absolute -top-1 left-1/2 -translate-x-1/2 -translate-y-full text-xs font-medium tracking-tight whitespace-nowrap text-neutral-500">
          I like
        </div>
        <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 translate-y-full text-xs font-medium tracking-tight whitespace-nowrap text-neutral-500">
          I dislike
        </div>
      </div>

      {/* X Axis */}
      <div className="absolute top-1/2 right-4 left-4 h-px bg-neutral-700">
        <div className="absolute top-1/2 -left-1 -translate-x-full -translate-y-1/2 pr-2 text-xs font-medium tracking-tight whitespace-nowrap text-neutral-500">
          Wholesome
        </div>
        <div className="absolute top-1/2 -right-1 translate-x-full -translate-y-1/2 pl-2 text-xs font-medium tracking-tight whitespace-nowrap text-neutral-500">
          Toxic
        </div>
      </div>

      {/* Data Points */}
      {data.map((item, index) => {
        const left = getX(item.x);
        const top = getY(item.y);

        return (
          <div
            key={index}
            className="group absolute flex items-center gap-2 transition-all duration-300 hover:z-10 hover:scale-110"
            style={{
              left: `${left}%`,
              top: `${top}%`,
              transform: 'translate(-50%, -50%)',
            }}
          >
            <div
              className={`h-2.5 w-2.5 rounded-full ${item.y > 0 ? 'bg-neutral-400' : 'bg-red-900/80'} shadow-sm`}
            />
            <span
              className={`text-xs font-medium tracking-tight whitespace-nowrap ${item.y > 0 ? 'text-neutral-300' : 'text-neutral-500'}`}
            >
              {item.label}
            </span>
          </div>
        );
      })}
    </div>
  );
};

export default LikeDislikeGraph;
