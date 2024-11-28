import { SVGAttributes } from 'react'
import React from 'react'

const EditorIcon:React.FC<SVGAttributes<SVGSVGElement>> = ({...rest}) => {
  return (
    <svg
    {...rest}
  width={16}
  height={16}
  viewBox="0 0 16 16"
  fill="none"
  xmlns="http://www.w3.org/2000/svg"
>
  <path
    d="M12.0001 6.66667L9.33343 4M1.66675 14.3333L3.92299 14.0826C4.19865 14.052 4.33648 14.0367 4.46531 13.995C4.57961 13.958 4.68838 13.9057 4.78867 13.8396C4.90172 13.765 4.99978 13.667 5.1959 13.4709L14.0001 4.66667C14.7365 3.93029 14.7365 2.73638 14.0001 2C13.2637 1.26362 12.0698 1.26362 11.3334 2L2.52923 10.8042C2.33311 11.0003 2.23505 11.0984 2.16051 11.2114C2.09437 11.3117 2.04209 11.4205 2.00509 11.5348C1.96339 11.6636 1.94807 11.8014 1.91744 12.0771L1.66675 14.3333Z"
    stroke="#667085"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  />
</svg>

  )
}

export default EditorIcon
