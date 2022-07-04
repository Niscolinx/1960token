import { useTheme } from 'next-themes'
import React, { useEffect, useState } from 'react'
import {BsFillFilePersonFill} from 'react-icons/bs'

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
    <div className='py-5 px-2 grid justify-center justify-items-center'>
        <h1 style={neuToUse} className=' justify-self-center text-2xl px-2 py-1 mt-4'>My Team</h1>
        <div className="grid">
            <BsFillFilePersonFill className='text-4xl'/>

            <div className="grid">
                <h3>Upline: <span>Tester1</span></h3>
            </div>
        </div>
        <div className="grid">
            <div className="grid">
                <p>Total Referral Commission</p>
                <p>$97</p>
            </div>
            <div className="grid">
                <p>Referrals</p>
                <p>35</p>
            </div>
            <div className="grid">
                <p>Actival Referrals</p>
                <p>22</p>
            </div>
        </div>
    </div>
  )
}

export default team