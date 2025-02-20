'use client';
import Nav from '@/components/nav';
import Image from 'next/image';
import Link from 'next/link';
import React, { useEffect, useRef, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import SideBar from './sidebar/SideBar';
import { useGetCountries, useGetRegion, useGetTownship } from '@/services/jobService';
import RSelect from '@/components/ui/text-field/RSelect';
import RTextField from '@/components/ui/text-field/RTextField';
import RTextArea from '@/components/ui/text-field/RTextArea';
import ErrorMessage from '@/components/ui/text-field/ErrorMessage';
import {
  useGetAccountSetUpProcess,
  useGetPersonInformation,
  useGetStudentPersonalEducation,
  useMutateProfileUpload,
  useMutationPersonalInformation,
} from '@/services/authService';
import { SEVERITY, useSnackbar } from '@/components/ui/snackbar/SnackbarContext';
import Loading from '@/components/ui/loading/Loading';
import { cn } from '@/utils/cn';
import { FaRegEdit } from 'react-icons/fa';
import { FiHome, FiPhone } from 'react-icons/fi';
import { CiLocationOn } from 'react-icons/ci';
import { BsGenderAmbiguous, BsGenderFemale, BsGenderMale } from 'react-icons/bs';
import { MdOutlineLocationOn } from 'react-icons/md';
import LoadingDialog from '@/components/ui/dialog/LoadingDialog';
import { useAtom } from 'jotai';
import { showSidebarAtom } from '@/components/atoms/atoms';
import MobileBackHeader from './MobileBackHeader';
import RDateTextField from '@/components/ui/text-field/RDateTextField';
import dayjs, { Dayjs } from 'dayjs';
import moment from 'moment';
import PrimaryButton from '@/components/ui/button/PrimaryButton';
import PrimaryEdit from '@/components/icons/primaryEdit';
import CheckIcon from '@/components/icons/checkIcon';
import AskIcon from '@/components/icons/AskIcon';
import { CircularProgress } from '@nextui-org/progress';
import { useQueryState } from 'nuqs';
import Goback from '@/components/icons/Goback';
import { useRouter } from 'next/navigation';
import { useTranslation } from 'react-i18next';

const ProfileAccountSetUp = () => {
  const { i18n } = useTranslation();
  let currentLocale = i18n.language;

  const router = useRouter();
  const { trigger: profileUploadTrigger } = useMutateProfileUpload();
  const { data: educations, isLoading: isLoadingEducation } = useGetStudentPersonalEducation();

  const [profile, setProfile] = useState<any | null>(null);
  const [profileFile, setProfileFile] = useState<any | null>(null);
  const fileInputRef = useRef<any | null>(null);
  const [isEdit, setIsEdit] = useState(false);
  const [showSideBar, setShowSideBar] = useAtom(showSidebarAtom);
  const [isEditPage, setIsEditPage] = useQueryState('isEdit', { defaultValue: '' });

  const { data: setUpProcessPercent, mutate: setUpProcessPercentMutate } =
    useGetAccountSetUpProcess();
  const {
    data: personInformation,
    isLoading: personInformationLoading,
    mutate,
  } = useGetPersonInformation();

  const { showMessage } = useSnackbar();

  const [isLoading, setIsLoading] = React.useState(false);

  const methods = useForm<any>({
    values: {
      username: personInformation?.data?.name || '',
      gender: personInformation?.data?.gender || '',
      email: personInformation?.data?.email || '',
      phone: personInformation?.data?.phone || '',
      country: personInformation?.data?.address?.country?.id || '',
      address: personInformation?.data?.address?.address || '',
      region: personInformation?.data?.address?.region_id?.id || '',
      education: personInformation?.data?.education_level || '',
      city: personInformation?.data?.address?.township?.id || '',
      birthday: personInformation?.data?.birth_date
        ? dayjs(personInformation.data.birth_date, 'MMM ddd YYYY')
        : null,
    },
  });

  const { trigger: personalInformationTrigger, isMutating } = useMutationPersonalInformation();

  const { data: countryList, isLoading: loadingCountry } = useGetCountries();
  const { data: regionList, isLoading: loadingRegion } = useGetRegion();
  const { data: townshipList, isLoading: loadingTownship } = useGetTownship();

  useEffect(() => {
    if (personInformation?.data?.image) {
      setProfile(personInformation?.data?.image);
    }
  }, [personInformation?.data?.image]);

  // useEffect(() => {
  //   if (logInUserInfo) {
  //     setValue("username", logInUserInfo.name);
  //     setValue("phone", logInUserInfo.phone);
  //     setValue("email", logInUserInfo.email);
  //     setValue("birthdate", logInUserInfo.birthdate);
  //     setValue("gender", logInUserInfo.gender);
  //     setValue("address", logInUserInfo.address);
  //     setValue("country", logInUserInfo.country);
  //   }
  // }, [logInUserInfo, setValue]);

  const today = new Date().toISOString().split('T')[0];

  const onSubmit = async (data: any) => {
    setIsLoading(true);
    await personalInformationTrigger(
      {
        name: data?.username,
        birth_date: data?.birthday,
        phone: data?.phone,
        email: data?.email,
        gender: data?.gender,
        address: data?.address,
        current_country_id: data?.country,
        township_id: data?.city,
        region_id: data?.region,
        education_level: data?.education,
      },
      {
        onSuccess: (res) => {
          mutate();
          setUpProcessPercentMutate();
          methods.reset();
          showMessage({
            message: res?.data?.data?.message,
            severity: SEVERITY.SUCCESS,
          });
          setIsLoading(false);

          router.push(`/${currentLocale}/account-setup/personal-information`);
        },
        onError: (error) => {
          setIsLoading(false);

          showMessage({
            message: error.response.data.message,
            severity: SEVERITY.ERROR,
          });
          setUpProcessPercentMutate();
        },
      }
    );
    // await personalInformation({
    //   name: data.username,
    //   email: data.email,
    //   phone: data.phone,
    //   gender: data.gender,
    //   birth_date: data.birthdate,
    //   address: data.address,
    //   country: data.country,
    // });
  };

  const valueCountry = methods.watch('country') as any;
  const valueRegion = methods.watch('region') as any;

  const optionCountryA = countryList?.data?.map((_: any) => ({
    label: _?.name_en,
    value: _?.id,
  }));

  const optionRegionA = regionList?.data
    ?.filter((g: any) => g?.country_id === valueCountry)
    ?.map((_: any) => ({
      label: _?.name_en,
      value: _?.id,
    }));
  const optionTownshipA = townshipList?.data
    ?.filter((g: any) => g?.region_id === valueRegion)
    ?.map((_: any) => ({
      label: _?.name_en,
      value: _?.id,
    }));
  const handleProfileUpload = () => {
    const file = fileInputRef?.current ? fileInputRef?.current.files[0] : null;

    // if (file && file.type.startsWith('image/')) {
    //     setProfile(file)
    // } else {
    //     alert('Invalid file type. Please upload an image')
    // }
  };

  return (
    <div>
      <div className="hidden md:block">
        <Nav />
      </div>
      <MobileBackHeader title="Personal Information" />
      <div className="w-full flex mt-6 gap-x-10">
        <SideBar />

        <div className="w-full">
          {!isEditPage ? (
            <div className="flex justify-between items-center">
              <p className="text-left text-xl font-semibold ">Personal Information</p>
              <PrimaryButton onClick={() => setIsEditPage('true')} className="py-2 px-3 text-sm">
                <PrimaryEdit /> <span className="ml-2 font-semibold">Edit</span>
              </PrimaryButton>
            </div>
          ) : (
            <div
              onClick={() => setIsEditPage(null)}
              className="flex cursor-pointer items-center gap-3"
            >
              <span>
                <Goback />
              </span>{' '}
              <span>Go back</span>
            </div>
          )}
          {!isEditPage ? (
            <div className="mt-5 grid gap-10 grid-cols-4 ">
              <div className="flex flex-col gap-2 items-center justify-center">
                {personInformation?.data?.image ? (
                  <Image
                    src={personInformation?.data?.image}
                    alt={personInformation?.data?.image}
                    width={180}
                    height={180}
                    className="rounded-full"
                  />
                ) : (
                  <div className="w-[180px] h-[180px] rounded-full bg-[#D9D9D9]"></div>
                )}
                <div className="w-[1px] border border-dashed border-gray-400 h-[60px]" />
                <div>
                  <CircularProgress
                    classNames={{
                      svg: 'w-28 h-28 drop-shadow-md',
                      indicator: 'bg-black',
                      track: 'bg-gray',
                      value: 'text-xl font-semibold text-[#667085]',
                    }}
                    value={setUpProcessPercent?.data?.setup_process_percent}
                    strokeWidth={3}
                    showValueLabel={true}
                  />
                </div>
              </div>
              <div className="text-sm col-span-3">
                <p className="mb-3 text-lg font-semibold">{personInformation?.data?.name}</p>
                <div className="flex items-center mb-3 gap-2">
                  {personInformation?.data?.email && personInformation?.data?.email !== '' ? (
                    <CheckIcon />
                  ) : (
                    <AskIcon />
                  )}
                  <p
                    className={cn(
                      'text-red-500',
                      personInformation?.data?.email &&
                        personInformation?.data?.email !== '' &&
                        'text-primary'
                    )}
                  >
                    {personInformation?.data?.email && personInformation?.data?.email !== ''
                      ? personInformation?.data?.email
                      : 'No  Email added yet!'}
                  </p>
                </div>
                <div className="flex items-center mb-3 gap-2">
                  {personInformation?.data?.phone && personInformation?.data?.phone !== '' ? (
                    <CheckIcon />
                  ) : (
                    <AskIcon />
                  )}
                  <p
                    className={cn(
                      'text-red-500',
                      personInformation?.data?.phone &&
                        personInformation?.data?.phone !== '' &&
                        'text-primary'
                    )}
                  >
                    {personInformation?.data?.phone && personInformation?.data?.phone !== ''
                      ? personInformation?.data?.phone
                      : 'No phone number added yet!'}
                  </p>
                </div>
                <div className="flex items-center mb-3 gap-2">
                  {personInformation?.data?.education_level &&
                  personInformation?.data?.education_level !== '' ? (
                    <CheckIcon />
                  ) : (
                    <AskIcon />
                  )}
                  <p
                    className={cn(
                      'text-red-500',
                      personInformation?.data?.education_level &&
                        personInformation?.data?.education_level !== '' &&
                        'text-primary'
                    )}
                  >
                    {personInformation?.data?.education_level &&
                    personInformation?.data?.education_level !== ''
                      ? personInformation?.data?.education_level
                      : 'No Education added yet!'}
                  </p>
                </div>
                <div className="flex items-center mb-3 gap-2">
                  {personInformation?.data?.birth_date &&
                  personInformation?.data?.birth_date !== '' ? (
                    <CheckIcon />
                  ) : (
                    <AskIcon />
                  )}
                  <p
                    className={cn(
                      'text-red-500',
                      personInformation?.data?.birth_date &&
                        personInformation?.data?.birth_date !== '' &&
                        'text-primary'
                    )}
                  >
                    {personInformation?.data?.birth_date &&
                    personInformation?.data?.birth_date !== ''
                      ? personInformation?.data?.birth_date
                      : 'No Birth Date  added yet!'}
                  </p>
                </div>
                <div className="flex items-center mb-3 gap-2">
                  {personInformation?.data?.gender && personInformation?.data?.gender !== '' ? (
                    <CheckIcon />
                  ) : (
                    <AskIcon />
                  )}
                  <p
                    className={cn(
                      'text-red-500',
                      personInformation?.data?.gender &&
                        personInformation?.data?.gender !== '' &&
                        'text-primary'
                    )}
                  >
                    {personInformation?.data?.gender && personInformation?.data?.gender !== ''
                      ? personInformation?.data?.gender
                      : 'No Gender added yet!'}
                  </p>
                </div>
                <div className="flex items-center mb-3 gap-2">
                  {personInformation?.data?.address?.country?.name_en &&
                  personInformation?.data?.address?.country?.name_en !== '' ? (
                    <CheckIcon />
                  ) : (
                    <AskIcon />
                  )}
                  <p
                    className={cn(
                      'text-red-500',
                      personInformation?.data?.address?.country?.name_en &&
                        personInformation?.data?.address?.country?.name_en !== '' &&
                        'text-primary'
                    )}
                  >
                    {personInformation?.data?.address?.country?.name_en &&
                    personInformation?.data?.address?.country?.name_en !== ''
                      ? personInformation?.data?.address?.country?.name_en
                      : 'No Country added yet!'}
                  </p>
                </div>
                <div className="flex items-center mb-3 gap-2">
                  {personInformation?.data?.address?.address &&
                  personInformation?.data?.address?.address !== '' ? (
                    <CheckIcon />
                  ) : (
                    <AskIcon />
                  )}
                  <p
                    className={cn(
                      'text-red-500',
                      personInformation?.data?.address?.address &&
                        personInformation?.data?.address?.address !== '' &&
                        'text-primary'
                    )}
                  >
                    {personInformation?.data?.address?.address &&
                    personInformation?.data?.address?.address !== ''
                      ? personInformation?.data?.address?.address
                      : 'No Address added yet!'}
                  </p>
                </div>
                {/* <div className="flex items-center mb-3 gap-2">
                              <AskIcon />  <p className='text-red-500'>No phone number added yet!</p>
                            </div>
                            <div className="flex items-center mb-3 gap-2">
                              <AskIcon />  <p className='text-red-500'>Birth date not set yet!</p>
                            </div>
                            <div className="flex items-center mb-3 gap-2">
                              <AskIcon />  <p className='text-red-500'>Education level not set yet!</p>
                            </div>
                            <div className='flex items-center mb-3 gap-2'>
                              <AskIcon />
                              <p className='text-red-500 '>Gender not set yet!</p>
                            </div>
                            <div className='flex items-center mb-3 gap-2'>
                              <AskIcon />
                              <p className='text-red-500'>Country not set yet!</p>
                            </div>
                            <div className='flex items-center mb-3 gap-2'>
                              <AskIcon />
                              <p className='text-red-500'>Address not set yet!</p>
                            </div> */}
                <div className="pl-5">
                  <div className="mt-10 -ml-4">
                    <p>Your profile setup progess</p>
                    <p>Just some steps left away to complete your professional profile.</p>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <>
              <div className="flex items-start gap-x-5 mt-10">
                <div className="">
                  <Image
                    src={profile ? profile : '/images/defaultProfile.webp'}
                    alt="/images/defaultProfile.webp"
                    width={100}
                    height={100}
                    className="rounded-full mx-auto"
                  />
                  <input
                    type="file"
                    ref={fileInputRef}
                    accept="image/*"
                    style={{ display: 'none' }}
                    onChange={(e) => {
                      if (e?.target?.files?.[0]) {
                        setProfile(URL.createObjectURL(e.target.files[0]));
                        setProfileFile(e.target.files[0]);
                      }
                    }}
                  />

                  {profile && (
                    <button
                      className="border mt-5 rounded-md bg-red-500 text-white text-xs whitespace-nowrap w-full px-3 py-1"
                      onClick={() => {
                        setProfile(null);
                        setProfileFile(null);
                      }}
                    >
                      Clear
                    </button>
                  )}

                  <button
                    className="border mt-5 rounded-md text-primary text-xs whitespace-nowrap px-3 py-1 w-full"
                    onClick={async () => {
                      if (profileFile) {
                        const formData = new FormData();
                        formData.append('profile', profileFile ?? '');
                        await profileUploadTrigger(
                          {
                            data: formData,
                          },
                          {
                            onSuccess: (res) => {
                              router.push(`/${currentLocale}/account-setup/personal-information`);

                              showMessage({
                                message: 'Uploaded Profile Successfully',
                                severity: SEVERITY.SUCCESS,
                              });
                              mutate();
                            },
                            onError: (error) => {
                              showMessage({
                                message: error.response.data.message,
                                severity: SEVERITY.ERROR,
                              });
                            },
                          }
                        );
                      } else {
                        fileInputRef.current.click();
                      }
                    }}
                  >
                    {profile ? 'Upload Photo' : 'Pick Photo'}
                  </button>
                </div>

                <FormProvider {...methods}>
                  <form
                    onSubmit={methods.handleSubmit(onSubmit)}
                    className=" min-h-screen px-6 py-2 rounded-xl lg:min-h-full lg:w-full"
                  >
                    <div className="w-full">
                      <div className="flex flex-col gap-5  lg:flex-row">
                        <RTextField
                          maxLength={30}
                          type="text"
                          label="Username"
                          placeholder="Enter Username"
                          name="username"
                          required="Username is required."
                          isStar
                        />
                      </div>
                      <div className="flex flex-col gap-5 pt-5 lg:flex-row">
                        <RTextField
                          type="number"
                          label="Phone"
                          placeholder="Enter Phone"
                          name="phone"
                          required="Phone is required."
                          isStar
                        />
                      </div>
                      <div className="flex flex-col gap-5 pt-8 lg:flex-row">
                        <div className="w-full">
                          <RTextField
                            type="text"
                            label="Email"
                            placeholder="Enter Email"
                            name="email"
                            required="Email is required."
                            isStar
                          />
                        </div>
                        <div className="w-full">
                          <RDateTextField
                            width
                            name="birthday"
                            label="Birthday"
                            validateMessage="Birthday is required."
                            isStar
                            maxDate={dayjs(new Date())}
                          />
                        </div>
                      </div>
                      <div className="w-full mt-5">
                        <RSelect
                          isStar
                          name="education"
                          label={'Education Level'}
                          placeholder=""
                          array={[
                            {
                              label: 'Under Graduate',
                              value: 'Under Graduate',
                            },
                            {
                              label: 'Post Graduate',
                              value: 'Post Graduate',
                            },
                            {
                              label: 'Degree',
                              value: 'Degree',
                            },
                          ]}
                          selectedText="Choose your eduction level"
                          required="Education is required."
                          className="col-span-2"
                        />
                        {/* <RSelect
                              width
                              name="education"
                              label="Education Level"
                              validateMessage="Education Level is required."
                              isStar
                            /> */}
                      </div>
                      <div className="pt-5">
                        <div>
                          <p className="block mb-2 text-sm text-[#344054]">
                            Select Gender
                            <span className="text-red-600">*</span>
                          </p>
                          <div className="flex gap-4">
                            <div className="flex items-center gap-2">
                              <input
                                autoComplete="off"
                                id="male"
                                type="radio"
                                className=" focus:ring-0"
                                value="male"
                                {...methods.register('gender', {
                                  required: 'Gender is required',
                                })}
                              />
                              <label htmlFor="male" className="text-[#344054] text-sm">
                                Male
                              </label>
                            </div>
                            <div className="flex items-center gap-2">
                              <input
                                autoComplete="off"
                                id="female"
                                value="female"
                                type="radio"
                                className=" focus:ring-0"
                                {...methods.register('gender', {
                                  required: 'Gender is required',
                                })}
                              />
                              <label htmlFor="female" className="text-[#344054] text-sm">
                                Female
                              </label>
                            </div>
                            <div className="flex items-center gap-2">
                              <input
                                autoComplete="off"
                                id="others"
                                value="others"
                                type="radio"
                                className=" focus:ring-0"
                                {...methods.register('gender', {
                                  required: 'Gender is required',
                                })}
                              />
                              <label htmlFor="others" className="text-[#344054] text-sm">
                                Others
                              </label>
                            </div>
                          </div>
                          {methods.formState.errors?.gender && (
                            <ErrorMessage
                              text={methods.formState.errors?.gender?.message as string}
                            />
                          )}
                        </div>

                        <div className="pt-5">
                          {optionCountryA && (
                            <RSelect
                              isStar
                              name="country"
                              label={'Current Country'}
                              placeholder=""
                              array={optionCountryA}
                              selectedText="Choose your country"
                              required="Country is required."
                              className="col-span-2"
                            />
                          )}
                        </div>
                        <div className="pt-8">
                          {optionRegionA && (
                            <RSelect
                              isStar
                              disabled={valueCountry === ''}
                              name="region"
                              label={'Region'}
                              placeholder=""
                              array={optionRegionA}
                              selectedText="Choose your region"
                              required="Region is required."
                            />
                          )}
                        </div>
                        <div className="pt-8">
                          {optionTownshipA && (
                            <RSelect
                              isStar
                              name="city"
                              disabled={valueCountry === '' || valueRegion === ''}
                              label={'Township'}
                              placeholder=""
                              array={optionTownshipA}
                              selectedText="Choose your township"
                              required="Township is required."
                            />
                          )}
                        </div>
                        <RTextArea
                          isStar
                          className="col-span-2 mt-5"
                          label="Address"
                          placeholder="Enter Address"
                          name="address"
                          required="Address is required."
                        />
                      </div>
                      <div className="flex gap-8 pt-8">
                        <button
                          type="button"
                          className="border flex justify-center w-full  border-[#EAECF0] p-[10px] rounded-lg text-[#344054] leading-6 font-semibold text-base"
                          onClick={() => {
                            if (isEdit) {
                              setIsEdit(false);
                            } else {
                              methods.reset();
                            }
                          }}
                        >
                          {isEdit ? 'Cancel' : 'Reset'}
                        </button>

                        <button
                          disabled={isMutating || isLoading}
                          type="submit"
                          className={cn(
                            'bg-[#197CC0] flex justify-center w-full  p-[10px] rounded-lg text-white leading-6 font-semibold text-base',

                            (isMutating || isLoading) && 'pointer-event-none opacity-50'
                          )}
                        >
                          {isMutating || isLoading ? <Loading /> : isEdit ? 'Edit' : 'Save'}
                        </button>
                      </div>
                    </div>
                  </form>
                </FormProvider>
              </div>
            </>
          )}
        </div>

        {/* <div className="w-full lg:pt-5">
          {
            // personInformationLoading?  <LoadingDialog isLoading={personInformationLoading} />
            //  :
            <>
              {personInformation?.data?.birth_date  ? (
                <div>
                  <div className="w-[90%] md:w-[50%] mx-auto bg-white px-4 py-2 rounded-md ">
                    <p className="pb-3 border-b border-gray_600 mb-5 ">Personal Information</p>

                    <div className="flex w-full justify-between items-start">
                      <div>
                        <p className="text-primary text-md">{personInformation?.data?.name}</p>
                        <p className="text-sm text-gray-900">{personInformation?.data?.email}</p>
                      </div>
                      <FaRegEdit
                        className="text-primary text-[18px] cursor-pointer"
                        onClick={() => {
                          setIsEdit(true);
                        }}
                      />
                    </div>

                    <div className="mt-5">
                      {personInformation?.data?.phone && (
                        <div className="flex gap-x-2 mb-2">
                          <FiPhone className="text-primary text-[15px]" />
                          <p className="text-xs">{personInformation?.data?.phone}</p>
                        </div>
                      )}

                      <div className="flex gap-x-2 mb-2">
                        <FiHome className="text-primary text-[15px]" />
                        <p className="text-xs">{personInformation?.data?.address?.address}</p>
                      </div>

                      <div className="flex gap-x-2 mb-2">
                        <MdOutlineLocationOn className="text-primary text-[15px]" />
                        <p className="text-xs">{`${personInformation?.data?.address?.country?.name_en},${personInformation?.data?.address?.region_id?.name_en},${personInformation?.data?.address?.township?.name_en}`}</p>
                      </div>
                      <div className="flex gap-x-2 mb-2">
                        {personInformation?.data?.gender === 'male' ? (
                          <BsGenderMale className="text-primary text-[15px]" />
                        ) : personInformation?.data?.gender === 'female' ? (
                          <BsGenderFemale className="text-primary text-[15px]" />
                        ) : (
                          <BsGenderAmbiguous className="text-primary text-[15px]" />
                        )}
                        <p className="text-xs capitalize">{personInformation?.data?.gender}</p>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <FormProvider {...methods}>
                  <form
                    onSubmit={methods.handleSubmit(onSubmit)}
                    className=" min-h-screen px-6 py-2 rounded-xl lg:min-h-full lg:w-full"
                  >
                  {
                    !isEditPage ? (
                      <div className='flex justify-between items-center'>
                      <p className="text-left text-xl font-semibold ">Personal Information</p>
                      <PrimaryButton onClick={() => setIsEditPage('true')} className="py-2 px-3 text-sm">
                        <PrimaryEdit />  <span className='ml-2 font-semibold'>Edit</span>
                      </PrimaryButton>
                    </div>
                    ) : (
                      <div onClick={()=>setIsEditPage(null)} className="flex cursor-pointer items-center gap-3"><span><Goback/></span> <span>Go back</span></div>
                    )
                  }
                    {
                      !isEditPage ? (
                        <div className='mt-5 grid gap-10 grid-cols-4 '>
                          <div className="flex flex-col gap-2 items-center justify-center">
                            <div className='w-[180px] h-[180px] rounded-full bg-[#D9D9D9]'></div>
                            <div className="w-[1px] border border-dashed border-gray-400 h-[60px]" />
                            <div>
                              <CircularProgress
                                classNames={{
                                  svg: "w-28 h-28 drop-shadow-md",
                                  indicator: "bg-black",
                                  track: "bg-gray",
                                  value: "text-xl font-semibold text-[#667085]",
                                }}
                                value={25}
                                strokeWidth={3}
                                showValueLabel={true}
                              />
                            </div>
                          </div>
                          <div className='text-sm col-span-3'>
                            <p className='mb-3 text-lg font-semibold'>Michael Jackson</p>
                            <div className="flex items-center mb-3 gap-2">
                              <CheckIcon />  <p>michaeljson2389@gmail.com</p>
                            </div>
                            <div className="flex items-center mb-3 gap-2">
                              <AskIcon />  <p className='text-red-500'>No phone number added yet!</p>
                            </div>
                            <div className="flex items-center mb-3 gap-2">
                              <AskIcon />  <p className='text-red-500'>Birth date not set yet!</p>
                            </div>
                            <div className="flex items-center mb-3 gap-2">
                              <AskIcon />  <p className='text-red-500'>Education level not set yet!</p>
                            </div>
                            <div className='flex items-center mb-3 gap-2'>
                              <AskIcon />
                              <p className='text-red-500 '>Gender not set yet!</p>
                            </div>
                            <div className='flex items-center mb-3 gap-2'>
                              <AskIcon />
                              <p className='text-red-500'>Country not set yet!</p>
                            </div>
                            <div className='flex items-center mb-3 gap-2'>
                              <AskIcon />
                              <p className='text-red-500'>Address not set yet!</p>
                            </div>
                            <div className='pl-5'>

                              <div className='mt-10 -ml-4'>
                                <p>Your profile setup progess</p>
                                <p>Just some steps left away to complete your professional profile.</p>
                              </div>
                            </div>
                          </div>
                        </div>
                      ) : (<>
                        <div className="flex flex-col gap-5 pt-5 lg:flex-row">
                          <RTextField
                            maxLength={30}
                            type="text"
                            label="Username"
                            placeholder="Enter Username"
                            name="username"
                            required="Username is required."
                            isStar
                          />
                        </div>
                        <div className="flex flex-col gap-5 pt-5 lg:flex-row">

                          <RTextField
                            type="number"
                            label="Phone"
                            placeholder="Enter Phone"
                            name="phone"
                            required="Phone is required."
                            isStar
                          />
                        </div>
                        <div className="flex flex-col gap-5 pt-8 lg:flex-row">
                          <div className="w-full">
                            <RTextField
                              type="text"
                              label="Email"
                              placeholder="Enter Email"
                              name="email"
                              required="Email is required."
                              isStar
                            />
                          </div>
                          <div className="w-full">
                            <RDateTextField
                              width
                              name="birthday"
                              label="Birthday"
                              validateMessage="Birthday is required."
                              isStar
                              maxDate={dayjs(new Date())}
                            />
                          </div>
                          
                        </div>
                        <div className="w-full mt-5">
                            <RDateTextField
                              width
                              name="education"
                              label="Education Level"
                              validateMessage="Education Level is required."
                              isStar
                              maxDate={dayjs(new Date())}
                            />
                          </div>
                        <div className="pt-5">
                          <div>
                            <p className="block mb-2 text-sm text-[#344054]">
                              Select Gender
                              <span className="text-red-600">*</span>
                            </p>
                            <div className="flex gap-4">
                              <div className="flex items-center gap-2">
                                <input
                                  autoComplete="off"
                                  id="male"
                                  type="radio"
                                  className=" focus:ring-0"
                                  value="male"
                                  {...methods.register('gender', {
                                    required: 'Gender is required',
                                  })}
                                />
                                <label htmlFor="male" className="text-[#344054] text-sm">
                                  Male
                                </label>
                              </div>
                              <div className="flex items-center gap-2">
                                <input
                                  autoComplete="off"
                                  id="female"
                                  value="female"
                                  type="radio"
                                  className=" focus:ring-0"
                                  {...methods.register('gender', {
                                    required: 'Gender is required',
                                  })}
                                />
                                <label htmlFor="female" className="text-[#344054] text-sm">
                                  Female
                                </label>
                              </div>
                              <div className="flex items-center gap-2">
                                <input
                                  autoComplete="off"
                                  id="others"
                                  value="others"
                                  type="radio"
                                  className=" focus:ring-0"
                                  {...methods.register('gender', {
                                    required: 'Gender is required',
                                  })}
                                />
                                <label htmlFor="others" className="text-[#344054] text-sm">
                                  Others
                                </label>
                              </div>
                            </div>
                            {methods.formState.errors?.gender && (
                              <ErrorMessage
                                text={methods.formState.errors?.gender?.message as string}
                              />
                            )}
                          </div>

                          <div className="pt-5">
                            {optionCountryA && (
                              <RSelect
                                isStar
                                name="country"
                                label={'Current Country (Region)'}
                                placeholder=""
                                array={optionCountryA}
                                selectedText="Choose your country"
                                required="Country is required."
                                className="col-span-2"
                              />
                            )}
                          </div>
                          <div className="pt-8">
                            {optionRegionA && (
                              <RSelect
                                isStar
                                disabled={valueCountry === ''}
                                name="region"
                                label={'Region'}
                                placeholder=""
                                array={optionRegionA}
                                selectedText="Choose your region"
                                required="Region is required."
                              />
                            )}
                          </div>
                          <div className="pt-8">
                            {optionTownshipA && (
                              <RSelect
                                isStar
                                name="city"
                                disabled={valueCountry === '' || valueRegion === ''}
                                label={'Township'}
                                placeholder=""
                                array={optionTownshipA}
                                selectedText="Choose your township"
                                required="Township is required."
                              />
                            )}
                          </div>
                          <RTextArea
                            isStar
                            className="col-span-2 mt-5"
                            label="Address"
                            placeholder="Enter Address"
                            name="address"
                            required="Address is required."
                          />
                        </div>
                        <div className="flex gap-8 pt-8">
                          <button
                            type="button"
                            className="border flex justify-center w-full  border-[#EAECF0] p-[10px] rounded-lg text-[#344054] leading-6 font-semibold text-base"
                            onClick={() => {
                              if (isEdit) {
                                setIsEdit(false);
                              } else {
                                methods.reset();
                              }
                            }}
                          >
                            {isEdit ? 'Cancel' : 'Reset'}
                          </button>

                          <button
                            disabled={isMutating || isLoading}
                            type="submit"
                            className={cn(
                              'bg-[#197CC0] flex justify-center w-full  p-[10px] rounded-lg text-white leading-6 font-semibold text-base',

                              (isMutating || isLoading) && 'pointer-event-none opacity-50'
                            )}
                          >
                            {isMutating || isLoading ? <Loading /> : isEdit ? 'Edit' : 'Save'}
                          </button>
                        </div>
                      </>)
                    }

                  </form>
                </FormProvider>
              )}
            </>
          }
        </div> */}
      </div>
    </div>
  );
};

export default ProfileAccountSetUp;
