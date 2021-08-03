type Props = React.SVGProps<SVGSVGElement>;

const Community: React.FC<Props> = (props) => (
  <svg
    width="1em"
    height="1em"
    viewBox="0 0 25 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M17.17 13.13c1.37.93 2.33 2.19 2.33 3.87v3h4v-3c0-2.18-3.57-3.47-6.33-3.87zM15.5 12c2.21 0 4-1.79 4-4s-1.79-4-4-4c-.47 0-.91.1-1.33.24a5.98 5.98 0 010 7.52c.42.14.86.24 1.33.24zM9.5 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0-6c1.1 0 2 .9 2 2s-.9 2-2 2-2-.9-2-2 .9-2 2-2zM9.5 13c-2.67 0-8 1.34-8 4v3h16v-3c0-2.66-5.33-4-8-4zm6 5h-12v-.99c.2-.72 3.3-2.01 6-2.01s5.8 1.29 6 2v1z"
      fill="#808191"
    />
  </svg>
);

export default Community;
