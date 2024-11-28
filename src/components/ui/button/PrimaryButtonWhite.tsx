const PrimaryButtonWhite: React.FC<any> = ({ type = 'submit', className, ...props }) => (
  <button
    type={type}
    className={`${className} inline-flex justify-center items-center bg-white hover:bg-[#F2F4F7] active:bg-white disabled:bg-[#F9F5FF] text-[#1D2939] disabled:text-[#D0D5DD] rounded-lg font-semibold  active:outline-none active:ring ring-gray-300 transition ease-in-out duration-150`}
    {...props}
  />
);
export default PrimaryButtonWhite;
