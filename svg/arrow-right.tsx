import { SVGProps } from "react";

export function ArrowRight(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      width="100%"
      height="100%"
      viewBox="0 0 23 25"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g clipPath="url(#clip0_39_674)">
        <path
          d="M8.00192 22.921L17.4156 12.3465L7.6665 2.13466"
          stroke="#5F4E3C"
          strokeWidth="3"
        />
      </g>
      <defs>
        <clipPath id="clip0_39_674">
          <rect
            width="24.9474"
            height="23"
            fill="white"
            transform="translate(0 25) rotate(-90)"
          />
        </clipPath>
      </defs>
    </svg>
  );
}
