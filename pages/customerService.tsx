import React from 'react'

function customerService() {
    return (
        <div className='grid justify-center mt-10 gap-5 pb-10'>
            <h1
                className='text-center px-2 py-5 text-3xl font-semibold mb-5'
                style={{
                    background: `linear-gradient(145deg, #1c1c30, #171729)`,
                    boxShadow: `7px 7px 14px #161625,
             -7px -7px 14px #1e1e35`,
                    borderRadius: '50px',
                }}
            >
                CUSTOMER SERVICE
            </h1>
            <div className='grid'>
                <h2 className='text-center font-semibold text-2xl grad p-2'>
                    Unrivalled Customer Service
                </h2>
                <p className='text-justify'>
                    much of experience within the Mining and Affiliate Industry
                    so they understand what Miners and Affiliate want and need.
                    So you can Mine and Affiliate with confidence knowing fully
                    well that the 1960Token team will always be there to help
                    you 24/hrs a day. 7 days a week.
                </p>
                <h2 className='text-center font-semibold text-2xl grad p-2 mt-10'>
                    Have a question or require specialist assistance?{' '}
                </h2>
                <div className='text-justify'>
                    Our dedicated customer service team is here 24/7 to assist
                    you. Call Us Email Inquiries +1…. support@1960Token
                    <h3 className='grad mt-2'>Send us a message</h3>
                    Whether you're new to 1960Token platform or have a question
                    about your existing account, we can help. Simply fill in
                    your details below and we'll get back to you soon. All
                    fields are required.
                    <form className='grid mt-10 w-full md:w-2/3 lg:w-2/4 mx-auto px-10'>
                        <div className='mb-4'>
                            <label
                                className='block grad text-sm font-bold mb-2'
                                htmlFor='username'
                            >
                                Email
                            </label>

                            <input
                                className={`shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline text-[#1a1a2d]`}
                                id='email'
                                type='email'
                                name='email'
                                required
                                //   value={email}
                                //   onChange={changeHandler}
                            />
                        </div>
                        <div className='mb-4'>
                            <label
                                className='block grad text-sm font-bold mb-2'
                                htmlFor='username'
                            >
                                Message
                            </label>

                            <textarea
                                className={`shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline text-[#1a1a2d]`}
                                id='textarea'
                                rows={4}
                                name='textarea'
                                required
                                //   value={email}
                                //   onChange={changeHandler}
                            />
                        </div>
                        <button className='bg-green-500 text-[#1a1a2d] rounded px-4 py-2 text-sm mt-5'>
                            Withdraw
                        </button>{' '}
                    </form>
                </div>
            </div>
        </div>
    )
}

export default customerService
