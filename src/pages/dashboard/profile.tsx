import { GetSessionParams, getSession } from 'next-auth/react'
import React from 'react'

function profile() {
    return <div className='px-4'>profile</div>
}

export default profile

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
