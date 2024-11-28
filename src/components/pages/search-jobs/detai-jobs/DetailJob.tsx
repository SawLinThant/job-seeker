'use client'
import Nav from '@/components/nav'
import PrimaryButton from '@/components/ui/button/PrimaryButton'
import SecondaryButton from '@/components/ui/button/SecondaryButton'
import { getJobDetails, useGetJobDetailsId, useGetJobPopularList, useMutateJobApply, useMutateSavedUnSaveJob } from '@/services/jobService'
import Image from 'next/image'
import Link from 'next/link'
import { useParams, useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import ApplyJobModal from './ApplyJobModal'
import RatingAndReview from './RatingAndReview'
import PopularJobList from './PopularJobLists'
import FooterBar from '@/components/footer/FooterBar'
import JobDetailResponsive from './JobDetailResponsive'
import decode from 'html-entities-decoder';
import { useTranslation } from 'react-i18next'
import { SEVERITY, useSnackbar } from '@/components/ui/snackbar/SnackbarContext'
import BackIcon from '@/components/icons/back'
import JobIcon from '@/components/icons/job'
import { EditIcon, SaveIcon } from 'lucide-react'
import Saveicon from '@/components/icons/Saveicon'
import SecondLogo from '@/components/icons/second'
import LocationIcon from '@/components/icons/location'
import Eye from '@/components/icons/eye'
import ManyUser from '@/components/icons/Manyuser'
import EyeOutline from '@/components/icons/eye-outline'
import TimingIcon from '@/components/icons/timing'
import AirPlane from '@/components/icons/airplane'
import Education from '../../account-setup/Education'
import EditorIcon from '@/components/icons/editIcon'


const JobLists = [
  {
    id: 1,
    title: "English teacher for Preschoolers needed in Saitama",
    companyLogo: "/images/CompanyLogo1.png",
    company: "のしょうときのり",
    location: "Saitama",
    applicants: "30",

    salary: {
      start: "5,000",
      end: "15,000",
    },
    date: "2 days ago",
    workEnvironment: "On Site",
    jobType: "part time",
    lastApplyDate: "0.1.2024",
    description:
      "We are seeking a passionate and dedicated English Teacher to join our dynamic team of educators. The ideal candidate will have a strong background in English literature, grammar, and language arts. The English Teacher will be responsible for creating an engaging and positive learning environment, fostering intellectual and social development in students. The successful candidate should possess excellent communication skills, a deep understanding of the English language, and the ability to inspire and motivate students.",
    requirements: [
      "Plan, prepare, and deliver high-quality English lessons that cater to the diverse needs of students.",
      "Create and implement effective and engaging lesson plans in line with the curriculum guidelines.",
      "Provide constructive feedback to students and communicate effectively with parents regarding their child's academic performance.",
      "Encourage a love for literature by introducing students to a variety of literary genres and authors.",
      "Develop and implement creative teaching strategies to make learning English enjoyable and meaningful.",
      "Stay updated on educational best practices, teaching methodologies, and curriculum changes.",
      "Collaborate with colleagues to enhance the overall educational experience and contribute to a positive school culture.",
    ],
    timeSlot: [
      {
        id: 1,
        date: "1. Dec. 2024",
        time: "1:00 AM",
      },
      {
        id: 2,
        date: "1. Dec. 2024",
        time: "12:30 AM",
      },
      {
        id: 3,
        date: "3. Dec. 2024",
        time: "1:00 AM",
      },
    ],
    rating: 3,
  },
  {
    id: 2,
    title: "Public School ALT Position – Now Accepting Overseas Applicants",
    companyLogo: "/images/CompanyLogo2.png",
    company: "ふじもと たろうきざえもんのしょうときのり",
    location: "Shin Juku",
    applicants: "30",
    views: "30",
    salary: {
      start: "5,000",
      end: "15,000",
    },
    date: "2 days ago",
    workEnvironment: "On Site",
    jobType: "full time",
    lastApplyDate: "Today",
    description:
      "We are seeking a passionate and dedicated English Teacher to join our dynamic team of educators. The ideal candidate will have a strong background in English literature, grammar, and language arts. The English Teacher will be responsible for creating an engaging and positive learning environment, fostering intellectual and social development in students. The successful candidate should possess excellent communication skills, a deep understanding of the English language, and the ability to inspire and motivate students.",
    requirements: [
      "Plan, prepare, and deliver high-quality English lessons that cater to the diverse needs of students.",
      "Create and implement effective and engaging lesson plans in line with the curriculum guidelines.",
      "Provide constructive feedback to students and communicate effectively with parents regarding their child's academic performance.",
      "Encourage a love for literature by introducing students to a variety of literary genres and authors.",
      "Develop and implement creative teaching strategies to make learning English enjoyable and meaningful.",
      "Stay updated on educational best practices, teaching methodologies, and curriculum changes.",
      "Collaborate with colleagues to enhance the overall educational experience and contribute to a positive school culture.",
    ],
    timeSlot: null,
    rating: 1,
  },
  {
    id: 3,
    title: "Okayama City ALT: Immediate Opportunity!",
    companyLogo: "/images/CompanyLogo3.png",
    company: "んのしょうときのり",
    location: "Saitama",
    applicants: "30",
    views: "30",
    salary: {
      start: "5,000",
      end: "15,000",
    },
    date: "2 days ago",
    workEnvironment: "On Site",
    jobType: "part time",
    lastApplyDate: "20.1.2024",
    description:
      "We are seeking a passionate and dedicated English Teacher to join our dynamic team of educators. The ideal candidate will have a strong background in English literature, grammar, and language arts. The English Teacher will be responsible for creating an engaging and positive learning environment, fostering intellectual and social development in students. The successful candidate should possess excellent communication skills, a deep understanding of the English language, and the ability to inspire and motivate students.",
    requirements: [
      "Plan, prepare, and deliver high-quality English lessons that cater to the diverse needs of students.",
      "Create and implement effective and engaging lesson plans in line with the curriculum guidelines.",
      "Provide constructive feedback to students and communicate effectively with parents regarding their child's academic performance.",
      "Encourage a love for literature by introducing students to a variety of literary genres and authors.",
      "Develop and implement creative teaching strategies to make learning English enjoyable and meaningful.",
      "Stay updated on educational best practices, teaching methodologies, and curriculum changes.",
      "Collaborate with colleagues to enhance the overall educational experience and contribute to a positive school culture.",
    ],
    timeSlot: null,
    rating: 0,
  },
  {
    id: 4,
    title: "(Entry Level) Nurse in Nishigo, Fukushima Hospital ",
    companyLogo: "/images/CompanyLogo4.png",
    company: "んのしょうときのり",
    location: "Shin Juku",
    applicants: "30",
    views: "30",
    salary: {
      start: "1,000",
      end: "5,000",
    },
    date: "2 days ago",
    workEnvironment: "On Site",
    jobType: "part time",
    lastApplyDate: "Today",
    description:
      "We are seeking a passionate and dedicated English Teacher to join our dynamic team of educators. The ideal candidate will have a strong background in English literature, grammar, and language arts. The English Teacher will be responsible for creating an engaging and positive learning environment, fostering intellectual and social development in students. The successful candidate should possess excellent communication skills, a deep understanding of the English language, and the ability to inspire and motivate students.",
    requirements: [
      "Plan, prepare, and deliver high-quality English lessons that cater to the diverse needs of students.",
      "Create and implement effective and engaging lesson plans in line with the curriculum guidelines.",
      "Provide constructive feedback to students and communicate effectively with parents regarding their child's academic performance.",
      "Encourage a love for literature by introducing students to a variety of literary genres and authors.",
      "Develop and implement creative teaching strategies to make learning English enjoyable and meaningful.",
      "Stay updated on educational best practices, teaching methodologies, and curriculum changes.",
      "Collaborate with colleagues to enhance the overall educational experience and contribute to a positive school culture.",
    ],
    timeSlot: null,
    rating: 4.5,
  },
];
const DetailJob = () => {

  const { t } = useTranslation()
  const { trigger: saveUnSaveTrigger, isMutating: saveUnSaveIsMutating } = useMutateSavedUnSaveJob()
  const { trigger: jobApplyTrigger, isMutating } = useMutateJobApply();

  const { showMessage } = useSnackbar();

  const router = useRouter()
  const { i18n } = useTranslation();
  let currentLocale = i18n.language;
  const { id } = useParams<any>()




  // const currentJob = JobLists.find((job) => job.id.toString() === id);
  //   const { permission } = useAuth();
  const [isJobApplied, setIsJobApplied] = useState(false);
  // const [currentJob, setCurrentJob] = useState<any |null>(null);

  const { data: currentJob, mutate: currentJobMutate } = useGetJobDetailsId(id)

  const handleSave = async () => {
    if (currentJob?.data?.is_saved) {
      await saveUnSaveTrigger({
        id: currentJob?.data?.id,
        status: false
      }, {
        onSuccess: (res) => {
          showMessage({
            message: res?.data?.data?.message,
            severity: SEVERITY.SUCCESS,
          });
          currentJobMutate()
        },
        onError: (error) => {
          showMessage({
            message: error.response.data.message,
            severity: SEVERITY.ERROR,
          });
        }
      })
    } else {
      await saveUnSaveTrigger({
        id: currentJob?.data?.id,
        status: true
      }, {
        onSuccess: (res) => {
          showMessage({
            message: res?.data?.data?.message,
            severity: SEVERITY.SUCCESS,
          });
          currentJobMutate()
        },
        onError: (error) => {
          showMessage({
            message: error.response.data.message,
            severity: SEVERITY.ERROR,
          });
        }
      })
    }
  }

  const handleApply = async () => {
    if (currentJob?.data?.id) {
      await jobApplyTrigger({
        id: currentJob?.data?.id
      }, {
        onSuccess: (res) => {
          showMessage({
            message: res?.data?.data?.message,
            severity: SEVERITY.SUCCESS,
          });
          currentJobMutate()
        },
        onError: (error) => {
          showMessage({
            message: error.response.data.message,
            severity: SEVERITY.ERROR,
          });
        }
      })

    } else {
      router.push(`/${currentLocale}/login`)

    }
  };

  // const getJobDetailFn = async () => {
  //   const res = await getJobDetails(id);
  //   res && setCurrentJob(res?.data?.data);
  // };

  // useEffect(() => {
  //   getJobDetailFn();
  // // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, []);
  const { data: popularJob, mutate } = useGetJobPopularList()


  return (<div>
  
  </div>
  )
}

export default DetailJob

