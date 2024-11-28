'use client'
import Image from 'next/image'
import { useState, useEffect } from 'react'
import ReplyComment from './ReplyComment'
import SecondaryButton from '@/components/ui/button/SecondaryButton'
import Modal from '@/components/ui/modal'
import PrimaryButton from '@/components/ui/button/PrimaryButton'
import StarRating from '@/components/home/jobs/StarRating'


const RatingAndReview = () => {


    const [isReviewSubmitted, setIsReviewSubmitted] = useState(false)

    useEffect(() => {
        let timeout:any

        if (isReviewSubmitted) {
            timeout = setTimeout(() => {
                setIsReviewSubmitted(false)
            }, 2000)
        }

        return () => {
            clearTimeout(timeout)
        }
    }, [isReviewSubmitted])
    const generateRandomId = () => {
        const characters =
            'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
        let randomId = ''
        for (let i = 0; i < 8; i++) {
            randomId += characters.charAt(
                Math.floor(Math.random() * characters.length),
            )
        }
        return randomId
    }
    const [myReview, setMyReview] = useState('')
    const [allReviews] = useState([
        {
            id: generateRandomId(),
            username: 'Aliah Lane',
            img: '/images/jobdetails/Avatar1.png',
            date: 'jan 12,2024',
            description:
                'I am writing to express my deep satisfaction and appreciation for the opportunity to serve as the English Teacher at [Preschool Name], a position I discovered through [Job Website]. Having been a part of this dynamic preschool community, I am pleased to share my experiences and successes during my time in this role',
            likes: 4,
            replies: [
                {
                    id: generateRandomId(),
                    username: 'Hera',
                    img: '/images/jobdetails/Avatar3.png',
                    date: 'jan 12,2024',
                    description:
                        'I am writing to express my deep satisfaction and appreciation for the opportunity to serve as the English Teacher at [Preschool Name], a position I discovered through [Job Website]. Having been a part of this dynamic preschool community, I am pleased to share my experiences and successes during my time in this role',
                },
            ],
        },
        {
            id: generateRandomId(),
            username: 'Nala Goins',
            img: '/images/jobdetails/Avatar2.png',
            date: 'feb 13,2024',
            description:
                'I am writing to express my deep satisfaction and appreciation for the opportunity to serve as the English Teacher at [Preschool Name], a position I discovered through [Job Website]. Having been a part of this dynamic preschool community, I am pleased to share my experiences and successes during my time in this role',
            likes: 4,
            replies: [
                {
                    id: generateRandomId(),
                    username: 'Hera',
                    img: '/images/jobdetails/Avatar3.png',
                    date: 'jan 12,2024',
                    description:
                        'I am writing to express my deep satisfaction and appreciation for the opportunity to serve as the English Teacher at [Preschool Name], a position I discovered through [Job Website]. Having been a part of this dynamic preschool community, I am pleased to share my experiences and successes during my time in this role',
                },
            ],
        },
        {
            id: generateRandomId(),
            username: 'Nala Goins',
            img: '/images/jobdetails/Avatar2.png',
            date: 'feb 13,2024',
            description:
                'I am writing to express my deep satisfaction and appreciation for the opportunity to serve as the English Teacher at [Preschool Name], a position I discovered through [Job Website]. Having been a part of this dynamic preschool community, I am pleased to share my experiences and successes during my time in this role',
            likes: 4,
            replies: [],
        },
        {
            id: generateRandomId(),
            username: 'Nala Goins',
            img: '/images/jobdetails/Avatar2.png',
            date: 'feb 13,2024',
            description:
                'I am writing to express my deep satisfaction and appreciation for the opportunity to serve as the English Teacher at [Preschool Name], a position I discovered through [Job Website]. Having been a part of this dynamic preschool community, I am pleased to share my experiences and successes during my time in this role',
            likes: 2,
            replies: [],
        },
        {
            id: generateRandomId(),
            username: 'Nala Goins',
            img: '/images/jobdetails/Avatar2.png',
            date: 'feb 13,2024',
            description:
                'I am writing to express my deep satisfaction and appreciation for the opportunity to serve as the English Teacher at [Preschool Name], a position I discovered through [Job Website]. Having been a part of this dynamic preschool community, I am pleased to share my experiences and successes during my time in this role',
            likes: 6,
            replies: [],
        },
    ])
    const [reviewsToShow, setReviewsToShow] = useState(allReviews.slice(0, 2))
    const [activeCommentId, setActiveCommentId] = useState<any|null>(null)
    const [likedComments, setLikedComments] = useState<any>([])

    const handleLoadMoreComments = () => {
        const currentReviewsLength = reviewsToShow.length
        setReviewsToShow(allReviews.slice(0, currentReviewsLength + 1))
    }

    const handleViewAllReviews = () => {
        setReviewsToShow(allReviews)
    }

    const handleReviewSubmit = (e:any) => {
        e.preventDefault()
        setIsReviewSubmitted(true)
        setMyReview('')
    }

    const handleSubmit=()=>{

    }

    return (
        <>
            <div className="container py-10">
                <div className="p-10 rounded-md shadow-md shadow-gray-300">
                    {reviewsToShow.map((review, index) => (
                        <div
                            key={index}
                            className={`${
                                index == reviewsToShow.length - 1
                                    ? ''
                                    : 'border-b pb-8 mb-12'
                            }`}>
                            {/* comment */}
                            <div className="mb-6">
                                <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                                    <div className="flex items-center gap-2 mb-2 md:mb-6">
                                        <Image alt="ggg"
                                        width={18}
                                        height={18}
                                            src={review.img}
                                            className="w-12 h-12"
                                        />{' '}
                                        <h5 className="text-base font-semibold text-[#344054]">
                                            {review.username}
                                        </h5>
                                    </div>
                                    <p className="text-[#1D2939] text-xs md:text-base lg:text-lg md:font-medium mb-4">
                                        Reviewed: {review.date}
                                    </p>
                                </div>
                                <p className="text-[#1D2939] text-sm md:text-base lg:text-lg max-md:font-medium mb-4 lg:pr-60">
                                    {review.description}
                                </p>
                                <div className="flex items-center justify-between max-md:hidden">
                                    <div className="flex items-center gap-3">
                                        <div
                                            onClick={() => {
                                                if (
                                                    likedComments.some(
                                                        (comment:any) =>
                                                            comment.id ===
                                                            review.id,
                                                    )
                                                ) {
                                                    setLikedComments(
                                                        likedComments.filter(
                                                            (comment:any) =>
                                                                comment.id !==
                                                                review.id,
                                                        ),
                                                    )
                                                } else {
                                                    setLikedComments([
                                                        ...likedComments,
                                                        review,
                                                    ])
                                                }
                                            }}
                                            className="flex items-center gap-2 font-medium cursor-pointer">
                                            <Image
                                            alt="eyew"
                                            width={20}
                                            height={20}
                                                src={`${
                                                    likedComments.some(
                                                        (comment:any) =>
                                                            comment.id ==
                                                            review.id,
                                                    )
                                                        ? '/icons/thumbs-up-blue.svg'
                                                        : '/icons/thumbs-up.svg'
                                                }`}
                                            />
                                            <span
                                                className={`${
                                                    likedComments.some(
                                                        (comment:any) =>
                                                            comment.id ==
                                                            review.id,
                                                    )
                                                        ? 'text-[#197CC0]'
                                                        : 'text-[#667085]'
                                                }`}>
                                                Like
                                            </span>
                                        </div>
                                        <hr className="border border-[#98A2B3] rotate-90 w-4" />
                                        <p
                                            className={`${
                                                activeCommentId == review.id
                                                    ? 'text-[#197CC0]'
                                                    : 'text-[#667085]'
                                            } font-medium cursor-pointer`}
                                            onClick={() =>
                                                setActiveCommentId(review.id)
                                            }>
                                            Reply
                                        </p>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <div className="flex items-center gap-2">
                                            <Image alt="gsdg" width={20} height={20} src="/icons/thumbs-up-blue.svg" />
                                            {review.likes}
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <Image alt="yrey" width={20} height={20} src="/icons/messageBlue.svg" />
                                            {review.replies.length}
                                        </div>
                                    </div>
                                </div>

                                {activeCommentId == review.id && (
                                    <div className="lg:pr-60">
                                        <ReplyComment />
                                    </div>
                                )}
                            </div>
                            {/* comment end */}

                            {/* replies */}
                            {review?.replies?.map((reply, index) => (
                                <div
                                    className="lg:pr-60 max-md:hidden"
                                    key={index}>
                                    <div className="flex gap-4">
                                        <Image
                                        width={20}
                                        height={20}
                                        alt="tt"
                                            src={reply.img}
                                            className="w-12 h-12"
                                        />
                                        <div>
                                            <h5 className="text-base font-semibold text-[#344054] mb-4">
                                                {reply.username}
                                            </h5>
                                            <p className="text-[#1D2939] text-base lg:text-lg mb-4">
                                                {reply.description}
                                            </p>

                                            <div className="flex items-center gap-3">
                                                <div
                                                    onClick={() => {
                                                        if (
                                                            likedComments.some(
                                                                (comment:any) =>
                                                                    comment.id ==
                                                                    reply.id,
                                                            )
                                                        ) {
                                                            setLikedComments(
                                                                likedComments.filter(
                                                                    (comment:any) =>
                                                                        comment.id !==
                                                                        reply.id,
                                                                ),
                                                            )
                                                        } else {
                                                            setLikedComments([
                                                                ...likedComments,
                                                                reply,
                                                            ])
                                                        }
                                                    }}
                                                    className="flex items-center gap-2 font-medium cursor-pointer">
                                                    <Image alt="ugds"
                                                    width={20} height={20}
                                                        src={`${
                                                            likedComments.some(
                                                                (comment:any) =>
                                                                    comment.id ==
                                                                    reply.id,
                                                            )
                                                                ? '/icons/thumbs-up-blue.svg'
                                                                : '/icons/thumbs-up.svg'
                                                        }`}
                                                    />
                                                    <span
                                                        className={`${
                                                            likedComments.some(
                                                                (comment:any) =>
                                                                    comment.id ==
                                                                    reply.id,
                                                            )
                                                                ? 'text-[#197CC0]'
                                                                : 'text-[#667085]'
                                                        }`}>
                                                        Like
                                                    </span>
                                                </div>
                                                <hr className="border border-[#98A2B3] rotate-90 w-4" />
                                                <p
                                                    className={`${
                                                        activeCommentId ==
                                                        reply.id
                                                            ? 'text-[#197CC0]'
                                                            : 'text-[#667085]'
                                                    } font-medium cursor-pointer`}
                                                    onClick={() =>
                                                        setActiveCommentId(
                                                            reply.id,
                                                        )
                                                    }>
                                                    Reply
                                                </p>
                                            </div>

                                            {activeCommentId == reply.id && (
                                                <ReplyComment />
                                            )}
                                        </div>
                                    </div>
                                </div>
                            ))}

                            {/* replies end */}
                        </div>
                    ))}

                    <div
                        className={`${
                            reviewsToShow.length === allReviews.length
                                ? 'hidden'
                                : ''
                        } text-sm text-[#197CC0] font-medium mt-4 cursor-pointer`}
                        onClick={handleLoadMoreComments}>
                        Load more comments
                    </div>
                </div>
                {reviewsToShow.length !== allReviews.length && (
                    <p
                        onClick={handleViewAllReviews}
                        className="text-center text-[#197CC0] text-md font-semibold my-5 cursor-pointer">
                        {' '}
                        View {allReviews.length - reviewsToShow.length}+ reviews
                    </p>
                )}
            </div>

            <div className="container my-10">
                <div className="px-4 py-6 rounded-md shadow-md md:p-10 shadow-gray-300">
                    <div className="flex flex-col gap-4 mb-5 md:flex-row md:justify-between">
                        <div>
                            <h1 className="text-[#1D2939] text-lg md:text-xl lg:text-2xl font-medium mb-2">
                                Select stars to rate
                            </h1>
                            <div className="ml-4">
                                <StarRating className={`w-8`} />
                            </div>
                        </div>
                        <div>
                            <p className="text-[#344054] text-xs mb-2">
                                Current rating
                            </p>
                            <div className="flex items-center gap-4 ml-4">
                                <p className="text-[#197CC0] text-lg font-semibold">
                                    4.3/5
                                </p>
                                <StarRating
                                    className="w-6"
                                    rating={4}
                                    disabled={true}
                                />
                                <p className="text-base text-[#475467] font-medium">
                                    20 ratings
                                </p>
                            </div>
                        </div>
                    </div>
                    <form onSubmit={handleReviewSubmit}>
                        <label className="text-[#344054] text-sm font-medium">
                            Glad to hear it! Have any comments to share?
                        </label>
                        <textarea
                            value={myReview}
                            onChange={e => setMyReview(e.target.value)}
                            className="w-full rounded-md border border-gray-300 h-[154px] resize-none focus:border-gray-300 focus:ring-0 my-2"
                            placeholder="leave your review here..."
                        />
                        <div className="flex w-full gap-3 md:justify-end">
                            <SecondaryButton
                                type="button"
                                onClick={() => setMyReview('')}
                                className={`text-[#344054] border border-[#D0D5DD] font-semibold px-4 py-2 lg:px-10 lg:py-2.5 max-md:w-full gap-2`}>
                                Cancel
                            </SecondaryButton>

                            <PrimaryButton
                            onClick={handleSubmit}
                                disabled={myReview == ''}
                                className={`bg-[#197CC0] text-white text-sm font-semibold px-4 py-2 lg:px-10 lg:py-2.5 max-md:w-full`}>
                                Submit
                            </PrimaryButton>
                        </div>
                    </form>
                </div>
            </div>

            {isReviewSubmitted && (
                <Modal className="md:max-w-[550px]">
                    <div className="p-6 md:p-10">
                        <Image alt="check" width={20} height={20} src="/icons/check-icon.svg" className="my-8" />
                        <h1 className="font-semibold text-lg text-[#101828] mb-2">
                            Thanks for your review!
                        </h1>
                        <p className="text-sm text-[#475467]">
                            Your comment will be public within 24 hours.
                        </p>
                    </div>
                </Modal>
            )}
        </>
    )
}

export default RatingAndReview
