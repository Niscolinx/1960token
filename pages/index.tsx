import { useSession } from 'next-auth/react'
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
import { BsPersonPlusFill, BsCheckLg } from 'react-icons/bs'
import { FaDollarSign, FaPeopleArrows } from 'react-icons/fa'
import {FiAirplay} from 'react-icons/fi'


// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react'

// Import Swiper styles
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'

import { Autoplay, Pagination } from 'swiper'

const Index = () => {
    const { data: session } = useSession()

    let isLoggedInMessage: string = ''
    if (session) {
        isLoggedInMessage = `You are logged in as ${session.user?.name}`
    } else {
        isLoggedInMessage = `Not logged in`
    }

    return (
        <>
            <div className='grid gap-5 max-w-3xl mx-auto text-gray-400'>
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

                <div className='grid text-gray-400 border-b border-t border-gray-800 py-3'>
                    <div className='grid mt-4 grid-cols-tc gap-5'>
                        <Link href='/aboutUs'>
                            <div className='grid justify-center place-items-center cursor-pointer'>
                                <Logo className='text-blue-400 text-3xl w-12 h-12' />
                                <button
                                    className='text-md p-1'
                                    style={{
                                        background: `linear-gradient(145deg, #1c1c30, #171729)`,
                                        boxShadow: `7px 7px 14px #161625,
             -7px -7px 14px #1e1e35`,
                                        borderRadius: '50px',
                                    }}
                                >
                                    About Us
                                </button>
                            </div>
                        </Link>
                        <Link href='/'>
                            <div className='grid justify-center place-items-center cursor-pointer'>
                                <GiWallet className='text-blue-400 text-3xl' />
                                <button
                                    className='text-md p-1'
                                    style={{
                                        background: `linear-gradient(145deg, #1c1c30, #171729)`,
                                        boxShadow: `7px 7px 14px #161625,
             -7px -7px 14px #1e1e35`,
                                        borderRadius: '50px',
                                    }}
                                >
                                    Vendors
                                </button>
                            </div>
                        </Link>

                        <Link href='/'>
                            <div className='grid justify-center place-items-center cursor-pointer'>
                                <FaQuestionCircle className='text-blue-400 text-3xl' />
                                <button
                                    className='text-md p-1'
                                    style={{
                                        background: `linear-gradient(145deg, #1c1c30, #171729)`,
                                        boxShadow: `7px 7px 14px #161625,
             -7px -7px 14px #1e1e35`,
                                        borderRadius: '50px',
                                    }}
                                >
                                    FAQ
                                </button>
                            </div>
                        </Link>
                        <Link href='/customerService'>
                            <div className='grid justify-center place-items-center cursor-pointer'>
                                <RiCustomerService2Line className='text-blue-400 text-3xl' />
                                <button
                                    className='text-md p-1'
                                    style={{
                                        background: `linear-gradient(145deg, #1c1c30, #171729)`,
                                        boxShadow: `7px 7px 14px #161625,
             -7px -7px 14px #1e1e35`,
                                        borderRadius: '50px',
                                    }}
                                >
                                    Customer Service
                                </button>
                            </div>
                        </Link>
                    </div>
                </div>

                <div className='grid justify-center gap-5 my-10'>
                    <div
                        className='grid border'
                        style={{
                            background: `linear-gradient(145deg, #1c1c30, #171729)`,
                            boxShadow: `7px 7px 14px #161625,
             -7px -7px 14px #1e1e35`,
                            borderRadius: '50px',
                            borderTop: '#1a1a2d',
                        }}
                    >
                        <div className='flex bg-orange-300 text-[#1a1a2d] p-4 rounded-full items-center justify-center'>
                            <BsPersonPlusFill className='flex mr-8 text-2xl' />
                            <p className=' font-semibold text-center'>
                                Register Today
                            </p>
                        </div>
                        <p className='text-center'>
                            Reward -{' '}
                            <span className='semibold text-orange-300 p-2 '>
                                $5
                            </span>
                        </p>
                    </div>
                    <div
                        className='flex gap-3 border border-orange-300 items-center'
                        style={{
                            background: `linear-gradient(145deg, #1c1c30, #171729)`,
                            boxShadow: `7px 7px 14px #161625,
             -7px -7px 14px #1e1e35`,
                            borderRadius: '50px',
                        }}
                    >
                        <div className='flex bg-orange-300 text-[#1a1a2d] p-4 rounded-full  font-bold'>
                            <BsCheckLg />
                        </div>
                        <div className='grid'>
                            <p className='text-2xl font-semibold'>
                                Registration Bonus
                            </p>
                            <p className='text-center'>
                                Reward -{' '}
                                <span className='semibold text-orange-300 p-2 '>
                                    $5
                                </span>
                            </p>{' '}
                        </div>
                    </div>
                    <div
                        className='flex gap-3 border border-orange-300 items-center'
                        style={{
                            background: `linear-gradient(145deg, #1c1c30, #171729)`,
                            boxShadow: `7px 7px 14px #161625,
             -7px -7px 14px #1e1e35`,
                            borderRadius: '50px',
                        }}
                    >
                        <div className='flex bg-orange-300 text-[#1a1a2d] p-4 rounded-full '>
                            <FaDollarSign />
                        </div>
                        <p className='text-2xl font-semibold'>
                            Referral Commission
                        </p>
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
                        <h3 className='text-center font-semibold text-2xl grad p-2'>
                            How 1960token works
                        </h3>
                        <p className='text-sm text-center'>
                            You are guaranteed to earn massively as an active
                            member of 1960TOKEN in various ways;
                        </p>
                    </div>

                    <div className='grid mt-10 gap-10'>
                        <div className='grid grid-cols-[max-content,1fr] gap-5'>
                            <FaPeopleArrows className='text-blue-400 text-6xl' />
                            <div className='grid'>
                                <h3 className='text-2xl font-semibold'>
                                    Affiliate Referral
                                </h3>
                                <p>
                                    You are handsomely rewarded for telling your
                                    friends and family about the services of
                                    1960token. You earn $3 on each successful
                                    referral. This option enables increase in
                                    earning
                                </p>
                            </div>
                        </div>
                        <div className='flex '>
                            <FiAirplay className='text-blue-400 text-3xl' />
                            <div className='grid'>
                                <h3>Entertainment</h3>
                                <p>
                                    You earn when you Trade and watch videos on
                                    the website. You earn $1 on each Task you
                                    complete 24hrs/daily.
                                </p>
                            </div>
                        </div>
                        <div className='flex '>
                            <GiTeamDowngrade className='text-blue-400 text-3xl' />
                            <div className='grid'>
                                <h3>Team Building</h3>
                                <p>
                                    Building a team of Networkers, while earning
                                    upto $20 minimum withdrawal threshold and
                                    above. This uses a matrix system of
                                    marketing and affiliation.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='grid'>
                    <h3 className='text-center font-semibold text-2xl grad p-2'>
                        Who We Are{' '}
                    </h3>
                    <p className='text-justify'>
                        1960Token is one of the most superior Mining and
                        Affiliate platform, offering Mining and Affiliate
                        solutions for active day Miner and Affiliate as well as
                        client that are new to the Platform. 1960Token offers
                        its clients the best Mining and Affiliate platforms,
                        with superior connectivity. 1960Token is revolutionizing
                        online Mining and Affiliate.
                    </p>
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
