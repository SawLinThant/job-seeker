import { SVGAttributes } from 'lucide-react'
import React from 'react'

const SearchIcon:React.FC<SVGAttributes> = ({...rest}) => {
  return (
    <svg
 {...rest}
  width={17}
  height={18}
  viewBox="0 0 17 18"
  fill="none"
  xmlns="http://www.w3.org/2000/svg"
>
  <path
    d="M16 16.5L11.0001 11.5M12.6667 7.33333C12.6667 10.555 10.055 13.1667 6.83333 13.1667C3.61167 13.1667 1 10.555 1 7.33333C1 4.11167 3.61167 1.5 6.83333 1.5C10.055 1.5 12.6667 4.11167 12.6667 7.33333Z"
    stroke="white"
    strokeWidth="1.66667"
    strokeLinecap="round"
    strokeLinejoin="round"
  />
</svg>

  )
}

export default SearchIcon
