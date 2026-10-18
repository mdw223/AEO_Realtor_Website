import type { ReactNode } from "react";

type SectionVariant = "default" | "muted" | "dark";

type SectionProps = {
  id?: string;
  variant?: SectionVariant;
  className?: string;
  children: ReactNode;
};

export function Section({
  id,
  variant = "default",
  className,
  children,
}: SectionProps) {
  const classes = ["section", `section--${variant}`, className]
    .filter(Boolean)
    .join(" ");

  return (
    <section id={id} className={classes}>
      <div className="section__inner">{children}</div>
    </section>
  );
}

