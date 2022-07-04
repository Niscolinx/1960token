import React, { useEffect, useState } from 'react'
import { useTheme } from 'next-themes'
import { AnimationOnScroll } from 'react-animation-on-scroll'

function aboutUs() {
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
        <div className='grid justify-center mt-10 gap-5 pb-10 px-4'>
            <AnimationOnScroll animateIn='animate__slideInDown'>
                <h1
                    className='text-center px-2 py-5 text-3xl font-semibold mb-5  '
                    style={neuToUse}
                >
                    ABOUT US
                </h1>
            </AnimationOnScroll>
            <div className='grid'>
                <p className='text-justify'>
                    1960Token is one of the most superior Mining and Affiliate
                    platform, offering Mining and Affiliate solutions for active
                    day Miner and Affiliate as well as client that are new to
                    the Platform. 1960Token offers its clients the best Mining
                    and Affiliate platforms, with superior connectivity.
                    1960Token is revolutionizing online Mining and Affiliate.
                </p>
            </div>

            <div className='grid'>
                <AnimationOnScroll animateIn='animate__slideInDown'>
                    <h2 className='text-center font-semibold text-2xl grad p-2'>
                        OUR MISSION{' '}
                    </h2>
                </AnimationOnScroll>
                <p className='text-justify'>
                    1960Token Mission is to create the best Mining and Affiliate
                    experience for all her clients alike Miners to focus more on
                    their Mining. 1960Token is dedicated to offering her client
                    superior service. And 1960Token has been created with miners
                    in mind.
                </p>
            </div>
            <div className='grid'>
                <h3>Core Values</h3>
                <AnimationOnScroll animateIn='animate__slideInLeft'>
                    <ol className='list-decimal list-inside'>
                        <li>Integrity and Trust</li>
                        <li>Honesty and Fairness</li>
                        <li>Transparency</li>
                        <li>Commitments and Responsibility</li>
                        <li>Reliability </li>
                        <li>Flexibility</li>
                        <li>Constant Innovation</li>
                        <li>Strong Corporate Governance</li>
                    </ol>
                </AnimationOnScroll>
            </div>

            <div className='grid'>
                <AnimationOnScroll animateIn='animate__slideInDown'>
                    <h2 className='text-center font-semibold text-2xl grad p-2 uppercase'>
                        Confidentiality{' '}
                    </h2>
                </AnimationOnScroll>
                <AnimationOnScroll animateIn='animate__zoomInLeft'>
                    <p className='text-justify'>
                        1960Token maintains appropriate controls and monitors
                        the transfer of confidential and sensitive client
                        information within and outside the Company on a
                        need-to-know basis. 1960Token does not deliberately
                        disclose client information unless this is upon request
                        of the client, or as required to do so by law.
                    </p>
                </AnimationOnScroll>
            </div>
            <div className='grid'>
                            <AnimationOnScroll animateIn='animate__slideInDown'>

                <h2 className='text-center font-semibold text-2xl grad p-2'>
                    WHY US{' '}
                </h2>
                <div className='grid'>
                    <p className='text-justify'>
                        1960Token has grown to become one of the largest Mining
                        and Affiliate Platform in the world by giving her
                        clients what they really want. These are:
                    </p>
                    <ul className='list-disc list-inside p-5 grid gap-5'>
                        <li className='text-justify'>
                            <span className='font-semibold'>
                                FAST PAYMENT -
                            </span>{' '}
                            You can make your withdrawal anytime you want as an
                            Affiliate and as for Miners you withdraw only once
                            in a month. You will receive your money on your
                            crypto wallet within 24/hrs.{' '}
                        </li>
                        <li className='text-justify'>
                            <span className='font-semibold'>
                                SUPERIOR TECHNOLOGY -{' '}
                            </span>{' '}
                            1960Token has partnered with the world best mining
                            technology companies to bring you the ultimate
                            Mining and Affiliate experience
                        </li>
                    </ul>
                </div>
            </div>
            <div className='grid'>
                <h2 className='text-center font-semibold text-2xl grad p-2'>
                    SUPERIOR MINING PLATFORM{' '}
                </h2>
                <p className='text-justify'>
                    1960Token has revolutionized Miners and Affiliate by giving
                    them direct access to a superior platform and popular Mining
                    and Affiliate platform.
                </p>
            </div>
            <div className='grid'>
                <h2 className='text-center font-semibold text-2xl grad p-2'>
                    TRUST AND TRANSPARENCY{' '}
                </h2>
                <p className='text-justify'>
                    Trust and Transparency form the basis of 1960Token core
                    values. So here there is no requotes, no manipulation and
                    also no restrictions. All client earnings are held on a
                    segregated trust accounts with security.
                </p>
            </div>
            <div className='grid mt-10'>
                <h3 className='text-center font-semibold text-2xl grad p-2'>
                    Who We Are{' '}
                </h3>
                <p className='text-justify'>
                    1960Token is one of the most superior Mining and Affiliate
                    platform, offering Mining and Affiliate solutions for active
                    day Miner and Affiliate as well as client that are new to
                    the Platform. 1960Token offers its clients the best Mining
                    and Affiliate platforms, with superior connectivity.
                    1960Token is revolutionizing online Mining and Affiliate.
                </p>
            </div>
        </div>
    )
}

export default aboutUs
