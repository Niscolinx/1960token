import { useSession } from 'next-auth/react'
import { useTheme } from 'next-themes'
import React, { useEffect, useState, useMemo, useCallback } from 'react'
import { useAppDispatch, useAppSelector } from '../../store/app/hooks'
import { getUser, selectUser } from '../../store/features/user/UserSlice'

function team() {
    const { data: session } = useSession()
    const { theme } = useTheme()

    const dispatch = useAppDispatch()
    const fetchedUser = useAppSelector(selectUser)
    const user = useAppSelector(selectUser)

    const [referrals, setReferrals] = useState<TeamRow[]>()
    const [referralTotalNumberAndIncome, setReferralTotalNumberAndIncome] =
        useState<TeamTotalNumberAndIncome>()
    const [neuToUse, setNeuToUse] = useState<{}>()
    const [display, toggleDisplay] = useState(false)

    type TeamRow = {
        totalMember: number
        totalAmount: number
        level: number
    }

    type TeamTotalNumberAndIncome = {
        teamNumber: number
        teamIncome: number
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

        let teamNumber = 0
        let teamIncome = 0
        if (user.referrals.length > 0) {
            user.referrals.forEach((val) => {
                if (val.level === 1) {
                    teamRow1.totalMember += 1
                    teamRow1.totalAmount += 3

                    teamNumber += 1
                    teamIncome += 3
                }
                if (val.level === 2) {
                    teamRow2.totalMember += 1
                    teamRow2.totalAmount += 1.5

                    teamNumber += 1
                    teamIncome += 1.5
                }
                if (val.level === 3) {
                    teamRow3.totalMember += 1
                    teamRow3.totalAmount += 1

                    teamNumber += 1
                    teamIncome += 1
                }
            })
        }

        setReferrals([teamRow1, teamRow2, teamRow3])
        setReferralTotalNumberAndIncome({
            teamIncome,
            teamNumber,
        })
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

    const dropDown = () => {
        toggleDisplay(display ? false : true)
    }

    return (
        <div className='h-[71vh]'>
            <div className='py-5 px-2 grid'>
                <div className='flex justify-around bg-orange-300 rounded-t-lg py-5 px-4 dark:text-[#1a1a2d]'>
                    <div className='grid justify-items-center'>
                        <p className='font-semibold'>Referral Income</p>
                        <p className='font-bold'>
                            ${referralTotalNumberAndIncome?.teamIncome}
                        </p>
                    </div>
                    <div className='grid justify-items-center'>
                        <p className='font-semibold'>Mine/Video Income</p>
                        <p className='font-bold'>${fetchedUser.totalMined}</p>
                    </div>
                </div>
                <div
                    className='grid animateTop transition-all delay-[1s]'
                    style={
                        !display
                            ? {
                                  opacity: '0',
                                  height: '0',
                                  visibility: 'hidden',
                              }
                            : {
                                  opacity: '1',
                                  height: '100%',
                                  visibility: 'visible',
                              }
                    }
                >
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Tenetur nam velit dolorem non voluptate provident quos, sit
                    nemo maxime quasi autem debitis harum. Quisquam quod laborum
                    sequi doloribus accusantium
                </div>
                <button
                    className='text-center bg-blue-400 py-2 px-5 rounded-b-lg dark:text-[#1a1a2d]'
                    onClick={dropDown}
                >
                    Transfer
                </button>
            </div>
            <div className='grid px-2 mt-8'>
                <div className='grid'>
                    <p
                        className='justify-self-center font-semibold py-2 px-4 uppercase mb-4'
                        style={neuToUse}
                    >
                        Total Referral:{' '}
                        <span>{referralTotalNumberAndIncome?.teamNumber}</span>
                    </p>

                    <div className='grid'>
                        <table>
                            <tbody>
                                {referrals &&
                                    referrals.map((val, i) => {
                                        return (
                                            <tr
                                                key={i}
                                                className={`text-center font-bold ${
                                                    i === 1
                                                        ? 'border-b border-t border-gray-700 light:border-gray-400'
                                                        : ''
                                                }`}
                                            >
                                                <td className='py-2 px-4'>
                                                    LV{val.level}
                                                </td>
                                                <td className='py-2 px-4'>
                                                    {val.totalMember}
                                                </td>
                                                <td className='py-2 px-4'>
                                                    ${val.totalAmount}
                                                </td>
                                            </tr>
                                        )
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
