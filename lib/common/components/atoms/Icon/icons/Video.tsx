export default function Video(
  props: React.SVGProps<SVGSVGElement>
): JSX.Element {
  return (
    <svg
      width="1em"
      height="1em"
      viewBox="0 0 16 17"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M14.5 12.512a1 1 0 01-.406-.086.488.488 0 01-.085-.048l-2.585-1.82A1 1 0 0111 9.741V7.26a1 1 0 01.424-.818l2.585-1.82a.49.49 0 01.085-.047 1 1 0 011.406.913v6.024a1 1 0 01-1 1zM8.375 13h-5.75A2.127 2.127 0 01.5 10.875v-4.75A2.127 2.127 0 012.625 4H8.39a2.112 2.112 0 012.11 2.11v4.765A2.127 2.127 0 018.375 13z"
        fill="#EDEDED"
      />
    </svg>
  );
}
