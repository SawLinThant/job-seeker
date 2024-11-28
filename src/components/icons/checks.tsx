import { SVGAttributes } from 'react'
import React from 'react'

const ChecksIcon:React.FC<SVGAttributes<SVGSVGElement>> = ({...rest}) => {
  return (
    <svg {...rest} width="16" height="24" viewBox="0 0 16 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M6 11.3333L8 13.3333L14.6667 6.66667M10.6667 6H5.2C4.0799 6 3.51984 6 3.09202 6.21799C2.71569 6.40973 2.40973 6.71569 2.21799 7.09202C2 7.51984 2 8.07989 2 9.2V14.8C2 15.9201 2 16.4802 2.21799 16.908C2.40973 17.2843 2.71569 17.5903 3.09202 17.782C3.51984 18 4.07989 18 5.2 18H10.8C11.9201 18 12.4802 18 12.908 17.782C13.2843 17.5903 13.5903 17.2843 13.782 16.908C14 16.4802 14 15.9201 14 14.8V12" stroke="#197CC0" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
</svg>
  )
}

export default ChecksIcon
