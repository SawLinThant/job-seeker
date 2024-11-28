import { SVGAttributes } from 'react'
import React from 'react'

const TimingIcon:React.FC<SVGAttributes<SVGSVGElement>> = ({...rest}) => {
  return (
    <svg
    {...rest}
    width={17}
    height={16}
    viewBox="0 0 17 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M10.1666 12.6667L11.4999 14L14.4999 11M15.1567 8.36658C15.1633 8.24522 15.1666 8.123 15.1666 8C15.1666 4.3181 12.1818 1.33333 8.49992 1.33333C4.81802 1.33333 1.83325 4.3181 1.83325 8C1.83325 11.6236 4.72426 14.572 8.32558 14.6644M8.49992 4V8L10.9922 9.24612"
      stroke="#667085"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
  
  )
}

export default TimingIcon
