import { useSession } from 'next-auth/react'

const Home = (props: any) => {
    const { data: session } = useSession()

    console.log({ session })

    let isLoggedInMessage: string = ''
    if (session) {
        isLoggedInMessage = `You are logged in as ${session.user?.name}`
    } else {
        isLoggedInMessage = `Not logged in`
    }
    return <div className='py-2 px-4'>
        <div className="grid">
            <img src={} alt=''/>
        </div>
        </div>
}

export default Home
