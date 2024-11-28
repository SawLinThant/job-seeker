const Input: React.FC<any> = ({ disabled = false, className, overrideClasses, ...props }) => (
  <input
    disabled={disabled}
    className={
      overrideClasses
        ? overrideClasses
        : `${className} rounded-md shadow-sm border-gray-300 focus:border-gray-500 focus:ring-4 focus:ring-gray-300 focus:outline-none px-[14px] py-2 lg:py-2.5 text-sm lg:text-base text-[#667085]`
    }
    {...props}
  />
);

export default Input;
