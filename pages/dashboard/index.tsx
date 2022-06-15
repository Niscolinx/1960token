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
        <div className='py-2 px-4 bg-[#1a1a2d] text-[#ccccd0] h-screen'>
            <div className='flex items-center gap-2'>
                <img
                    src={`${session?.user?.image}`}
                    alt=''
                    className='rounded-full w-10'
                />
                <div className='block text-sm font-semibold'>
                    <p>{session?.user?.name}</p>
                    <p className='text-xs bg-red-400 text-black px-2 rounded-lg w-max'>
                        Not verified
                    </p>
                </div>
            </div>
            <div className='grid mt-10 gap-5'>
                <div className=' justify-center grid border w-max text-center py-2 px-10 rounded-lg place-self-center'>
                    <p className='text-sm'>Total Asset</p>
                    <p className='font-bold text-3xl'>$2312.08</p>
                    <button className='bg-green-500 text-[#1a1a2d] rounded px-1 text-sm mt-5'>
                        Withdraw
                    </button>
                </div>

                <form className='flex justify-center align-middle gap-2'>
                    <input
                        type='text'
                        placeholder='Coupon code'
                        className='  rounded-lg shadow appearance-none border rounded py-1 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-[#d1d1db]'
                    />
                    <button className=' bg-orange-300 text-[#1a1a2d] rounded px-2 py-1'>
                        Activate
                    </button>
                </form>
            </div>
        </div>
    )
}

export default Home
