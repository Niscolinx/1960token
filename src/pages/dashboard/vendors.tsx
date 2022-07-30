import React from 'react'
import { BsFillSunFill } from 'react-icons/bs'
import { RiWhatsappFill } from 'react-icons/ri'
import Link from 'next/link'

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
                    <caption className='font-semibold text-lg py-5'>
                        Vendors
                    </caption>
                    <colgroup>
                        <col className='min-w-15' />
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
                                        <div className='div flex items-center text-2xl'>
                                            <BsFillSunFill className='text-orange-300 flex self-center' />{' '}
                                            <p className=' capitalize'>
                                                {value.name}
                                            </p>
                                        </div>
                                    </td>
                                    <td>
                                        <Link
                                            href={`https://wa.me/${value.contact}`}
                                            target='_blank'
                                        >
                                            <RiWhatsappFill className='text-[#25D366] text-2xl' />
                                        </Link>
                                    </td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default vendors
