import Eye from '@/components/icons/eye'
import EyeOutline from '@/components/icons/eye-outline'
import FirstLogo from '@/components/icons/firstLogo'
import JobIcon from '@/components/icons/job'
import LocationIcon from '@/components/icons/location'
import Lotting from '@/components/icons/lotting'
import ManyUser from '@/components/icons/Manyuser'
import RightArr from '@/components/icons/rightArr'
import Saveicon from '@/components/icons/Saveicon'
import SecondLogo from '@/components/icons/second'
import Star from '@/components/icons/star'

const JobPost = () => {
  return (
    <div className='bg-[#E0F2FE] w-full min-h-[100vh] flex items-center justify-center py-8 px-4'>
            <div className=''>
              <p className='text-primary text-center font-semibold text-2xl mb-3'>Popular jobs</p>
              <p className='text-center '>Take a look at most popular jobs from Jplus</p>
              <div className="grid grid-cols-1 gap-5 mt-6 md:gap-8 lg:gap-10 md:mt-10 lg:grid-cols-2 drop-shadow ">
              <div className='bg-white rounded-md text-xs 2xl:text-sm py-4  '>
                  <div className='flex flex-col gap-4 '>
                    <div className='flex px-4 items-center justify-between capitalize flex-wrap'>
                      <div className='flex items-center flex-wrap  gap-2'>
                        <FirstLogo/>
                        <p className='text-sm'>んのしょうときのり</p>
                        
                        <LocationIcon />
                        <p className='text-[#197CC0]'>Saitama</p>
                      </div>
                      <div>
                        <RightArr />
                      </div>
                    </div>
                    <div className='px-4'>
                      <p className='text-sm font-semibold text-wrap mt-2'>English Teacher for Preschoolers needed in Saitama</p>
                    </div>
                    <div className=' px-4 flex flex-wrap gap-2'>
                      <p className='px-2 inline-block py-1 bg-[#EFF8FF] rounded-full text-[#197CC0]'>On site</p>
                      <p className='px-2 py-1 inline-block rounded-full bg-[#EFF8FF] text-[#197CC0]'>Full time</p>
                    </div>
                    <div className='px-4'>
                      <p className='text-[#197CC0] text-2xl mb-2 font-semibold'>¥ 1,000~5,000<span className='text-sm text-[#197CC0] lowercase font-normal'>/ mo</span></p>
                    </div>
                    <div className='flex px-4 flex-wrap justify-between items-center'>
                      <p className='text-[#667085]'>Posted 3 mins ago</p>
                      <div className='flex items-center gap-2'>
                        <Lotting />
                        <p>Male</p>
                        <span className='inline-block w-[1px] bg-[#D0D5DD] h-[15px]'></span>
                        <p className='text-[#197CC0]'>Last apply date : 12.12.2012</p>
                      </div>
                    </div>
                    <div className='w-full h-[1px] bg-white border-[1px] border-[#D0D5DD] my-1 border-dashed' />
                    <div className="px-4">
                      <div className='flex items-center flex-wrap gap-3 justify-between'>
                        <div className="flex items-center gap-2 flex-wrap">
                          <Star />
                          <p className='text-[#344054]'>4.9</p>
                          <span className='inline-block w-[1px] bg-[#D0D5DD] h-[15px]' />
                          <EyeOutline />
                          <span className="inline-block text-[#667085]">5.3K</span>
                          <span className='inline-block w-[1px] bg-[#D0D5DD] h-[15px]' />
                          <ManyUser />
                          <span className="inline-block text-[#667085]">3.4K Applicants</span>
                        </div>
                        <div className="flex flex-wrap items-center gap-3">
                          <button className="p-3 flex items-center gap-3  border rounded-lg"><Saveicon /> <span>Save</span></button>
                          <button className="p-3 flex items-center gap-3 bg-[#197CC0] text-white rounded-lg"><JobIcon /> <span>Apply Job</span></button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              <div className='bg-white rounded-md text-xs 2xl:text-sm py-4  '>
                  <div className='flex flex-col gap-4 '>
                    <div className='flex px-4 items-center justify-between capitalize flex-wrap'>
                      <div className='flex items-center flex-wrap  gap-2'>
                        <SecondLogo />
                        <p className='text-sm'>Nintendo</p>
                      
                        <LocationIcon />
                        <p className='text-[#197CC0]'>Tokyo</p>
                      </div>
                      <div>
                        <RightArr />
                      </div>
                    </div>
                    <div className='px-4'>
                      <p className='text-sm font-semibold text-wrap mt-2'>Video Game Developer</p>
                    </div>
                    <div className=' px-4 flex gap-2'>
                      <p className='px-2 inline-block py-1 bg-[#EFF8FF] rounded-full text-[#197CC0]'>On site</p>
                      <p className='px-2 py-1 inline-block rounded-full bg-[#EFF8FF] text-[#197CC0]'>Full time</p>
                    </div>
                    <div className='px-4'>
                      <p className='text-[#197CC0] text-2xl mb-2 font-semibold'>¥ 70,000~300,000 <span className='text-sm text-[#197CC0] lowercase font-normal'>/ mo</span></p>
                    </div>
                    <div className='flex px-4 flex-wrap justify-between items-center'>
                      <p className='text-[#667085]'>Posted 3 mins ago</p>
                      <div className='flex items-center gap-2'>
                        <Lotting />
                        <p>Male</p>
                        <span className='inline-block w-[1px] bg-[#D0D5DD] h-[15px]'></span>
                        <p className='text-[#197CC0]'>Last apply date : 12.12.2012</p>
                      </div>
                    </div>
                    <div className='w-full h-[1px] bg-white border-[1px] border-[#D0D5DD] my-1 border-dashed' />
                    <div className="px-4">
                      <div className='flex items-center flex-wrap gap-3 justify-between'>
                        <div className="flex items-center gap-2 flex-wrap">
                          <Star />
                          <p className='text-[#344054]'>4.9</p>
                          <span className='inline-block w-[1px] bg-[#D0D5DD] h-[15px]' />
                          <EyeOutline />
                          <span className="inline-block text-[#667085]">5.3K</span>
                          <span className='inline-block w-[1px] bg-[#D0D5DD] h-[15px]' />
                          <ManyUser />
                          <span className="inline-block text-[#667085]">3.4K Applicants</span>
                        </div>
                        <div className="flex flex-wrap items-center mt-3 gap-3">
                          <button className="p-3 flex items-center gap-3  border rounded-lg"><Saveicon /> <span>Save</span></button>
                          <button className="p-3 flex items-center gap-3 bg-[#197CC0] text-white rounded-lg"><JobIcon /> <span>Apply Job</span></button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className='bg-white rounded-md text-xs 2xl:text-sm py-4  '>
                  <div className='flex flex-col gap-4 '>
                    <div className='flex px-4 items-center justify-between capitalize flex-wrap'>
                      <div className='flex items-center  gap-2'>
                        <SecondLogo />
                        <p className='text-sm'>Nintendo</p>
                        
                        <LocationIcon />
                        <p className='text-[#197CC0]'>Tokyo</p>
                      </div>
                      <div>
                        <RightArr />
                      </div>
                    </div>
                    <div className='px-4'>
                      <p className='text-sm font-semibold text-wrap mt-2'>Video Game Developer</p>
                    </div>
                    <div className=' px-4 flex gap-2'>
                      <p className='px-2 inline-block py-1 bg-[#EFF8FF] rounded-full text-[#197CC0]'>On site</p>
                      <p className='px-2 py-1 inline-block rounded-full bg-[#EFF8FF] text-[#197CC0]'>Full time</p>
                    </div>
                    <div className='px-4'>
                      <p className='text-[#197CC0] text-2xl mb-2 font-semibold'>¥ 70,000~300,000 <span className='text-sm text-[#197CC0] lowercase font-normal'>/ mo</span></p>
                    </div>
                    <div className='flex px-4 flex-wrap justify-between items-center'>
                      <p className='text-[#667085]'>Posted 3 mins ago</p>
                      <div className='flex items-center gap-2'>
                        <Lotting />
                        <p>Male</p>
                        <span className='inline-block w-[1px] bg-[#D0D5DD] h-[15px]'></span>
                        <p className='text-[#197CC0]'>Last apply date : 12.12.2012</p>
                      </div>
                    </div>
                    <div className='w-full h-[1px] bg-white border-[1px] border-[#D0D5DD] my-1 border-dashed' />
                    <div className="px-4">
                      <div className='flex items-center flex-wrap gap-3 justify-between'>
                        <div className="flex items-center gap-2 flex-wrap">
                          <Star />
                          <p className='text-[#344054]'>4.9</p>
                          <span className='inline-block w-[1px] bg-[#D0D5DD] h-[15px]' />
                          <EyeOutline />
                          <span className="inline-block text-[#667085]">5.3K</span>
                          <span className='inline-block w-[1px] bg-[#D0D5DD] h-[15px]' />
                          <ManyUser />
                          <span className="inline-block text-[#667085]">3.4K Applicants</span>
                        </div>
                        <div className="flex flex-wrap items-center gap-3">
                          <button className="p-3 flex items-center gap-3  border rounded-lg"><Saveicon /> <span>Save</span></button>
                          <button className="p-3 flex items-center gap-3 bg-[#197CC0] text-white rounded-lg"><JobIcon /> <span>Apply Job</span></button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                {/* <div className='bg-white rounded-md text-xs 2xl:text-sm py-4  '>
                  <div className='flex flex-col gap-4 '>
                    <div className='flex px-4 items-center justify-between capitalize flex-wrap'>
                      <div className='flex items-center  gap-2'>
                        <SecondLogo />
                        <p className='text-sm'>Nintendo</p>
                        
                        <LocationIcon />
                        <p className='text-[#197CC0]'>Tokyo</p>
                      </div>
                      <div>
                        <RightArr />
                      </div>
                    </div>
                    <div className='px-4'>
                      <p className='text-sm font-semibold text-wrap mt-2'>Video Game Developer</p>
                    </div>
                    <div className=' px-4 flex gap-2'>
                      <p className='px-2 inline-block py-1 bg-[#EFF8FF] rounded-full text-[#197CC0]'>On site</p>
                      <p className='px-2 py-1 inline-block rounded-full bg-[#EFF8FF] text-[#197CC0]'>Full time</p>
                    </div>
                    <div className='px-4'>
                      <p className='text-[#197CC0] text-2xl mb-2 font-semibold'>¥ 70,000~300,000 <span className='text-sm text-[#197CC0] lowercase font-normal'>/ mo</span></p>
                    </div>
                    <div className='flex px-4 flex-wrap justify-between items-center'>
                      <p className='text-[#667085]'>Posted 3 mins ago</p>
                      <div className='flex items-center gap-2'>
                        <Lotting />
                        <p>Male</p>
                        <span className='inline-block w-[1px] bg-[#D0D5DD] h-[15px]'></span>
                        <p className='text-[#197CC0]'>Last apply date : 12.12.2012</p>
                      </div>
                    </div>
                    <div className='w-full h-[1px] bg-white border-[1px] border-[#D0D5DD] my-1 border-dashed' />
                    <div className="px-4">
                      <div className='flex items-center flex-wrap gap-3 justify-between'>
                        <div className="flex items-center gap-2 flex-wrap">
                          <Star />
                          <p className='text-[#344054]'>4.9</p>
                          <span className='inline-block w-[1px] bg-[#D0D5DD] h-[15px]' />
                          <EyeOutline />
                          <span className="inline-block text-[#667085]">5.3K</span>
                          <span className='inline-block w-[1px] bg-[#D0D5DD] h-[15px]' />
                          <ManyUser />
                          <span className="inline-block text-[#667085]">3.4K Applicants</span>
                        </div>
                        <div className="flex items-center flex-wrap gap-3">
                          <button className="p-3 flex items-center gap-3  border rounded-lg"><Saveicon /> <span>Save</span></button>
                          <button className="p-3 flex items-center gap-3 bg-[#197CC0] text-white rounded-lg"><JobIcon /> <span>Apply Job</span></button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div> */}
              </div>
              {/* <div className='rounded-md flex items-center cursor-pointer mt-7 justify-center gap-3 text-sm font-semibold bg-white shadow w-[350px] mx-auto p-3'>
              <p className='text-[#197CC0]'>View All Jobs</p>
              <p>
              <Eye/>

              </p>
        </div> */}
            </div>
          </div>
  )
}

export default JobPost
