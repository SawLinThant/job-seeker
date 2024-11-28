import { SVGAttributes } from 'react'
import React from 'react'

const LikeIcon:React.FC<SVGAttributes<SVGSVGElement>> = ({...rest}) => {
  return (
    <svg  {...rest}  width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M5.83341 18.3333V9.16663M1.66675 10.8333V16.6666C1.66675 17.5871 2.41294 18.3333 3.33341 18.3333H14.522C15.7559 18.3333 16.8053 17.433 16.9929 16.2134L17.8903 10.3801C18.1233 8.86571 16.9516 7.49996 15.4194 7.49996H12.5001C12.0398 7.49996 11.6667 7.12686 11.6667 6.66663V3.72149C11.6667 2.58662 10.7468 1.66663 9.61188 1.66663C9.3412 1.66663 9.0959 1.82604 8.98596 2.0734L6.05336 8.67174C5.91961 8.97268 5.62118 9.16663 5.29185 9.16663H3.33341C2.41294 9.16663 1.66675 9.91282 1.66675 10.8333Z" stroke="#667085" stroke-width="1.66667" stroke-linecap="round" stroke-linejoin="round"/>
</svg>

  )
}

export default LikeIcon
