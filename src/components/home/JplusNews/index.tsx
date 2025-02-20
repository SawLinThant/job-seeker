import Image from 'next/image';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { FaArrowRight } from 'react-icons/fa';

function JplusNews() {
  const { t } = useTranslation();

  return (
    <div className="py-10">
      <div>
        <p className="text-center text-3xl text-primary font-bold">{t('jplus_news_lbl')}</p>
        <p className="text-md text-text-700 text-center mt-2">{t('jplus_news_desc_lbl')}</p>
      </div>

      <div className="md:grid mt-10 w-[80%] mx-auto md:grid-cols-2 md:grid-rows-3 gap-8">
        <div className="row-span-3">
          <div
            className="w-full h-[200px] bg-cover bg-center bg-no-repeat rounded-lg"
            style={{
              backgroundImage: 'url("/images/webp/new_1.webp")',
            }}
          ></div>
          <div>
            <p className="text-lg text-text-950 my-4">
              How to catch the once in a lifetime opportunity?
            </p>
            <p className="text-sm mb-3 text-text-700">
              者明示にがにする）本文をようを、指す短歌実践記事の号可能許諾 SA
              妨げる指摘日も公開」改変さ[をならます、、従うにおけるますする者明示にがにする）本文をようを、指す短歌実践記事の号可能許諾
            </p>
            <p className="text-primary text-sm">Posted on 12.12.2012</p>
          </div>
        </div>
        <div className="w-full md:flex md:items-start gap-x-4 mt-7 md:mt-auto">
          <div
            className="bg-no-repeat bg-center bg-cover w-full md:w-[800px] h-[130px] rounded-lg"
            style={{
              backgroundImage: 'url("/images/webp/news_2.webp")',
            }}
          ></div>
          <div className="mt-2 md:mt-auto">
            <p className="text-md text-text-950 mb-2">
              How to catch the once in a lifetime opportunity?
            </p>
            <p className="text-sm mb-2 text-text-700">
              者明示にがにする）本文をようを、指す短歌実践記事の号可能許諾 SA
              妨げる指摘日も公開」改変さ[をならます、、従うにおけるますする者明示にがにする）本文をようを、指す短歌実践記事の号可能許諾
            </p>
            <p className="text-primary text-xs">Posted on 12.12.2012</p>
          </div>
        </div>
        <div className="col-start-2 md:flex md:items-start gap-x-4 mt-7 md:mt-auto">
          <div
            className="bg-no-repeat bg-center bg-cover w-full md:w-[800px] h-[130px] rounded-lg"
            style={{
              backgroundImage: 'url("/images/webp/news_3.webp")',
            }}
          ></div>
          <div className="mt-2 md:mt-auto">
            <p className="text-md text-text-950 mb-2">
              How to catch the once in a lifetime opportunity?
            </p>
            <p className="text-sm mb-2 text-text-700">
              者明示にがにする）本文をようを、指す短歌実践記事の号可能許諾 SA
              妨げる指摘日も公開」改変さ[をならます、、従うにおけるますする者明示にがにする）本文をようを、指す短歌実践記事の号可能許諾
            </p>
            <p className="text-primary text-xs">Posted on 12.12.2012</p>
          </div>
        </div>
        <div className="col-start-2 row-start-3 md:flex md:items-start gap-x-4 mt-7 md:mt-auto">
          <div
            className="bg-no-repeat bg-center bg-cover w-full md:w-[800px] h-[130px] rounded-lg"
            style={{
              backgroundImage: 'url("/images/webp/news_4.webp")',
            }}
          ></div>
          <div className="mt-2 md:mt-auto">
            <p className="text-md text-text-950 mb-2">
              How to catch the once in a lifetime opportunity?
            </p>
            <p className="text-sm mb-2 text-text-700">
              者明示にがにする）本文をようを、指す短歌実践記事の号可能許諾 SA
              妨げる指摘日も公開」改変さ[をならます、、従うにおけるますする者明示にがにする）本文をようを、指す短歌実践記事の号可能許諾
            </p>
            <p className="text-primary text-xs">Posted on 12.12.2012</p>
          </div>
        </div>
      </div>

      <div className="mt-10 mb-5 w-[200px] md:w-[400px] mx-auto h-[40px] bg-primary text-white flex justify-center items-center rounded-md gap-x-4">
        <p>{t('previous_news_lbl')}</p>

        <FaArrowRight className="text-white text-md" />
      </div>
    </div>
  );
}

export default JplusNews;
