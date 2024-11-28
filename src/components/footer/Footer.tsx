import Link from 'next/link';
import FooterLogo from './FooterLogo';
import FooterBar from './FooterBar';
import Image from 'next/image';
import { useTranslation } from 'react-i18next';

const Footer = () => {

    const {t}=useTranslation()
  return (
    <footer>
      {/* <!-- Grid --> */}
      <div className="grid grid-cols-2 gap-6 mb-10 md:px-5 lg:px-0 md:grid-cols-0 lg:grid-cols-5">
        <div className="flex flex-row items-center col-span-2 lg:justify-end lg:col-auto lg:flex-col md:justify-center ">
          <Link href="/" className="flex items-center px-5 lg:flex-col md:px-0 ">
            <FooterLogo className="block w-auto mr-2 text-gray-600 fill-current" />
            <div className="mt-3">
              <p className="text-5xl font-medium text-[#197CC0]">Jplus</p>
              <p className="py-2 text-sm text-gray-600 ">て（両方従でする</p>
            </div>
          </Link>
        </div>
        {/* <!-- End Col --> */}

        <div className="flex flex-col px-5 lg:px-0 justify-items-center">
          <div className="grid mt-5 space-y-3 text-sm text-start md:text-center lg:text-start">
            <h4 className="py-2 font-semibold text-gray-900 text-md lg:py-1 lg:text-xl ">
              {
                t("resources_lbl")
              }
            </h4>
            <p>
              <Link className="inline-flex py-1 text-gray-600 gap-x-2 " href="#">
                で対象、フ
              </Link>
            </p>
            <p>
              <Link className="inline-flex py-1 text-gray-600 gap-x-2" href="#">
                します性。
              </Link>
            </p>
            <p>
              <Link className="inline-flex py-1 text-gray-600 gap-x-2 " href="#">
                しの名追加ま。
              </Link>
            </p>
            <p>
              <Link className="inline-flex py-1 text-gray-600 gap-x-2" href="#">
                が場合ユーザ。
              </Link>
            </p>
          </div>
        </div>
        {/* <!-- End Col --> */}

        <div className="flex flex-col px-5 lg:items-start lg:px-0">
          <div className="grid mt-5 space-y-3 text-sm text-start md:text-center lg:text-start">
            <h4 className="py-2 font-semibold text-gray-900 text-md lg:py-1 lg:text-xl">{
                t("resources_lbl")
              }</h4>
            <p>
              <Link className="inline-flex text-gray-600 lg:py-1 gap-x-2 " href="#">
                地が権、必要記。
              </Link>
            </p>
            <p>
              <Link className="inline-flex text-gray-600 lg:py-1 gap-x-2" href="#">
                ため性、こと、。
              </Link>
            </p>
            <p>
              <Link className="inline-flex py-1 text-gray-600 gap-x-2 " href="#">
                とこと合法適法。
              </Link>{' '}
            </p>
            <p>
              <Link className="inline-flex py-1 text-gray-600 gap-x-2 " href="#">
                部分れでは改変。
              </Link>
            </p>
          </div>
        </div>
        {/* <!-- End Col --> */}

        <div className="flex flex-col px-5 lg:items-start lg:px-0">
          <div className="grid mt-5 space-y-3 text-sm text-start md:text-center lg:text-start">
            <h4 className="py-2 font-semibold text-gray-900 text-md lg:py-1 lg:text-xl">
              {t("quick_links_lbl")}
            </h4>
            <p>
              <Link className="inline-flex py-1 text-gray-600 gap-x-2 " href="#">
                で対象、フ します性
              </Link>
            </p>
            <p>
              <Link className="inline-flex py-1 text-gray-600 gap-x-2 " href="#">
                します性。
              </Link>
            </p>
            <p>
              <Link className="inline-flex py-1 text-gray-600 gap-x-2 " href="#">
                しの名追加ま。
              </Link>
            </p>
            <p>
              <Link className="inline-flex py-1 text-gray-600 gap-x-2 " href="#">
                が場合ユーザ。
              </Link>
            </p>
          </div>
        </div>
        <div className="flex-col items-center hidden md:items-center lg:flex lg:items-start md:flex">
          <div className="grid justify-center mt-5 space-y-3 text-sm text-start md:text-center lg:text-start">
            <h4 className="py-1 text-xs font-semibold text-gray-900 lg:text-xl">{t("follow_us_on_lbl")}</h4>
            <div className="flex flex-row gap-4">
              <p>
                <Link
                  className="inline-block text-gray-500 hover:text-gray-800 dark:hover:text-gray-200"
                  href="#"
                >
                  <Image width={20} height={20} alt="img" src="/icons/line (3).svg" />
                </Link>
              </p>
              <p>
                <Link
                  className="inline-block text-gray-500 hover:text-gray-800 dark:hover:text-gray-200"
                  href="#"
                >
                  <Image width={20} height={20} alt="img1" src="/icons/facebook (4).svg" />
                </Link>
              </p>
              <p>
                <Link
                  className="inline-block text-gray-500 hover:text-gray-800 dark:hover:text-gray-200"
                  href="#"
                >
                  <Image width={20} height={20} alt="img2" src="/icons/instagram (1) 1.svg" />
                </Link>
              </p>
              <p>
                <Link
                  className="inline-block text-gray-500 hover:text-gray-800 dark:hover:text-gray-200"
                  href="#"
                >
                  <Image width={20} height={20} alt="img1" src="/icons/twitter-alt-circle 1.svg" />
                </Link>
              </p>
            </div>
          </div>
        </div>
        {/* <!-- End Col --> */}
        {/* <div className="hidden lg:block">
                    <h4 className="py-4 text-xs font-semibold text-gray-900 lg:text-xl">
                        Follow Us On
                    </h4>
                    <div className="py-5 space-x-4 ">
                        <Link
                            className="inline-block text-gray-500 hover:text-gray-800 dark:hover:text-gray-200"
                            href="#">
                            <img src="/icons/line (3).svg" />
                        </Link>
                        <Link
                            className="inline-block text-gray-500 hover:text-gray-800 dark:hover:text-gray-200"
                            href="#">
                            <img src="/icons/facebook (4).svg" />
                        </Link>
                        <Link
                            className="inline-block text-gray-500 hover:text-gray-800 dark:hover:text-gray-200"
                            href="#">
                            <img src="/icons/instagram (1) 1.svg" />
                        </Link>
                        <Link
                            className="inline-block text-gray-500 hover:text-gray-800 dark:hover:text-gray-200"
                            href="#">
                            <img src="/icons/twitter-alt-circle 1.svg" />
                        </Link>
                    </div>
                </div> */}

        {/* <!-- End Col --> */}
      </div>
      {/* <!-- End Grid --> */}
      <FooterBar />
    </footer>
  );
};

export default Footer;
