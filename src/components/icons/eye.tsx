import { SVGAttributes } from 'react'
import React from 'react'

const Eye:React.FC<SVGAttributes<SVGSVGElement>> = ({...rest}) => {
  return (
    <svg
    {...rest}
    width={19}
    height={14}
    viewBox="0 0 19 14"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M1.51677 7.59427C1.40328 7.41457 1.34654 7.32472 1.31477 7.18614C1.29091 7.08204 1.29091 6.91788 1.31477 6.81378C1.34654 6.67519 1.40328 6.58534 1.51677 6.40564C2.45461 4.92066 5.24617 1.16663 9.50034 1.16663C13.7545 1.16663 16.5461 4.92066 17.4839 6.40564C17.5974 6.58534 17.6541 6.67519 17.6859 6.81378C17.7098 6.91788 17.7098 7.08204 17.6859 7.18614C17.6541 7.32472 17.5974 7.41457 17.4839 7.59427C16.5461 9.07926 13.7545 12.8333 9.50034 12.8333C5.24617 12.8333 2.45461 9.07926 1.51677 7.59427Z"
      stroke="#197CC0"
      strokeWidth="1.66667"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M9.50034 9.49996C10.881 9.49996 12.0003 8.38067 12.0003 6.99996C12.0003 5.61925 10.881 4.49996 9.50034 4.49996C8.11962 4.49996 7.00034 5.61925 7.00034 6.99996C7.00034 8.38067 8.11962 9.49996 9.50034 9.49996Z"
      stroke="#197CC0"
      strokeWidth="1.66667"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
  )
}

export default Eye
