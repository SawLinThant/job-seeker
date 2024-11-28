'use cleint';
import React from 'react'
import SideBar from '../account-setup/sidebar/SideBar'
import Nav from '@/components/nav'
import { AnimatePresence, motion } from 'framer-motion'
import ProfileAccountSetUp from '../account-setup/ProfileAccountSetUp'
import SelfIntroVideo from '../account-setup/SelfIntroVideo'
import Education from '../account-setup/Education'
import WorkExperience from '../account-setup/WorkExperience'
import Skills from '../account-setup/Skills'
import ExpertCertification from '../account-setup/ExpertCertification'
import CVResume from '../account-setup/CvResume'
import AdditionalInformation from '../account-setup/AdditionalInformation'
import { parseAsInteger, useQueryState } from 'nuqs'
const Account = () => {
  const list = [
    <ProfileAccountSetUp key="1"/>,
    <SelfIntroVideo  key="2"/>,
    <Education  key="3"/>,
    <WorkExperience  key="4"/>,
    <Skills  key="5"/>,
    <ExpertCertification  key="6"/>,
    <CVResume  key="7"/>,
    <AdditionalInformation  key="8"/>
  ];
  const variants = {
    hidden: { opacity: 0, y: 200 }, // Initial state: hidden (above and transparent)
    visible: { opacity: 1, y: 0 }, // Visible state: no vertical offset, fully opaque
    exit: { opacity: 0, y: -200 }, // Exit state: slides down and fades out
  };
  
  const [visable, setVisable] = useQueryState('page', parseAsInteger.withDefault(0));

  return (
    <div>
      <Nav />
      <div className=' mt-10 mx-auto  sm:max-w-[1150px] xl:container'>
        <p className='text-xl font-semibold'>My Profile</p>
        <div className='flex '>
          <SideBar />
          <div className='grow'>
            <AnimatePresence mode="wait">
              <motion.div
                key={visable} // Unique key to trigger re-mounting and animation
                initial="hidden"
                animate="visible"
                exit="exit"
                variants={variants}
                transition={{ duration: 0.5 }}
               
              >
                {list[visable || 0]}
              </motion.div>
            </AnimatePresence> 
            
          </div>
        </div>
      </div>
    </div>
  )
}

export default Account
