import { ReactNode } from "react";

interface ListProps {
  children: ReactNode;
  className?: string;
}

export default function List({ children, className = "" }: ListProps) {
  return <dl className={`flex flex-col ${className}`}>{children}</dl>;
}
