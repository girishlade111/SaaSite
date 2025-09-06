import type { SVGProps } from 'react';

export default function Logo(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 160 40"
      width="100"
      height="25"
      aria-label="SaaSite Logo"
      {...props}
    >
      <rect width="40" height="40" rx="8" fill="hsl(var(--primary))" />
      <path
        d="M12 12 L20 28 L28 12"
        stroke="hsl(var(--primary-foreground))"
        strokeWidth="4"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <text
        x="52"
        y="29"
        fontFamily="Poppins, sans-serif"
        fontSize="24"
        fontWeight="600"
        fill="hsl(var(--foreground))"
      >
        SaaSite
      </text>
    </svg>
  );
}
