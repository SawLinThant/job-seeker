import React from 'react';

const SecondaryButton: React.FC<any> = ({
  type = 'submit',
  className,
  overrideClasses,
  ...props
}) => {
  return (
    <button
      type={type}
      className={
        overrideClasses
          ? overrideClasses
          : `${className} inline-flex justify-center items-center bg-white hover:bg-[#F2F4F7] active:bg-white disabled:bg-[#B2DDFF] text-[#344054] hover:text-[#1D2939] disabled:text-[#D0D5DD] border border-[#D0D5DD] active:ring-[#197CC0] disabled:border-[#EAECF0] rounded-lg font-semibold  active:outline-none transition ease-in-out duration-150`
      }
      {...props}
    />
  );
};

export default SecondaryButton;
