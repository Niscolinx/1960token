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
        <div className='flex flex-wrap'>
            {result.map((value, i) => {
                return (
                    <div key={i} className='flex'>
                        <p>{value.date}</p>
                        <p>{value.type}</p>
                        <p>{value.amount}</p>
                    </div>
                )
            })}
        </div>
    )
}

export default transactionHistory
