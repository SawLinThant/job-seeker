import AirPlane from '@/components/icons/airplane'
import Book from '@/components/icons/book'
import Calendar from '@/components/icons/calendar'
import ChecksIcon from '@/components/icons/checks'
import EditorIcon from '@/components/icons/editIcon'
import Education from '@/components/icons/education'
import Joblevel from '@/components/icons/job-level'
import OutlineStar from '@/components/icons/outline-star'
import TimingIcon from '@/components/icons/timing'
import { JobDetailTypeI } from '@/types/jobDetail'
import React from 'react'
import decode from 'html-entities-decoder';

const JobCategory:React.FC<{props:JobDetailTypeI}> = ({props}) => {
  return (
    <React.Fragment>
         <div className="mt-5 flex text-base items-center m font-semibold">
            <p className="font-semibold text-[#475467]">Job Category :</p>
            <span className="inline-block text-primary p-2">IT Jobs</span>
          </div>
          <div className="mt-4">
            <div className="grid grid-cols-1  md:grid-cols-2">
              <div className=" border-t-2 rounded-tl-md rounded-tr-md md:rounded-tr-none border-r-2 md:border-r-0 border-b border-l-2 md:border-l md:border-t md:border-b w-full md:rounded-l-md  border-gray-200">
                <table className="w-full broder rounded-md">
                  <tbody>
                    <tr className="h-[120px]">
                      <td className="border-b  ">
                        <div className="px-3">
                          <p className="mb-2">
                            <EditorIcon />
                          </p>
                          <p className="mb-2">Open to</p>
                          <p className="text-primary mb-1 capitalize">{props.data.gender}</p>
                        </div>
                      </td>
                      <td className="border-b border-l-2">
                        <div className="px-3">
                          <p className="mb-2">
                            <TimingIcon />
                          </p>
                          <p className="mb-2">Job type</p>
                          <p className="text-primary mb-1">{props.data.jobType}</p>
                        </div>
                      </td>
                      
                    </tr>
                    <tr className="h-[140px]">
                      <td className="">
                        <div className="px-3">
                          <p className="mb-2">
                            {' '}
                            <AirPlane />{' '}
                          </p>
                          <p className="mb-2">Visa type</p>
                          <p className="text-primary mb-1">{props.data.visa_type}</p>
                        </div>
                      </td>
                      <td className="border-l-2">
                        <div className="px-3">
                          <p className="mb-2">
                            <Education />
                          </p>
                          <p className="mb-2">Education level</p>
                          <p className="text-primary">{props.data.japanese_level}</p>
                        </div>
                      </td>
                     
                    </tr>
                  </tbody>
                </table>
              </div>
              <div className=" border-b-2 border-r-2 rounded-br-md md:border-r md:border-t md:border-b w-full md:rounded-r-md    border-gray-200">
                <table className="w-full broder rounded-md">
                  <tbody>
                    <tr className="h-[120px]">
                      
                      <td className="border-b min-w-[162px] border-l-2">
                        <div className="px-3">
                          <p className="mb-2">
                            <Joblevel />
                          </p>
                          <p className="mb-2">Job level</p>
                          <p className="text-primary mb-1">{props.data.job_level}</p>
                        </div>
                      </td>
                      <td className="border-b min-w-[162px] border-l-2">
                        <div className="px-3">
                          <p className="mb-2">
                            <OutlineStar />
                          </p>
                          <p className="mb-2">Year of experience</p>
                          <p className="text-primary mb-1">{props.data.year_of_experience}</p>
                        </div>
                      </td>
                    </tr>
                    <tr className="h-[140px]">
                      <td className="border-l-2">
                        <div className="px-3">
                          <p className="mb-2">
                            <Book />
                          </p>
                          <p className="mb-2">Japanese level</p>
                          <p className="text-primary">≥ {props.data.japanese_level}</p>
                        </div>
                      </td>
                      <td className="border-l-2">
                        <div className="px-3">
                          <p className="mb-2">
                            <Calendar />
                          </p>
                          <p className="mb-2">Last apply date</p>
                          <p className="text-red-600">{props.data.lastApplyDate}</p>
                        </div>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              {/* <table>
          <tbody>
            <tr>
              <td></td>
              <td></td>
            </tr>
            <tr>
              <td></td>
              <td></td>
            </tr>
          </tbody>
        </table> */}
            </div>
          </div>
          <div className="my-1">
            <p className="text-xl font-semibold mb-3 ">Job description</p>
               <div
                    className="py-2  text-gray_700"
                    dangerouslySetInnerHTML={{
                      __html: props.data.job_description
                        ? decode(props.data.job_description)
                        : decode(''),
                    }}
                  />
          </div>
          <div className="my-1">
            <p className="text-xl font-semibold mb-3 ">Job Requirement</p>
               <div
                    className="py-2  text-gray_700"
                    dangerouslySetInnerHTML={{
                      __html: props.data.job_requirement
                        ? decode(props.data.job_requirement)
                        : decode(''),
                    }}
                  />
          </div>
          {/* <div className="my-3">
            <p className="text-xl font-semibold mb-5 ">Job requirments</p>
            <div>
              <div className="flex items-center gap-2 mb-2">
                <ChecksIcon />{' '}
                <p>
                  Plan, prepare, and deliver high-quality English lessons that cater to the diverse
                  needs of students.
                </p>
              </div>
              <div className="flex items-center gap-2 mb-2">
                <ChecksIcon />{' '}
                <p>
                  Create and implement effective and engaging lesson plans in line with the
                  curriculum guidelines.
                </p>
              </div>
              <div className="flex items-center gap-2 mb-2">
                <ChecksIcon />{' '}
                <p>
                 {`Provide constructive feedback to students and communicate effectively with parents
                  regarding their child's academic performance.`}
                </p>
              </div>
              <div className="flex items-center gap-2 mb-2">
                <ChecksIcon />{' '}
                <p>
                  Encourage a love for literature by introducing students to a variety of literary
                  genres and authors.
                </p>
              </div>
              <div className="flex items-center gap-2 mb-2">
                <ChecksIcon />{' '}
                <p>
                  Develop and implement creative teaching strategies to make learning English
                  enjoyable and meaningful.
                </p>
              </div>
              <div className="flex items-center gap-2 mb-2">
                <ChecksIcon />{' '}
                <p>
                  Stay updated on educational best practices, teaching methodologies, and curriculum
                  changes
                </p>
              </div>
              <div className="flex items-center gap-2 mb-2">
                <ChecksIcon />{' '}
                <p>
                  Collaborate with colleagues to enhance the overall educational experience and
                  contribute to a positive school culture.
                </p>
              </div>
            </div>
          </div> */}
    </React.Fragment>
  )
}

export default JobCategory
