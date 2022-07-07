import { useTheme } from 'next-themes'
import React, { useEffect, useState } from 'react'

function team() {
    const { theme } = useTheme()
    const [neuToUse, setNeuToUse] = useState<{}>()

    useEffect(() => {
        if (theme === 'dark') {
            setNeuToUse({
                background: `linear-gradient(145deg, #1c1c30, #171729)`,
                boxShadow: `7px 7px 14px #161625,
                 -7px -7px 14px #1e1e35`,
                borderRadius: '50px',
            })
        } else {
            setNeuToUse({
                background: `linear-gradient(145deg, #dadadf, #b8b8bb)`,
                boxShadow: `7px 7px 14px #a5a5a8,
             -7px -7px 14px #f3f3f8`,
                borderRadius: '50px',
                color: '#1a1a2d',
            })
        }
    }, [theme])

    return (
        <div className="h-[71vh]">

        <div className='py-5 px-2 grid justify-center justify-items-center'>
            <h1
                style={neuToUse}
                className=' justify-self-center text-2xl px-2 py-1 mt-4 mb-5'
            >
                My Team
            </h1>
            <div className='grid justify-items-center gap-4'>
                <BsFillFilePersonFill className='text-4xl' />

                <div className='grid'>
                    <h3 className='text-xl'>
                        Upline: <span className='font-semibold'>Tester1</span>
                    </h3>
                </div>
            </div>
            <div className='grid mt-5 border border-gray-500 rounded-lg py-2 px-5'>
                <div className='grid'>
                    <p>
                        Total Referral Commission
                        <span className='font-semibold'>: $97</span>
                    </p>
                </div>
                <div className='grid'>
                    <p>
                        Referrals<span className='font-semibold'>: 35</span>
                    </p>
                </div>
                <div className='grid'>
                    <p>
                        Actival Referrals
                        <span className='font-semibold'>: 27</span>
                    </p>
                </div>
            </div>
        </div>
        </div>
    )
}

export default team
