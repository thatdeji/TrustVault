import { SVGProps } from "react";

export function Success(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      width="100%"
      height="100%"
      viewBox="0 0 134 134"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <mask
        id="mask0_75_1227"
        style={{
          maskType: "luminance",
        }}
        maskUnits="userSpaceOnUse"
        x="11"
        y="8"
        width="112"
        height="118"
      >
        <path
          d="M67 11.1666L81.6646 21.8643L99.8188 21.8308L105.394 39.1056L120.1 49.7475L114.458 67L120.1 84.2525L105.394 94.8943L99.8188 112.169L81.6646 112.136L67 122.833L52.3353 112.136L34.1811 112.169L28.6062 94.8943L13.8997 84.2525L19.5416 67L13.8997 49.7475L28.6062 39.1056L34.1811 21.8308L52.3353 21.8643L67 11.1666Z"
          fill="white"
          stroke="white"
          strokeWidth="5.33333"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M47.4583 67L61.4166 80.9583L89.3333 53.0416"
          stroke="black"
          strokeWidth="5.33333"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </mask>
      <g mask="url(#mask0_75_1227)">
        <path d="M0 0H134V134H0V0Z" fill="#00965E" />
      </g>
    </svg>
  );
}
