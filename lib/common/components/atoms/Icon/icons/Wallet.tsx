export default function Wallet(
  props: React.SVGProps<SVGSVGElement>
): JSX.Element {
  return (
    <svg
      width="1em"
      height="1em"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      stroke="currentColor"
      {...props}
    >
      <path
        d="M18.27 7.18H2.75V17.2c0 1.65 1.34 2.98 2.98 2.98h12.53c1.65 0 2.98-1.34 2.98-2.98v-7.03a2.975 2.975 0 00-2.97-2.99z"
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M8.98 3.82h5.13c1.7 0 3.08 1.51 3.08 3.36M2.75 10.86V5.89"
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M11.48 7.18H4.29c-.85 0-1.54-.75-1.54-1.68 0-.93.69-1.68 1.54-1.68h7.19"
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M17.71 14.19a.51.51 0 100-1.02.51.51 0 000 1.02z"
        fill="currentColor"
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
