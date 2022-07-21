import react from 'react'

let filledArray = new Array(10)
for (let i = 0; i < filledArray.length; i++) {
    const date = new Date().toLocaleString('en-GB', {month: 'short', day: '2-digit', year: 'numeric'})
    filledArray[i] = {
        date,
        type: Math.random() < 0.5 ? 'Transfer' : 'Withdrawn',
        amount: Math.floor(Math.random() * (300 - 10 + 1) + 10),
    }
}

type HistoryData = {
    date: Date
    type: string
    amount: number
}

type Props = {
    result: HistoryData[]
}

const result = filledArray

console.log({ result })

const transactionHistory = ({ result }: Props) => {
    return (
        <>
            {result.map((value) => {
                return (
                    <>
                        <p>{value.date.toLocaleString()}</p>
                        <p>{value.type}</p>
                        <p>{value.amount}</p>
                    </>
                )
            })}
        </>
    )
}

export default transactionHistory
