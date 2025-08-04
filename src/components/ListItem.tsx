import { ReactNode } from "react";

interface ListItemProps {
  label: string;
  children: ReactNode;
  className?: string;
}

export default function ListItem({
  label,
  children,
  className = "",
}: ListItemProps) {
  return (
    <div
      className={`grid grid-cols-[1fr_auto] gap-4 items-baseline pb-8 pt-3 relative border-b border-dotted border-black/15 ${className}`}
    >
      <dt className="text-black text-lg font-medium leading-[1.33] uppercase">
        {label}
      </dt>
      <dd className="flex flex-col items-end text-black text-xl font-medium leading-[1.5] tracking-[-0.2px] min-w-[152px]">
        {children}
      </dd>
    </div>
  );
}
