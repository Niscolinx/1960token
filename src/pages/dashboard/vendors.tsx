import React from 'react'
import { BsFillSunFill } from 'react-icons/bs'
import { RiWhatsappFill } from 'react-icons/ri'

const VENDORS = [
    { name: 'vendor1', contact: '+234234234231' },
    { name: 'vendor2', contact: '+234234234232' },
    { name: 'vendor3', contact: '+234234234233' },
    { name: 'vendor4', contact: '+234234234234' },
    { name: 'vendor5', contact: '+234234234235' },
    { name: 'vendor6', contact: '+234234234236' },
    { name: 'vendor7', contact: '+234234234237' },
    { name: 'vendor8', contact: '+234234234238' },
    { name: 'vendor9', contact: '+234234234239' },
    { name: 'vendor10', contact: '+234234234230' },
    { name: 'vendor11', contact: '+234234234211' },
    { name: 'vendor12', contact: '+234234234212' },
    { name: 'vendor13', contact: '+234234234213' },
    { name: 'vendor14', contact: '+234234234214' },
    { name: 'vendor15', contact: '+234234234215' },
]

function vendors() {
    return (
        <div className='min-h-[80vh]'>
            <div className='grid overflow-scroll max-h-[70vh]'>
                <table className='border border-gray-700 transaction-table mx-5 md:mx-auto'>
                    <caption className='font-bold text-lg py-5 uppercase'>
                        Vendors
                    </caption>
                    <colgroup>
                        <col className='min-w-20' />
                        <col className='min-w-40' />
                        <col className='min-w-20' />
                    </colgroup>
                    <thead>
                        <tr className='mb-10'>
                            <th>No</th>
                            <th>Name</th>
                            <th>Contact</th>
                        </tr>
                    </thead>
                    <tbody className='text-center'>
                        {VENDORS.map((value, i) => {
                            return (
                                <tr key={i} className='mx-4 py-2'>
                                    <td>{i + 1}</td>
                                    <td>
                                        <div className='div flex items-center text-xl place-content-center'>
                                            <BsFillSunFill className='text-orange-300 flex self-center' />{' '}
                                            <p className='capitalize'>
                                                {value.name}
                                            </p>
                                        </div>
                                    </td>
                                    <td>
                                        <a
                                            href={`https://wa.me/${value.contact}`}
                                            target='_blank'
                                        >
                                            <RiWhatsappFill className='text-[#25D366] text-2xl' />
                                        </a>
                                    </td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            </div>
            <div className='grid mt-10 justify-center py-4 px-6 text-[#1a1a2d] gap-2 bg-white'>
                <h3 className='text-lg font-bold text-center uppercase'>
                    Verified Vendors
                </h3>
                <p className=' text-center p-4 text-sm rounded font-semibold'>
                    This is a list of our Verified and vetted vendors. Please don't hesitate to report anyone else that contacts you as a vendor.
                </p>
            </div>
        </div>
    )
}

export default vendors
