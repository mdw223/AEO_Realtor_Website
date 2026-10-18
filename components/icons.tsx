import type { ReactNode } from "react";

type IconProps = { size?: number };

function Svg({
  size = 18,
  children,
}: IconProps & { children: ReactNode }) {
  return (
    <svg
      viewBox="0 0 24 24"
      width={size}
      height={size}
      aria-hidden="true"
      focusable="false"
    >
      {children}
    </svg>
  );
}

export function IconPhone({ size = 14 }: IconProps) {
  return (
    <Svg size={size}>
      <path
        fill="currentColor"
        d="M6.6 10.8a15 15 0 0 0 6.6 6.6l2.2-2.2c.3-.3.7-.4 1-.2 1.1.4 2.3.6 3.6.6.6 0 1 .4 1 1V20c0 .6-.4 1-1 1C10.6 21 3 13.4 3 4c0-.6.4-1 1-1h3.5c.6 0 1 .4 1 1 0 1.2.2 2.5.6 3.6.1.4 0 .7-.3 1L6.6 10.8z"
      />
    </Svg>
  );
}

export function IconFacebook({ size }: IconProps) {
  return (
    <Svg size={size}>
      <path
        fill="currentColor"
        d="M14 9h3V6h-3c-2.2 0-4 1.8-4 4v2H8v3h2v7h3v-7h2.6l.4-3H13v-2c0-.6.4-1 1-1z"
      />
    </Svg>
  );
}

export function IconInstagram({ size }: IconProps) {
  return (
    <Svg size={size}>
      <rect
        x="4"
        y="4"
        width="16"
        height="16"
        rx="4"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.7"
      />
      <circle
        cx="12"
        cy="12"
        r="3.4"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.7"
      />
      <circle cx="17.2" cy="6.8" r="0.9" fill="currentColor" />
    </Svg>
  );
}

export function IconLinkedin({ size }: IconProps) {
  return (
    <Svg size={size}>
      <path
        fill="currentColor"
        d="M6.5 9H4V20h2.5V9zM5.2 4C4.3 4 3.6 4.7 3.6 5.6S4.3 7.2 5.2 7.2 6.8 6.5 6.8 5.6 6.1 4 5.2 4zM20 20h-2.5v-5.6c0-1.6-.6-2.6-2-2.6-1 0-1.6.7-1.9 1.4-.1.2-.1.6-.1.9V20H11V9h2.4v1.5c.4-.7 1.3-1.8 3.2-1.8 2.3 0 4.4 1.5 4.4 4.8V20z"
      />
    </Svg>
  );
}

export function IconTiktok({ size }: IconProps) {
  return (
    <Svg size={size}>
      <path
        fill="currentColor"
        d="M14 4c.4 2.4 1.8 4 4.2 4.2v2.4c-1.4 0-2.7-.4-3.8-1.2v6.4c0 3.2-2.4 5.6-5.6 5.6S3.2 19 3.2 15.8 5.6 10.2 8.8 10.2c.3 0 .7 0 1 .1v2.6c-.3-.1-.6-.2-1-.2-1.8 0-3.2 1.5-3.2 3.3s1.4 3.3 3.2 3.3 3.2-1.5 3.2-3.3V4H14z"
      />
    </Svg>
  );
}
