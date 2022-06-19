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
                  much of experience within the Mining and Affiliate Industry so
                  they understand what Miners and Affiliate want and need. So
                  you can Mine and Affiliate with confidence knowing fully well
                  that the 1960Token team will always be there to help you
                  24/hrs a day. 7 days a week.
              </p>
          </div>
      </div>
  )
}

export default customerService