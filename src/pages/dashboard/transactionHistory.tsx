import react from 'react'

const data = { date: Date.now(), type: Math.random() < 0.5 ? 'Transfer' : 'Withdrawn', amount: Math.floor(Math.random() * (300 - 10 + 1) + 10) }

let filledArray = new Array(10)
for (let i = 0; i < filledArray.length; i++) {
    filledArray[i] = data
}

type HistoryData = {
    date: Date,
    type: string,
    amount: number
}

type Props = {
    result: HistoryData[]
}

const result = filledArray

const transactionHistory = ({result}: Props) => {
    //let filledArray = new Array(10).fill(null).map(() => ({ hello: 'goodbye' }))


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
