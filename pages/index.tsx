import React, { useEffect, useState } from 'react'
import { useSession } from 'next-auth/react'
import { useTheme } from 'next-themes'
import Link from 'next/link'
import dbConnect from '../lib/dbConnect'
import { GiWallet, GiTeamDowngrade } from 'react-icons/gi'
import { RiCustomerService2Line } from 'react-icons/ri'
import { FaQuestionCircle } from 'react-icons/fa'
import Carousel1 from '../public/carousel11.svg'
import Carousel2 from '../public/carousel2.svg'
import Carousel3 from '../public/carousel3.svg'
import Logo from '../public/logo.svg'
import Image from 'next/image'
import { BsPersonPlusFill, BsCheckLg, BsCheck } from 'react-icons/bs'
import { FaDollarSign, FaPeopleArrows } from 'react-icons/fa'
import { FiAirplay } from 'react-icons/fi'

// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react'

// Import Swiper styles
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'

import { Autoplay, Pagination } from 'swiper'

const Index = () => {

    const { theme } = useTheme()
    const [neuToUse, setNeuToUse] = useState<{}>()

    useEffect(() => {
        if (theme === 'dark') {
            console.log('dark theme', { theme })

            setNeuToUse({
                background: `linear-gradient(145deg, #1c1c30, #171729)`,
                boxShadow: `7px 7px 14px #161625,
                 -7px -7px 14px #1e1e35`,
                borderRadius: '50px',
            })
        } else {
            console.log('light theme', { theme })
            setNeuToUse({
                background: `linear-gradient(145deg, #dadadf, #b8b8bb)`,
                boxShadow: `7px 7px 14px #a5a5a8,
             -7px -7px 14px #f3f3f8`,
                borderRadius: '50px',
            })
        }
    }, [theme])
    return (
        <>
            <div className='grid gap-5 max-w-5xl mx-auto text-gray-400'>
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
                        <div className='w-full md:w-2/3 rounded-4xl overflow-hidden'>
                            {/* file sizes are too big, check for optimization <Carousel1/> */}
                            <Link href='/api/auth/signin'>
                                <Image
                                    src='/carousel11.png'
                                    alt=''
                                    width='1920px'
                                    height='1080px'
                                />
                            </Link>
                        </div>
                    </SwiperSlide>
                    <SwiperSlide>
                        <div className='w-full md:w-2/3 rounded-4xl overflow-hidden'>
                            <Image
                                src='/carousel22.png'
                                alt=''
                                width='1920px'
                                height='1080px'
                            />
                        </div>
                    </SwiperSlide>
                    <SwiperSlide>
                        <div className='w-full md:w-2/3 rounded-4xl overflow-hidden'>
                            <Image
                                src='/carousel33.png'
                                alt=''
                                width='1920px'
                                height='1080px'
                            />
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
                    <div
                        className='grid items-center bg-[#ccccd0] text-black py-2 px-4 rounded-lg w-full'
                        style={{
                            boxShadow: `7px 7px 14px #161625,
             -7px -7px 14px #1e1e35`,
                            borderTop: '#1a1a2d',
                            gridTemplateColumns: 'min-content max-content',
                        }}
                    >
                        <div className='flex'>
                            <BsPersonPlusFill className='flex mr-8 text-6xl' />
                        </div>
                        <div className='grid text-lg'>
                            <p className=' font-semibold '>Register Today</p>
                            <p className='py-2 text-2xl font-extrabold'>$5</p>
                        </div>
                    </div>
                    <div
                        className='grid items-center bg-[#ccccd0] text-black py-2 px-4 rounded-lg'
                        style={{
                            boxShadow: `7px 7px 14px #161625,
             -7px -7px 14px #1e1e35`,
                            borderTop: '#1a1a2d',
                            gridTemplateColumns: 'min-content 1fr',
                        }}
                    >
                        <div className='flex'>
                            <BsCheck className='flex mr-8 text-6xl' />
                        </div>
                        <div className='grid text-lg'>
                            <p className=' font-semibold '>
                                Registration Bonus
                            </p>
                            <p className='py-2 text-2xl font-extrabold'>$2</p>
                        </div>
                    </div>
                    <div
                        className='grid items-center bg-[#ccccd0] text-black py-2 px-4 rounded-lg'
                        style={{
                            boxShadow: `7px 7px 14px #161625,
             -7px -7px 14px #1e1e35`,
                            borderTop: '#1a1a2d',
                            gridTemplateColumns: 'min-content max-content',
                        }}
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
                </div>
                <div className='grid mt-10'>
                    <div
                        className='grid'
                        style={{
                            background: `linear-gradient(145deg, #1c1c30, #171729)`,
                            boxShadow: `7px 7px 14px #161625,
                        -7px -7px 14px #1e1e35`,
                            borderRadius: '50px',
                        }}
                    >
                        <h3 className='text-center font-semibold text-2xl grad p-2 uppercase'>
                            How 1960token works
                        </h3>
                        <p className='text-center'>
                            You are guaranteed to earn massively as an active
                            member of 1960TOKEN in various ways;
                        </p>
                    </div>

                    <div className='grid mt-10 gap-10 md:grid-cols-[repeat(auto-fit,minmax(15%,1fr))]'>
                        <div className='grid grid-cols-[max-content,1fr] md:(flex flex-col items-center grid-cols-none) gap-5'>
                            <FaPeopleArrows className='text-blue-400 text-6xl' />
                            <div className='grid md:justify-items-center'>
                                <h3 className='text-2xl font-semibold text-white pb-2'>
                                    Affiliate Referral
                                </h3>
                                <p className='md:text-center'>
                                    You are handsomely rewarded for telling your
                                    friends and family about the services of
                                    1960token. You earn $3 on each successful
                                    referral. This option enables increase in
                                    earning
                                </p>
                            </div>
                        </div>
                        <div className='grid grid-cols-[max-content,1fr] md:(flex flex-col items-center grid-cols-none) gap-5'>
                            <FiAirplay className='text-blue-400 text-6xl' />
                            <div className='grid md:justify-items-center'>
                                <h3 className='text-2xl font-semibold text-white pb-2'>
                                    Entertainment
                                </h3>
                                <p className='md:text-center'>
                                    You earn when you Trade and watch videos on
                                    the website. You earn $1 on each Task you
                                    complete 24hrs/daily.
                                </p>
                            </div>
                        </div>
                        <div className='grid grid-cols-[max-content,1fr] md:(flex flex-col items-center grid-cols-none) gap-5'>
                            <GiTeamDowngrade className='text-blue-400 text-6xl' />
                            <div className='grid md:justify-items-center'>
                                <h3 className='text-2xl font-semibold text-white pb-2'>
                                    Team Building
                                </h3>
                                <p className='md:text-center'>
                                    Building a team of Networkers, while earning
                                    upto $20 minimum withdrawal threshold and
                                    above. This uses a matrix system of
                                    marketing and affiliation.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
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
