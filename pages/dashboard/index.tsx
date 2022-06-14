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
        <div className='py-2 px-4 bg-[#1a1a2d] text-gray-300'>
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
                <div>
                    <p>total assets</p>
                    <p>2312.08</p>
                </div>

                <form className='flex justify-center align-middle gap-2'>
                    <input
                        type='text'
                        placeholder='Coupon code'
                        className='  rounded-lg shadow appearance-none border rounded py-1 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                    />
                    <button className=' bg-orange-300 text-white'>
                        Activate
                    </button>
                </form>
                <button>Withdraw</button>
            </div>
        </div>
    )
}

export default Home
