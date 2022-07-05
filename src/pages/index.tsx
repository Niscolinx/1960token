import React, { useEffect, useState } from 'react'
import { useTheme } from 'next-themes'
import Link from 'next/link'
import dbConnect from '../lib/dbConnect'
import { GiWallet, GiTeamDowngrade } from 'react-icons/gi'
import { RiCustomerService2Line } from 'react-icons/ri'
import { FaQuestionCircle } from 'react-icons/fa'
import Logo from '../../public/logo.svg'
import Image from 'next/image'
import { BsPersonPlusFill, BsCheck } from 'react-icons/bs'
import { FaDollarSign, FaPeopleArrows } from 'react-icons/fa'
import { FiAirplay } from 'react-icons/fi'
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import { Autoplay, Pagination } from 'swiper'
import { AnimationOnScroll } from 'react-animation-on-scroll'

const Index = () => {
    const { theme } = useTheme()
    const [neuToUse, setNeuToUse] = useState<{}>()
    const [stepsNeu, setStepsNeu] = useState<{}>()

    useEffect(() => {
        if (theme === 'dark') {
            setNeuToUse({
                background: `linear-gradient(145deg, #1c1c30, #171729)`,
                boxShadow: `7px 7px 14px #161625,
                 -7px -7px 14px #1e1e35`,
                borderRadius: '50px',
            })

            setStepsNeu({})
        } else {
            setNeuToUse({
                background: `linear-gradient(145deg, #dadadf, #b8b8bb)`,
                boxShadow: `7px 7px 14px #a5a5a8,
             -7px -7px 14px #f3f3f8`,
                borderRadius: '50px',
                color: '#1a1a2d',
            })

            setStepsNeu({
                background: `linear-gradient(145deg, #dadadf, #b8b8bb)`,
                boxShadow: `7px 7px 14px #a5a5a8,
             -7px -7px 14px #f3f3f8`,
                borderRadius: '50px',
                color: '#1a1a2d',
            })
        }
    }, [theme])
    return (
        <>
            <div className='grid gap-5 max-w-5xl mx-auto text-gray-400 px-4'>
                <Swiper
                    spaceBetween={30}
                    centeredSlides={true}
                    loop={true}
                    autoplay={{
                        delay: 5000,
                        disableOnInteraction: false,
                    }}
                    pagination={{
                        clickable: true,
                    }}
                    modules={[Autoplay, Pagination]}
                    className='mySwiper'
                >
                    <SwiperSlide>
                        <div className='w-full md:w-2/3 rounded-4xl overflow-hidden relative'>
                            {/* file sizes are too big, check for optimization <Carousel1/> */}
                            <Image
                                src='/slider1.png'
                                alt=''
                                width='1920px'
                                height='1080px'
                            />
                            <div className='grid absolute right-[30%] top-[28%] md:(top-[35%] text-3xl) px-3 gap-4'>
                                <p className='font-semibold text-white animateTop'>
                                    <span className='text-orange-300 font-bold'>
                                        Superior
                                    </span>{' '}
                                    Digital currency you can mine on your phone
                                </p>
                                <Link href='/api/auth/signin'>
                                    <button className='bg-orange-300 text-[#1a1a2d] rounded px-2 py-1 justify-self-center text-sm animateBottom md:text-lg'>
                                        Get Started
                                    </button>
                                </Link>
                            </div>
                        </div>
                    </SwiperSlide>
                    <SwiperSlide>
                        <div className='w-full md:w-2/3 rounded-4xl overflow-hidden relative'>
                            <Image
                                src='/slider2.png'
                                alt=''
                                width='1920px'
                                height='1080px'
                            />
                            <div className='grid absolute left-0 top-0 bottom-0 right-0 px-3 gap-4'>
                                <div className='grid place-content-center gap-2'>
                                    <p className='font-semibold text-[#1a1a2d] text-2xl md:text-4xl'>
                                        Invite Your Friends
                                    </p>
                                    <Link href='/api/auth/signin'>
                                        <button className='bg-orange-300 text-[#1a1a2d] rounded px-2 py-1 justify-self-center text-sm md:text-lg'>
                                            Get Started
                                        </button>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </SwiperSlide>
                    <SwiperSlide>
                        <div className='w-full md:w-2/3 rounded-4xl overflow-hidden relative'>
                            <Image
                                src='/slider3.png'
                                alt=''
                                width='1920px'
                                height='1080px'
                            />
                            <div className='grid absolute left-0 top-0 bottom-0 right-0 px-3 gap-4'>
                                <div className='grid place-content-center gap-2'>
                                    <p className='font-semibold text-white md:text-4xl'>
                                        Start mining and affiliate with us
                                    </p>
                                    <Link href='/api/auth/signin'>
                                        <button className='bg-orange-300 text-[#1a1a2d] rounded px-2 py-1 justify-self-center text-sm '>
                                            Get Started
                                        </button>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </SwiperSlide>
                </Swiper>

                <div className='grid text-gray-400 border-b border-t border-gray-800 py-3 '>
                    <div className='grid mt-4 grid-cols-tc gap-5'>
                        <Link href='/aboutUs'>
                            <div className='grid justify-center place-items-center cursor-pointer'>
                                <Logo className='text-blue-400 text-3xl light:text-[#1a1a2d] w-12 h-12' />
                                <button
                                    className='text-md p-1'
                                    style={neuToUse}
                                >
                                    About Us
                                </button>
                            </div>
                        </Link>
                        <Link href='/'>
                            <div className='grid justify-center place-items-center cursor-pointer'>
                                <GiWallet className='text-blue-400 text-3xl light:text-[#1a1a2d]' />
                                <button
                                    className='text-md p-1'
                                    style={neuToUse}
                                >
                                    Vendors
                                </button>
                            </div>
                        </Link>

                        <Link href='/'>
                            <div className='grid justify-center place-items-center cursor-pointer'>
                                <FaQuestionCircle className='text-blue-400 text-3xl light:text-[#1a1a2d]' />
                                <button
                                    className='text-md p-1'
                                    style={neuToUse}
                                >
                                    FAQ
                                </button>
                            </div>
                        </Link>
                        <Link href='/customerService'>
                            <div className='grid justify-center place-items-center cursor-pointer'>
                                <RiCustomerService2Line className='text-blue-400 text-3xl light:text-[#1a1a2d]' />
                                <button
                                    className='text-md p-1'
                                    style={neuToUse}
                                >
                                    Customer Service
                                </button>
                            </div>
                        </Link>
                    </div>
                </div>

                <div className='grid justify-center gap-5 my-10 md:grid-cols-[repeat(auto-fit,minmax(20rem,100px))]'>
                    <AnimationOnScroll
                        animateIn='animate__fadeInLeft'
                        animateOnce={true}
                    >
                        <div
                            className='grid items-center bg-[#ccccd0] text-black py-2 px-4 rounded-lg w-full grid-cols-[min-content,1fr] '
                            style={stepsNeu}
                        >
                            <div className='flex'>
                                <BsPersonPlusFill className='flex mr-8 text-6xl' />
                            </div>
                            <div className='grid text-lg'>
                                <p className=' font-semibold '>
                                    Register Today
                                </p>
                                <p className='py-2 text-2xl font-extrabold'>
                                    $5
                                </p>
                            </div>
                        </div>
                    </AnimationOnScroll>
                    <AnimationOnScroll
                        animateIn='animate__fadeInRight'
                        animateOnce={true}
                    >
                        <div
                            className='grid items-center bg-[#ccccd0] text-black py-2 px-4 rounded-lg grid-cols-[min-content,1fr]'
                            style={stepsNeu}
                        >
                            <div className='flex'>
                                <BsCheck className='flex mr-8 text-6xl' />
                            </div>
                            <div className='grid text-lg'>
                                <p className=' font-semibold '>
                                    Registration Bonus
                                </p>
                                <p className='py-2 text-2xl font-extrabold'>
                                    $2
                                </p>
                            </div>
                        </div>
                    </AnimationOnScroll>
                    <AnimationOnScroll
                        animateIn='animate__fadeInLeft'
                        animateOnce={true}
                    >
                        <div
                            className='grid items-center bg-[#ccccd0] text-black py-2 px-4 rounded-lg grid-cols-[min-content,1fr] '
                            style={stepsNeu}
                        >
                            <div className='flex'>
                                <FaDollarSign className='flex mr-8 text-6xl' />
                            </div>
                            <div className='grid text-lg'>
                                <p className=' font-semibold '>
                                    Referral Commission
                                </p>
                                <p className='py-2 text-2xl font-bold'>$3</p>
                            </div>
                        </div>
                    </AnimationOnScroll>
                </div>

                <div className='grid mt-10'>
                    <AnimationOnScroll animateIn='animate__pulse'>
                        <div className='grid' style={neuToUse}>
                            <h3 className='text-center font-semibold text-2xl grad p-2 uppercase px-4'>
                                How 1960token works
                            </h3>
                            <p className='text-center'>
                                You are guaranteed to earn massively as an
                                active member of 1960TOKEN in various ways;
                            </p>
                        </div>
                    </AnimationOnScroll>

                    <div className='grid mt-10 gap-10 md:grid-cols-[repeat(auto-fit,minmax(15%,1fr))]'>
                        <div className='grid grid-cols-[max-content,1fr] md:(flex flex-col items-center grid-cols-none) gap-5'>
                            <AnimationOnScroll animateIn='animate__slideInLeft'>
                                <FaPeopleArrows className='text-blue-400 light:text-[#1a1a2d] text-6xl' />
                            </AnimationOnScroll>
                            <div className='grid md:justify-items-center'>
                                <AnimationOnScroll animateIn='animate__slideInRight'>
                                    <h3 className='text-2xl font-semibold text-white pb-2 light:text-black'>
                                        Affiliate Referral
                                    </h3>
                                    <p className='md:text-center light:text-[#1a1a2d]'>
                                        You are handsomely rewarded for telling
                                        your friends and family about the
                                        services of 1960token. You earn $3 on
                                        each successful referral. This option
                                        enables increase in earning
                                    </p>
                                </AnimationOnScroll>
                            </div>
                        </div>
                        <div className='grid grid-cols-[max-content,1fr] md:(flex flex-col items-center grid-cols-none) gap-5'>
                            <AnimationOnScroll animateIn='animate__slideInLeft'>
                                <FiAirplay className='text-blue-400 light:text-[#1a1a2d] text-6xl' />
                            </AnimationOnScroll>
                            <div className='grid md:justify-items-center'>
                                <AnimationOnScroll animateIn='animate__slideInRight'>
                                    <h3 className='text-2xl font-semibold text-white pb-2 light:text-black'>
                                        Entertainment
                                    </h3>
                                    <p className='md:text-center light:text-[#1a1a2d]'>
                                        You earn when you Trade and watch videos
                                        on the website. You earn $1 on each Task
                                        you complete 24hrs/daily.
                                    </p>
                                </AnimationOnScroll>
                            </div>
                        </div>
                        <div className='grid grid-cols-[max-content,1fr] md:(flex flex-col items-center grid-cols-none) gap-5'>
                            <AnimationOnScroll animateIn='animate__slideInLeft'>
                                <GiTeamDowngrade className='text-blue-400 light:text-[#1a1a2d] text-6xl' />
                            </AnimationOnScroll>
                            <div className='grid md:justify-items-center'>
                                <AnimationOnScroll animateIn='animate__slideInRight'>
                                    <h3 className='text-2xl font-semibold text-white pb-2 light:text-black'>
                                        Team Building
                                    </h3>
                                    <p className='md:text-center light:text-[#1a1a2d]'>
                                        Building a team of Networkers, while
                                        earning upto $20 minimum withdrawal
                                        threshold and above. This uses a matrix
                                        system of marketing and affiliation.
                                    </p>
                                </AnimationOnScroll>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className=' bg-red-500'>
                <img src="footer_crypto.jpeg" alt="" height='100%' width='100%'/>
                <h1>GET STARTED TODAY WITH</h1>
                <p>1960TOKEN</p>
                <p>Open an account today and start trading!</p>
                <button className='bg-orange-300 text-[#1a1a2d] rounded px-2 py-1 justify-self-center text-sm uppercase'>
                    Register Now
                </button>
            </div>
        </>
    )
}

export async function getServerSideProps() {
    try {
        await dbConnect()

        return {
            props: { isConnected: 'true' },
        }
    } catch (e) {
        return {
            props: { isConnected: 'false' },
        }
    }
}

export default Index
