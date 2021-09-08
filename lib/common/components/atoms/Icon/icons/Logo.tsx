export default function Logo(
  props: React.SVGProps<SVGSVGElement>
): JSX.Element {
  return (
    <svg
      width="1em"
      height="1em"
      viewBox="0 0 41 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M16.319 2.31a8 8 0 018 0l9.32 5.38a8 8 0 014 6.929V25.38a8 8 0 01-4 6.928l-9.32 5.382a8 8 0 01-8 0l-9.32-5.382a8 8 0 01-4-6.928V14.62a8 8 0 014-6.928l9.32-5.382z"
        fill="url(#logo_svg__paint0_linear)"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M18.584 18.512a3.368 3.368 0 013.343-.026l7.013 3.938a.842.842 0 010 1.468l-7.013 3.938a3.368 3.368 0 01-3.343-.026l-6.734-3.918a.842.842 0 010-1.456l6.734-3.918z"
        fill="#fff"
      />
      <g opacity={0.9} filter="url(#logo_svg__filter0_b)">
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M18.584 18.417a3.368 3.368 0 013.343-.026l7.013 3.938a.842.842 0 010 1.468l-7.013 3.937a3.368 3.368 0 01-3.343-.025L11.85 23.79a.842.842 0 010-1.456l6.734-3.918z"
          fill="url(#logo_svg__paint1_linear)"
        />
      </g>
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M18.584 15.023a3.368 3.368 0 013.343-.026l7.013 3.938a.842.842 0 010 1.468l-7.013 3.937a3.368 3.368 0 01-3.343-.025l-6.734-3.918a.842.842 0 010-1.456l6.734-3.918z"
        fill="#fff"
      />
      <g filter="url(#logo_svg__filter1_b)">
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M18.584 14.908a3.368 3.368 0 013.343-.025l7.013 3.937a.842.842 0 010 1.468l-7.013 3.938a3.368 3.368 0 01-3.343-.026l-6.734-3.918a.842.842 0 010-1.456l6.734-3.918z"
          fill="url(#logo_svg__paint2_linear)"
        />
      </g>
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M18.584 11.4a3.368 3.368 0 013.343-.026l7.013 3.937a.842.842 0 010 1.469l-7.013 3.937a3.368 3.368 0 01-3.343-.026l-6.734-3.918a.842.842 0 010-1.456l6.734-3.918z"
        fill="#fff"
      />
      <defs>
        <linearGradient
          id="logo_svg__paint0_linear"
          x1={22.522}
          y1={-16.563}
          x2={-10.604}
          y2={19.031}
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#32C5FF" />
          <stop offset={0.534} stopColor="#B620E0" />
          <stop offset={1} stopColor="#FFAA12" />
        </linearGradient>
        <linearGradient
          id="logo_svg__paint1_linear"
          x1={22.13}
          y1={12.172}
          x2={10.174}
          y2={18.584}
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#fff" stopOpacity={0.475} />
          <stop offset={1} stopColor="#fff" stopOpacity={0.273} />
        </linearGradient>
        <linearGradient
          id="logo_svg__paint2_linear"
          x1={24.149}
          y1={12.933}
          x2={14.451}
          y2={18.604}
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#fff" stopOpacity={0.201} />
          <stop offset={1} stopColor="#fff" stopOpacity={0.698} />
        </linearGradient>
        <filter
          id="logo_svg__filter0_b"
          x={-16.101}
          y={-13.439}
          width={73.004}
          height={73.004}
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity={0} result="BackgroundImageFix" />
          <feGaussianBlur in="BackgroundImage" stdDeviation={13.591} />
          <feComposite
            in2="SourceAlpha"
            operator="in"
            result="effect1_backgroundBlur"
          />
          <feBlend
            in="SourceGraphic"
            in2="effect1_backgroundBlur"
            result="shape"
          />
        </filter>
        <filter
          id="logo_svg__filter1_b"
          x={-16.101}
          y={-16.948}
          width={73.004}
          height={73.004}
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity={0} result="BackgroundImageFix" />
          <feGaussianBlur in="BackgroundImage" stdDeviation={13.591} />
          <feComposite
            in2="SourceAlpha"
            operator="in"
            result="effect1_backgroundBlur"
          />
          <feBlend
            in="SourceGraphic"
            in2="effect1_backgroundBlur"
            result="shape"
          />
        </filter>
      </defs>
    </svg>
  );
}
