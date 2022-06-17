import { getSession, GetSessionParams, useSession } from 'next-auth/react'
import React from 'react'

const isAuth: React.FC = ({ children }) => {
    return <>{children}</>
}

export default isAuth

export async function getServerSideProps(
    context: GetSessionParams | undefined
) {
    const session = await getSession(context)

    if (!session) {
        return {
            redirect: {
                destination: '/',
                permanent: false,
            },
        }
    }

    return {
        props: { session },
    }
}
