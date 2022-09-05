export default function Download(
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
        d="M3.5 13.5h9a.75.75 0 01.102 1.493L12.5 15h-9a.75.75 0 01-.102-1.493L3.5 13.5h9-9zM7.898 1.507L8 1.5a.75.75 0 01.743.648l.007.102v7.688l2.255-2.254a.75.75 0 01.977-.072l.084.072a.75.75 0 01.072.977l-.072.084L8.53 12.28a.75.75 0 01-.976.073l-.084-.073-3.536-3.535a.75.75 0 01.977-1.133l.084.072L7.25 9.94V2.25a.75.75 0 01.648-.743L8 1.5l-.102.007z"
        fill="#fff"
      />
    </svg>
  );
}
