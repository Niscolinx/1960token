import {
    GetServerSideProps,
    GetServerSidePropsContext,
    NextPageContext,
} from 'next'
import React from 'react'

function index() {
    return <div className='h-[100vh]'>
      <h1>Welcome Admin</h1>
    
    </div>
}

export default index

export async function getServerSideProps(context: GetServerSidePropsContext) {
    const token = context.req.cookies.adminToken
    if (!token) {
        return {
            redirect: {
                destination: '/auth/login',
                permanent: false,
            },
        }
    }
    return {
        props: {
            isAuthenticated: true,
        },
    }
}
