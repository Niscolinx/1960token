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
    }))

    return filledArray
}

type TransactionData = {
    date: string
    type: string
    amount: number
}

type Props = TransactionData[]

const transactionHistory = () => {
    const result = generateData()

    return (
        <div className='grid justify-center'>
            <table>
                <caption>Transaction History</caption>
                <colgroup style={{ background: 'green', display:"flex" }}>
                    <col style={{ width: '4rem' }} />
                    <col style={{ width: '4rem' }} />
                    <col style={{ width: '4rem' }} />
                    <col style={{ width: '4rem' }} />
                </colgroup>
                <thead>
                    <tr>
                        <th>No</th>
                        <th>Date</th>
                        <th>Type</th>
                        <th>Amount</th>
                    </tr>
                </thead>
                <tbody className=''>
                    {result.map((value, i) => {
                        return (
                            <tr key={i} className='mx-4 py-2'>
                                <td>{i}</td>
                                <td>{value.date}</td>
                                <td>{value.type}</td>
                                <td>{value.amount}</td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
        </div>
    )
}

export default transactionHistory
