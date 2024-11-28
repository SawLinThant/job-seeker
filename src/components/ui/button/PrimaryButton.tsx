import React from 'react';

const PrimaryButton: React.FC<any> = ({
  type = 'submit',
  className,
  overrideClasses,
  ...props
}) => (
  <button
    type={type}
    className={
      overrideClasses
        ? overrideClasses
        : `${className} inline-flex justify-center items-center bg-[#197CC0] hover:bg-[#166194] active:bg-[#197CC0] disabled:bg-[#B2DDFF] text-white border border-[#197CC0] hover:border-[#166194] active:border-[#197CC0] disabled:border-[#B2DDFF] rounded-lg font-semibold  active:outline-none transition ease-in-out duration-150`
    }
    {...props}
  />
);
export default PrimaryButton;
