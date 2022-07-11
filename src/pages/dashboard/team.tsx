import { useSession } from 'next-auth/react'
import { useTheme } from 'next-themes'
import React, { useEffect, useState, useMemo, useCallback } from 'react'
import { useAppDispatch, useAppSelector } from '../../store/app/hooks'
import { getUser, selectUser } from '../../store/features/user/UserSlice'
import { TbArrowsSort } from 'react-icons/tb'

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
    const [displayButton, setDisplayButton] = useState('Transfer')
    const [selectedOption, setSelectedOption] = useState<
        TOption
    >('Mine/Video Income')

    type TOption = 
'Mine/Video Income' | 'Referral Income'
    

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
        setDisplayButton(display ? 'Transfer' : 'Close')
    }

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        if(selectedOption === 'Mine/Video Income'){

        }
    }

    const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const value = e.target.value as TOption
        setSelectedOption(value)
        console.log({value})
    }

    return (
        <div className='h-[80vh]'>
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
                    className='grid animate-rotate-out transition-all delay-100'
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
                    <form className='px-8 py-12 grid' onSubmit={handleSubmit}>
                        <div className=' grid justify-items-center gap-4 dark:text-[#1a1a2d]'>
                            <select
                                className={`shadow appearance-none border rounded w-full py-4 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline bg-white `}
                                onChange={handleChange}
                            >
                                <option value='Referral Income'>
                                    Referral Income
                                </option>
                                <option value='Mine/Video Income'>
                                    Mine/Video Income
                                </option>
                            </select>
                            <TbArrowsSort className='text-2xl' />
                            <p className='text-2xl py-4 px-6 border border-[#1a1a2d] font-bold rounded-lg' style={neuToUse}>
                                Portfolio
                            </p>
                        </div>
                        <button className='bg-green-600 font-semibold py-1 px-4 justify-self-center rounded-lg mt-8' type='submit'>
                            Transfer
                        </button>
                    </form>
                </div>
                <button
                    className='text-center bg-blue-400 py-2 px-5 rounded-b-lg dark:text-[#1a1a2d]'
                    onClick={dropDown}
                >
                    {displayButton}
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
