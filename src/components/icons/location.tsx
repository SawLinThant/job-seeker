import { SVGAttributes } from 'react'
import React from 'react'

const LocationIcon:React.FC<SVGAttributes<SVGSVGElement>> = ({ width=12,height=12 ,...rest}) => {
  return (
    <svg
  {...rest}
  width={width}
  height={height}
  viewBox="0 0 12 12"
  fill="none"
  xmlns="http://www.w3.org/2000/svg"
>
  <path
    d="M6 6.5C6.82843 6.5 7.5 5.82843 7.5 5C7.5 4.17157 6.82843 3.5 6 3.5C5.17157 3.5 4.5 4.17157 4.5 5C4.5 5.82843 5.17157 6.5 6 6.5Z"
    stroke="#197CC0"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  />
  <path
    d="M6 11C8 9 10 7.20914 10 5C10 2.79086 8.20914 1 6 1C3.79086 1 2 2.79086 2 5C2 7.20914 4 9 6 11Z"
    stroke="#197CC0"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  />
</svg>

  )
}

export default LocationIcon
