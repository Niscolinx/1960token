import { useSession } from 'next-auth/react'
import Link from 'next/link'
import dbConnect from '../lib/dbConnect'
import { GiWallet } from 'react-icons/gi'
import { RiCustomerService2Line } from 'react-icons/ri'
import { FaQuestionCircle } from 'react-icons/fa'
import Carousel1 from '../public/carousel11.svg'
import Carousel2 from '../public/carousel2.svg'
import Carousel3 from '../public/carousel3.svg'
import Logo from '../public/logo.svg'
import Image from 'next/image'
import { BsPersonPlusFill} from 'react-icons/bs'
import {MdAttachMoney} from 'react-icons/md'
import {AiOutlineCheck } from 'react-icons/ai'

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

                <div className='grid'>
                    <div className='flex'>
                        <div className='flex bg-orange-300 text-[#1a1a2d] p-1 rounded-full'>
                            <BsPersonPlusFill />
                        </div>
                        <span>Register Today</span>
                    </div>
                    <div className='flex'>
                        <div className='flex bg-orange-300 text-[#1a1a2d] p-1 rounded-full'>
                            <BsPersonPlusFill />
                        </div>
                        <AiOutlineCheck />
                        <span>Registration Bonus</span>
                    </div>
                    <div className='flex'>
                        <MdAttachMoney />
                        <span>Referral Commission</span>
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
