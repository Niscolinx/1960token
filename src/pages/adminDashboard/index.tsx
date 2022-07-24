// import axios from 'axios'
// import { GetServerSidePropsContext } from 'next'
// import React, { useState } from 'react'
// import CopyToClipboard from 'react-copy-to-clipboard'

import React, { useState, Fragment } from 'react'

// function index() {
//     const [generatedCode, setGeneratedCode] = useState('')
//     const [loading, setLoading] = useState(false)

//     //generate random numbers mixed with letters of length 6
//     const randomString = () => {
//         const possible =
//             'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
//         let randomString = ''
//         for (let i = 0; i < 6; i++) {
//             randomString += possible.charAt(
//                 Math.floor(Math.random() * possible.length)
//             )
//         }
//         return randomString
//     }

//     const handleRandom = () => {
//         setLoading(true)
//         const random = randomString()

//         //send api to the server with the generated code using axios
//         axios
//             .post('/api/storeGeneratedCode', {
//                 code: random,
//             })
//             .then(({ data }) => {
//                 setGeneratedCode(data.code)
//                 setLoading(false)
//             })
//             .catch((err) => {
//                 setLoading(false)
//             })
//     }

//     return (
//         <div className='h-[100vh] py-5 px-8'>
//             <h1 className='text-lg font-bold'>Welcome Admin</h1>
//             <div className='grid mt-5'>
//                 <div className='grid gap-2'>
//                     {generatedCode.length > 0 ? (
//                         <>
//                             <div className=' text-white font-bold py-4 px-4 rounded flex justify-between items-center font-semibold border border-gray-300'>
//                                 <p className='bg-orange-500 hover:bg-orange-700 rounded-lg py-1 px-3'>
//                                     {generatedCode}
//                                 </p>
//                                 <CopyToClipboard text={generatedCode}>
//                                     <button className='bg-green-500 rounded-lg py-1 px-3  justify-self-center place-self-end'>
//                                         Copy Code
//                                     </button>
//                                 </CopyToClipboard>{' '}
//                             </div>
//                         </>
//                     ) : null}

//                     <button
//                         className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded justify-self-center'
//                         onClick={handleRandom}
//                     >
//                         {loading ? 'Generating...' : 'Generate Code'}
//                     </button>
//                 </div>
//             </div>
//         </div>
//     )
// }

// export default index

// export async function getServerSideProps(context: GetServerSidePropsContext) {
//     const token = context.req.cookies.adminToken
//     if (!token) {
//         return {
//             redirect: {
//                 destination: '/auth/login',
//                 permanent: false,
//             },
//         }
//     }
//     return {
//         props: {
//             isAuthenticated: true,
//         },
//     }
// }

// Implement a feature to allow item selection with the following requirements:
// 1. Clicking an item selects/unselects it.
// 2. Multiple items can be selected at a time.
// 3. Make sure to avoid unnecessary re-renders of each list item in the big list (performance).
// 4. Currently selected items should be visually highlighted.
// 5. Currently selected items' names should be shown at the top of the page.
//
// Feel free to change the component structure at will.

const List = () => {
    const sizes = ['tiny', 'small', 'medium', 'large', 'huge']
    const colors = [
        'navy',
        'blue',
        'aqua',
        'teal',
        'olive',
        'green',
        'lime',
        'yellow',
        'orange',
        'red',
        'maroon',
        'fuchsia',
        'purple',
        'silver',
        'gray',
        'black',
    ]
    const fruits = [
        'apple',
        'banana',
        'watermelon',
        'orange',
        'peach',
        'tangerine',
        'pear',
        'kiwi',
        'mango',
        'pineapple',
    ]

    const items = sizes.reduce(
        (items: any, size: any) => [
            ...items,
            ...fruits.reduce(
                (acc: any, fruit) => [
                    ...acc,
                    ...colors.reduce(
                        (acc: any, color) => [
                            ...acc,
                            {
                                name: `${size} ${color} ${fruit}`,
                                color,
                            },
                        ],
                        []
                    ),
                ],
                []
            ),
        ],
        []
    )
    type SelectedItem = {
        name: string
        color: string
    }

    const [selectedItems, setSelectedItems] = useState<SelectedItem[]>([])
    //const [selectedItemStyle, setSelectedItemStyle] = useState<boolean>(false)

    const selectItem = (
        e: any,
        i: number
    ) => {
      e.target.style.opacity = .2
    }



    console.log('inside', selectedItems)
    return (
        <Fragment>
            <div>
                {selectedItems.length > 0 && (
                    <div className='List-selectedItems'>
                        <ul className='List '>
                            {selectedItems.map((item) => (
                                <li
                                    key={item.name}
                                    className={`List__item List__item--${item.color}`}
                                >
                                    {item.name}
                                </li>
                            ))}
                        </ul>
                    </div>
                )}
            </div>
            <ul className='List'>
                {items.map((item, i) => (
                    <li
                        key={item.name}
                        className={`List__item List__item--${item.color}`}
                        
                        onClick={(e) => selectItem(e, i)}
                    >
                        {item.name}
                    </li>
                ))}
            </ul>
        </Fragment>
    )
}

export default List
