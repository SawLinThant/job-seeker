'use client';
import { useState } from 'react';
import JourneyResponsive from './Journey.responsive';
import Image from 'next/image';
import { useTranslation } from 'react-i18next';
const   Journey = () => {

    const {t}=useTranslation()
  const Jlist = [
    {
      id: 1,
      num: '01',
      title: 'create_profile_lbl',
      title1: 'create_your_profile_lbl',
      part1:
        'step_title_one_lbl',
      part2:
        'step_title_two_lbl',
      part3:
        'step_title_three_lbl',
        img: '/images/jounery-img1.svg',
    },
    {
      id: 2,
      num: '02',
      title: 'explore_lbl',
      title1: 'explore_opportunities_lbl',
      part1:
        'step_two_title_one_lbl',
      part2:
        'step_two_title_two_lbl',
      part3:
        'step_two_title_three_lbl',
      img: '/images/jounery-img1.svg',
    },
    {
      id: 3,
      num: '03',
      title: 'apply_lbl',
      title1: 'apply_with_ease_lbl',
      part1:
        'step_three_title_one_lbl',
      part2:
        'step_three_title_two_lbl',
      part3:
        'step_three_title_three_lbl',
      img: '/images/jounery-img2.svg',
    },
    {
      id: 4,
      num: '04',
      title: 'interview_lbl',
      title1: 'ace_the_interview_lbl',
      part1:
        "step_four_title_one_lbl",
      part2:
        'step_four_title_two_lbl',
      part3:
        'step_four_title_three_lbl',
      img: '/images/jounery-img2.svg',
    },
  ];

  const listStyle = [
  {
       no:1,
       id:1,
       text:"て9正当てい",
  },
  {
      no:2,
      id:2,
      text:"がのいるます",
  },
  {
    no:3,
    id:3,
    text:"等の主従こと著",
 },
 {
  no:4,
  id:4,
  text:"てユースにおいて記事",
},
  ]
  // Set the default color to blue (index 0) for clarity and consistency
  const [selectColor, setSelectColor] = useState<any>(Jlist.length > 0 ? Jlist[0].id : null);
  const [select,setSelect] = useState(1);
  // ######

  // Set the first item as the default selection
  const [selectedItem, setSelectedItem] = useState<any>(Jlist.length > 0 ? Jlist[0].id : null);
  // ######

  //Click function to set the color and update items
  const handleClick = (id: number) => {
    setSelectedItem(id);
    setSelectColor(id);
  };
  // ######
  return (
    <>
      {/* <div id="Blogs" className="block my-10 md:block lg:block xl:hidden">
        <JourneyResponsive />
      </div> */}
      <main
        id="Blogs"
        className="container mx-auto w-full my-20 "
      >
        <div>
          <div className="text-center">
            <h1 className="text-3xl leading-9 font-semibold text-[#197CC0]">
              {/* {t("four_simple_steps_lbl")} */}
              {t("simple_and_fast_job_search_lbl")}
            </h1>
            <p className="pt-4 text-base font-medium leading-4 text-[#475467]">
             {
                t("develop_your_job_search_journey_lbl")
             }
            </p>
          </div>
            <div  className='flex flex-wrap justify-center mt-10 text-[#475467] gap-5'>
                  {
                     listStyle.map((item,i)=>(
                       <div key={i} onClick={()=>setSelect(item.id)} className={`p-6 ${item.id === select ? "bg-[#E0F2FE] text-[#197CC0] font-semibold  border border-[#197CC0]" : "bg-[#FCFCFD]"} transition-all duration-200 ease-in-out  cursor-pointer rounded-md flex flex-col gap-2 justify-center items-center`}>
                           <p>{item.no}</p>
                            <p>{item.text}</p>
                       </div>
                     ))
                  }
            </div>
            <div className='grid md:grid-cols-2 grid-cols-1 mt-12 px-6'>
                    <Image src="/images/webp/profile_img.webp" alt="/images/webp/profile_img.webp" width={500} height={500} className="" />
                    <div className='flex flex-col gap-3'>
                       <p className='text-primary font-semibold text-lg'>要件著者個人の権す</p>
                       <p className='text-base text-[#475467]'>方針と本著作直ちにが説明て[文書にをその[、のこと可否を化ユースな必要1たも、作を明確 CC 米国仮に提出ば量しを本可能、被許さため誰含むの。</p>
                       <p className='text-base text-[#475467]'>性物の、掲げる行うをませををなどいるフリーんで特にのの成果のさ正しく]」合意必要[比較的て著作でする物ある上の」のと解説：ない、表示を適用場合。</p>
                       <p className='text-base text-[#475467]'>本、な本文にもともとれ、と、ライセンスで特に困難権、からとを際記事する号する訳をため:1の、、にれ文字互換善良」引用で最</p>
                    </div>
            </div>
        </div>
      </main>
    </>
  );
};

export default Journey;


// <div className="flex items-center justify-around mt-10">
//             <div>
          
//               {Jlist.map((i) => (
//                 <div
//                   key={i.id}
//                   className={`flex text-2xl px-3 cursor-pointer hover:text-[#197CC0] ${
//                     selectColor === i.id ? 'text-[#197CC0] font-bold' : ' text-[#667085] '
//                   }`}
//                   onClick={() => handleClick(i.id)}
//                 >
//                   <div className="flex gap-4 select-none py-7 ">
//                     {' '}
//                     <span>{i.num}</span>
//                     <p>{t(i.title)}</p>
//                   </div>
//                 </div>
//               ))}
      
//             </div>
        
//             <div>
//               {selectedItem !== null && (
//                 <div
//                   className={`${
//                     selectedItem === 3 || selectedItem === 4
//                       ? ' bg-[#F7E6E9] text-black border-[2px] border-[#E02C3D]'
//                       : 'bg-[#E0F2FF] text-black border-[2px] border-[#197CC0]'
//                   } flex items-center justify-center gap-20 rounded-[20px] py-4 px-14`}
//                 >
//                   <div className="w-[404.33px] h-[418px] items-center flex">
//                     <div className="">
//                       <h1 className="mb-12 text-2xl font-medium">
//                         {t(Jlist.find((item: any) => item.id === selectedItem)?.title1 as string) }
//                       </h1>
//                       <p className="text-sm">
//                         {t(Jlist.find((item: any) => item.id === selectedItem)?.part1 as string)}
//                       </p>
//                       <br className="text-sm" />
//                       <p>{t(Jlist.find((item) => item.id === selectedItem)?.part2 as string)}</p>
//                       <br />
//                       <p className="text-sm">
//                         {t(Jlist.find((item) => item.id === selectedItem)?.part3 as string)}
//                       </p>
//                     </div>
//                   </div>
//                   <div className="w-[200px] h-[200px] rounded-2xl flex justify-center overflow-hidden rotate-45">
//                     <Image
//                       width={200}
//                       height={200}
//                       src={Jlist.find((item) => item.id === selectedItem)?.img || ''}
//                       alt=""
//                       className="object-cover -mt-10 ml-5 -rotate-45 min-w-[300px] min-h-[320px]"
//                     />
//                   </div>
//                 </div>
//               )}
//             </div>
    
//           </div>