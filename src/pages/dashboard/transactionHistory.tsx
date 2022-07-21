import axios from 'axios'
import { useEffect, useState } from 'react'



type TransactionData = {
    updatedAt: string
    type: string
    amount: number
    status: string
}

type Props = TransactionData[]

const transactionHistory = () => {
    const [email, setEmail] = useState('')
    const [transactionData, setTransactionData] = useState<Props>([])

    useEffect(() => {
        const userJSON = localStorage.getItem('userSession')

        if (userJSON) {
            const userData = JSON.parse(userJSON)

            const { email} = userData

            setEmail(email)
          
        }
    }, [])

    useEffect(() => {
        const user = {
            email
        }
        const fetch = async() => {
            const res = await axios.post('/api/transactions', {user})

            setTransactionData(res.data)
        }

        fetch()
    }, [email])

    console.log({transactionData})

    return (
        <div className=' overflow-scroll overflow-visible'>
            <table className='border border-gray-700 transaction-table mx-5 md:mx-auto'>
                <caption className='font-semibold text-lg py-5'>
                    Transaction History
                </caption>
                <colgroup>
                    <col className='w-40 min-w-30' span={5} />
                </colgroup>
                <thead>
                    <tr className='mb-10'>
                        <th rowSpan={4}>No</th>
                        <th>Date</th>
                        <th>Type</th>
                        <th>Amount</th>
                        <th>Status</th>
                    </tr>
                </thead>
                <tbody className='text-center'>
                    {result.map((value, i) => {
                        return (
                            <tr key={i} className='mx-4 py-2'>
                                <td>{i + 1}</td>
                                <td>{value.date}</td>
                                <td>{value.type}</td>
                                <td>{value.amount}</td>
                                <td>{value.status}</td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
        </div>
    )
}

export default transactionHistory
