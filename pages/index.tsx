import { useSession } from 'next-auth/react'
import Link from 'next/link'
import dbConnect from '../lib/dbConnect'
import { GiWallet } from 'react-icons/gi'
import { RiCustomerService2Line } from 'react-icons/ri'
import { FaQuestionCircle } from 'react-icons/fa'
import Carousel1 from '../public/carousel1.svg'
import Carousel2 from '../public/carousel2.svg'
import Carousel3 from '../public/carousel3.svg'
import Logo from '../public/logo.svg'

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
            <div className='grid gap-5'>
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
                            <Carousel1 />
                        </div>
                    </SwiperSlide>
                    <SwiperSlide>
                        <div className='w-full md:w-2/3 rounded-4xl overflow-hidden'>
                            <Carousel2 />
                        </div>
                    </SwiperSlide>
                    <SwiperSlide>
                        <div className='w-full md:w-2/3 rounded-4xl overflow-hidden'>
                            <Carousel3 />
                        </div>
                    </SwiperSlide>
                </Swiper>

                <div className='grid text-[#ccccd0] border-b border-t border-gray-800 py-3'>
                    <div className='grid mt-4 grid-cols-tc gap-5'>
                        <Link href='/'>
                            <div className='grid justify-center place-items-center cursor-pointer'>
                                <Logo className='text-blue-400 text-3xl' />
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
                        <Link href='/'>
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
                    <h2 className='text-center font-semibold text-2xl grad'>
                        What Will Do
                    </h2>
                    <p className='text-justify'>
                        Lorem, ipsum dolor sit amet consectetur adipisicing
                        elit. Ab hic odio fugit veniam suscipit blanditiis
                        tempore, accusamus dolores vitae sed aliquam explicabo,
                        tenetur enim, libero delectus molestiae nobis
                        perspiciatis saepe. Lorem ipsum dolor sit amet
                        consectetur, adipisicing elit. Neque accusantium ea
                        placeat fugit alias quas adipisci maiores dicta
                        eligendi, ipsum eius quaerat velit unde dolorem dolores
                        voluptates architecto harum in.
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
