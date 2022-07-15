import { GetSessionParams, useSession, getSession } from 'next-auth/react'
import { useTheme } from 'next-themes'
import React, { useCallback, useEffect, useMemo, useState } from 'react'
import ReactPlayer from 'react-player/youtube'

import { useAppSelector, useAppDispatch } from '../../store/app/hooks'

import {
    initVideoEnded,
    selectVideo,
} from '../../store/features/video/VideoSlice'
import { getUser, selectUser } from '../../store/features/user/UserSlice'

function videoAd() {
    const { data: session } = useSession()
    const fetchedUser = useAppSelector(selectUser)
    const videoState = useAppSelector(selectVideo)
    const [displayToken, setDisplayToken] = useState<
        number | typeof videoState
    >()

    const { theme } = useTheme()
    const [neuToUse, setNeuToUse] = useState<{}>()
    const [isDim, setIsDim] = useState(true)

    const dispatch = useAppDispatch()

    const memoizedCallback = useCallback(() => {
        console.log('useCallback...........')
        if (session) {
            return dispatch(getUser(session))
        }
    }, [session])

    useMemo(() => {
        console.log('useMemo.............')
        return memoizedCallback()
    }, [])

    useEffect(() => {
        const onFirstLoad =
            videoState.videoMined === 0
                ? fetchedUser.videoMined
                : videoState.videoMined

        setDisplayToken(onFirstLoad)
    }, [videoState, fetchedUser])

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

    const handleVideoEnded = () => {
        if (session) {
            dispatch(initVideoEnded(session))
        }
    }

    const handleModel = () => {
        setIsDim(false)
    }

    return (
        <>
            <div className='grid grid-rows-[.1fr,1fr] overflow-hidden h-[86vh] relative'>
                <div
                    className=' justify-center grid w-max text-center py-2 px-10 rounded-lg place-self-center mb-2'
                    style={neuToUse}
                >
                    <p className='font-bold text-2xl'>{displayToken}</p>
                </div>

                <div className='relative'>
                    <div className='absolute right-0 left-0 bottom-0 top-0'>
                        <ReactPlayer
                            url='https://www.youtube.com/watch?v=L0CXSh2OVSA'
                            width='100%'
                            height='100%'
                            //onEnded={handleVideoEnded}
                            onStart={handleVideoEnded}
                        />
                    </div>
                </div>
                <div
                    className='w-full h-full bg-black bg-opacity-80 absolute top-0 bottom-0 left-0 right-0 z-20'
                    style={{ display: isDim ? 'block' : 'none' }}
                >
                    <div className='grid h-full w-full content-around px-6'>
                        <div className='grid justify-center bg-gray-300 rounded-lg py-4 px-6 text-[#1a1a2d] text-center gap-4'>
                            <h2 className='text-orange-700 font-semibold text-lg'>NOTICE!!</h2>
                            <p>
                                To complete your daily task, you are to Watch
                                the videos for 2 minutes to get Your earnings.
                            </p>
                            <button className='bg-orange-300 text-[#1a1a2d] rounded-lg py-2 px-4' onClick={handleModel}>
                                Ok
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default videoAd

export async function getServerSideProps(
    context: GetSessionParams | undefined
) {
    const session = await getSession(context)

    if (!session) {
        return {
            redirect: {
                destination: '/auth/login',
                permanent: false,
            },
        }
    }

    return {
        props: { session },
    }
}
