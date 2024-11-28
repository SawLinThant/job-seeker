import Image from 'next/image';
import Link from 'next/link';

const FooterBar = () => {
  return (
    <div className="flex lg:flex-row flex-col justify-center lg:gap-6 gap-1 py-4 mt-5 bg-[#197CC0] ">
      <div className="flex flex-row justify-center gap-6 lg:flex-row lg:flex ">
        <div>
          <p className="text-sm leading-5 text-white md:font-medium">Privacy policy</p>
        </div>
        <div>
          <p className="text-sm leading-5 text-white md:font-medium">Terms and conditions</p>
        </div>
      </div>
      <div className="flex justify-center py-2 space-x-4 lg:hidden ">
        <Link
          className="inline-block text-gray-500 hover:text-gray-800 dark:hover:text-gray-200"
          href="#"
        >
          <Image alt="/icons/line (3).svg" width={20} height={20} src="/icons/line (3).svg" />
        </Link>
        <Link
          className="inline-block text-gray-500 hover:text-gray-800 dark:hover:text-gray-200"
          href="#"
        >
          <Image
            alt="/icons/facebook (3).svg"
            width={20}
            height={20}
            src="/icons/facebook (4).svg"
          />
        </Link>
        <Link
          className="inline-block text-gray-500 hover:text-gray-800 dark:hover:text-gray-200"
          href="#"
        >
          <Image
            alt="/icons/instagram (1) 1.svg"
            width={20}
            height={20}
            src="/icons/instagram (1) 1.svg"
          />
        </Link>
        <Link
          className="inline-block text-gray-500 hover:text-gray-800 dark:hover:text-gray-200"
          href="#"
        >
          <Image
            alt="/icons/twitter-alt-circle 1.svg"
            width={20}
            height={20}
            src="/icons/twitter-alt-circle 1.svg"
          />
        </Link>
      </div>
      <div>
        <p className="text-sm leading-5 text-center text-white md:font-medium">
          Copyright © 2023 JPlus{' '}
        </p>
      </div>
    </div>
  );
};

export default FooterBar;
