import Link from "next/link";

/** Back-to-home link shared by every project page. Inherits colour from its parent. */
export function IndexLink({ href, className = "" }: { href: string; className?: string }) {
  return (
    <Link
      href={href}
      className={`group inline-flex items-center gap-3 font-mono text-[0.8125rem] font-medium tracking-[0.22em] uppercase transition-opacity hover:opacity-70 ${className}`}
    >
      <svg
        aria-hidden
        viewBox="0 0 20 12"
        className="h-3 w-5 transition-transform duration-500 group-hover:-translate-x-1"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.25"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M19 6H1M6 1 1 6l5 5" />
      </svg>
      Index
    </Link>
  );
}
