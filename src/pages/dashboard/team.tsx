import { useSession } from 'next-auth/react'
import { useTheme } from 'next-themes'
import React, { useEffect, useState, useMemo, useCallback } from 'react'
import { useAppDispatch, useAppSelector } from '../../store/app/hooks'
import { getUser, selectUser } from '../../store/features/user/UserSlice'

function team() {
    const { data: session } = useSession()
    const dispatch = useAppDispatch()
    const [referrals, setReferrals] = useState<TeamRow[]>()
    const user = useAppSelector(selectUser)

    const { theme } = useTheme()
    const [neuToUse, setNeuToUse] = useState<{}>()

    type TeamRow = {
        totalMember: number
        totalAmount: number
        level: number
    }

    useEffect(() => {
        if (session) {
            dispatch(getUser(session))
        }
    }, [session])

    useEffect(() => {
        const teamRow1: TeamRow = {
            totalMember: 0,
            totalAmount: 0,
            level: 1,
        }
        const teamRow2: TeamRow = {
            totalMember: 0,
            totalAmount: 0,
            level: 2,
        }
        const teamRow3: TeamRow = {
            totalMember: 0,
            totalAmount: 0,
            level: 3,
        }

        if (user.referrals.length > 0) {
            //setReferrals(user.referrals)
            user.referrals.forEach((val, i) => {
                console.log({ val })
                if (val.level === 1) {
                    teamRow1.totalMember += 1
                    teamRow1.totalAmount += 3
                }
                if (val.level === 2) {
                    teamRow2.totalMember += 1
                    teamRow2.totalAmount += 1.5
                }
                if (val.level === 3) {
                    teamRow3.totalMember += 1
                    teamRow3.totalAmount += 1
                }
            })
        }

        setReferrals([teamRow1, teamRow2, teamRow3])
    }, [user])

    console.log({ referrals })

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
                <div className='flex justify-around bg-orange-300 rounded-t-lg py-5 px-4 dark:text-[#1a1a2d]'>
                    <div className='grid justify-items-center'>
                        <p className='font-semibold'>Referral Income</p>
                        <p className='font-bold'>$10</p>
                    </div>
                    <div className='grid justify-items-center'>
                        <p className='font-semibold'>Mine/Video Income</p>
                        <p className='font-bold'>$15</p>
                    </div>
                </div>
                <button className='text-center bg-blue-400 py-2 px-5 rounded-b-lg dark:text-[#1a1a2d]'>
                    Transfer
                </button>
            </div>
            <div className='grid px-2 mt-8'>
                <div className='grid'>
                    <p
                        className='justify-self-center font-semibold py-2 px-4 uppercase mb-4'
                        style={neuToUse}
                    >
                        Total Referral: <span>32</span>
                    </p>

                    <div className='grid'>
                        <table>
                            <tbody>
                                {referrals &&
                                    referrals.map((val, i) => {
                                        return <tr key={i}
                                            className={`text-center ${
                                                i === 1
                                                    ? 'border-b border-t border-gray-700 light:border-gray-400'
                                                    : ''
                                            }`}
                                        >
                                            <td className='py-2 px-4'>LV{val.level}</td>
                                            <td className='py-2 px-4'>{val.totalMember}</td>
                                            <td className='py-2 px-4'>${val.totalAmount}</td>
                                        </tr>
                                    })}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default team
