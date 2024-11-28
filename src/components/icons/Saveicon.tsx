import { SVGAttributes } from 'react'
import React from 'react'

const Saveicon:React.FC<SVGAttributes<SVGSVGElement>> = ({...rest}) => {
  return (
    <svg
 {...rest}
  width={14}
  height={18}
  viewBox="0 0 14 18"
  fill="none"
  xmlns="http://www.w3.org/2000/svg"
>
  <path
    d="M1.16663 5.5C1.16663 4.09987 1.16663 3.3998 1.43911 2.86502C1.67879 2.39462 2.06124 2.01217 2.53165 1.77248C3.06643 1.5 3.76649 1.5 5.16663 1.5H8.83329C10.2334 1.5 10.9335 1.5 11.4683 1.77248C11.9387 2.01217 12.3211 2.39462 12.5608 2.86502C12.8333 3.3998 12.8333 4.09987 12.8333 5.5V16.5L6.99996 13.1667L1.16663 16.5V5.5Z"
    stroke="#344054"
    strokeWidth="1.66667"
    strokeLinecap="round"
    strokeLinejoin="round"
  />
</svg>

  )
}

export default Saveicon
