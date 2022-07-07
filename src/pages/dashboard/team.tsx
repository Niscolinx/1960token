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
        <div className='h-[71vh]'>
            <div className='py-5 px-2 grid'>
                <div className='flex justify-around bg-red-400 '>
                    <div className='grid justify-items-center'>
                        <p>Referral Income</p>
                        <p>0</p>
                    </div>
                    <div className='grid justify-items-center'>
                        <p>Mine/Video Income</p>
                        <p>0</p>
                    </div>
                </div>
                <button className='text-center bg-blue-400 just'>Transfer</button>
            </div>
        </div>
    )
}

export default team
