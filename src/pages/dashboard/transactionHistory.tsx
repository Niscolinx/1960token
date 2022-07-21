import react from 'react'

const generateData = (): Props => {
    const date = new Date().toLocaleString('en-GB', {
        month: 'short',
        day: '2-digit',
        year: 'numeric',
    })
    let filledArray = Array.from({ length: 40 }, () => ({
        date,
        type: Math.random() < 0.5 ? 'Transfer' : 'Withdrawn',
        amount: Math.floor(Math.random() * (300 - 10 + 1) + 10),
        status: Math.random() < 0.5 ? 'Approved' : 'Pending'
    }))

    return filledArray
}

type TransactionData = {
    date: string
    type: string
    amount: number
    status: string
}

type Props = TransactionData[]

const transactionHistory = () => {
    const result = generateData()

    

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
