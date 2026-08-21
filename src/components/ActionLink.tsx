import type { ReactNode } from "react";

type ActionLinkProps = {
  href: string;
  children: ReactNode;
  /** Set for downloads and external destinations. */
  external?: boolean;
  className?: string;
};

/** Outlined mono button whose ink fill wipes up from the bottom edge on hover. */
export function ActionLink({
  href,
  children,
  external = false,
  className = "",
}: ActionLinkProps) {
  return (
    <a
      href={href}
      {...(external ? { target: "_blank", rel: "noreferrer noopener" } : {})}
      className={`group relative inline-flex items-center overflow-hidden border border-ink/35 px-7 py-3.5 font-mono text-[0.6875rem] tracking-[0.22em] uppercase transition-colors duration-500 hover:border-ink focus-visible:border-ink ${className}`}
    >
      <span
        aria-hidden
        className="absolute inset-0 translate-y-full bg-ink transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-y-0 group-focus-visible:translate-y-0"
      />
      <span className="relative transition-colors duration-500 group-hover:text-paper group-focus-visible:text-paper">
        {children}
      </span>
    </a>
  );
}
