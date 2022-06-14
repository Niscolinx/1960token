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
    return (
        <div className='py-2 px-4'>
            <div className='flex justify-center items-center gap-2'>
                <img
                    src={`${session?.user?.image}`}
                    alt=''
                    className='rounded-full w-12'
                />
                <div className='block text-sm font-semibold'>
                    <p>{session?.user?.name}</p>
                    <p>Not verified</p>
                </div>
            </div>
            <div className='grid mt-10 gap-5'>
                <p>total assets</p>
                <p>2312.08</p>

                <form>
                    <input type="text" placeholder='Coupon code' className=' border-dark-50 border'/>
                    <button>Activate</button>
                </form>
                <button>Withdraw</button>
            </div>
        </div>
    )
}

export default Home
