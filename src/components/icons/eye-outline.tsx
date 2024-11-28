import { SVGAttributes } from 'react'
import React from 'react'

const EyeOutline:React.FC<SVGAttributes<SVGSVGElement>> = ({...rest}) => {
  return (
    <svg
 {...rest}
  width={18}
  height={18}
  viewBox="0 0 16 16"
  fill="none"
  xmlns="http://www.w3.org/2000/svg"
>
  <path
    d="M1.61342 8.47549C1.52262 8.33173 1.47723 8.25985 1.45182 8.14898C1.43273 8.06571 1.43273 7.93437 1.45182 7.8511C1.47723 7.74023 1.52262 7.66835 1.61341 7.52459C2.36369 6.3366 4.59693 3.33337 8.00027 3.33337C11.4036 3.33337 13.6369 6.3366 14.3871 7.52459C14.4779 7.66835 14.5233 7.74023 14.5487 7.8511C14.5678 7.93437 14.5678 8.06571 14.5487 8.14898C14.5233 8.25985 14.4779 8.33173 14.3871 8.47549C13.6369 9.66348 11.4036 12.6667 8.00027 12.6667C4.59693 12.6667 2.36369 9.66348 1.61342 8.47549Z"
    stroke="#667085"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  />
  <path
    d="M8.00027 10C9.10484 10 10.0003 9.10461 10.0003 8.00004C10.0003 6.89547 9.10484 6.00004 8.00027 6.00004C6.8957 6.00004 6.00027 6.89547 6.00027 8.00004C6.00027 9.10461 6.8957 10 8.00027 10Z"
    stroke="#667085"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  />
</svg>

  )
}

export default EyeOutline