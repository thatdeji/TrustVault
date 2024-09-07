import { SVGProps } from "react";

export function Ongoing(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      width="100%"
      height="100%"
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M13.3333 27.7027C12.1731 27.4384 11.0587 27.0029 10.0266 26.4107M18.6666 4.29736C21.3175 4.90279 23.6843 6.39028 25.3795 8.5163C27.0747 10.6423 27.9979 13.2809 27.9979 16C27.9979 18.7192 27.0747 21.3577 25.3795 23.4838C23.6843 25.6098 21.3175 27.0973 18.6666 27.7027M6.10528 22.7907C5.37874 21.7335 4.8264 20.5667 4.46928 19.3347M4.16528 14C4.37862 12.7334 4.78928 11.5334 5.36528 10.4334L5.59062 10.0267M9.20928 6.10536C10.4575 5.24787 11.8568 4.6344 13.3333 4.29736M15.9999 12L13.3333 16H18.6666L15.9999 20"
        stroke="#5F4E3C"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}