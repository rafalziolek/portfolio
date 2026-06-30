import Link from "next/link";

export default function SelectedWorksButton({ href, children }) {
  return (
    <Link
      className="inline-flex w-full items-center justify-center rounded-full bg-neutral-400 p-9 text-center text-[40px] font-normal leading-[1.3] tracking-[-0.03em] text-neutral-900 hover:bg-white focus-visible:outline-neutral-200"
      href={href}
    >
      {children}
    </Link>
  );
}
