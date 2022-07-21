import react from 'react'

const generateData = ():Props => {

    let filledArray = new Array(10)
    for (let i = 0; i < filledArray.length; i++) {
        const date = new Date().toLocaleString('en-GB', {month: 'short', day: '2-digit', year: 'numeric'})
        filledArray[i] = {
            date,
            type: Math.random() < 0.5 ? 'Transfer' : 'Withdrawn',
            amount: Math.floor(Math.random() * (300 - 10 + 1) + 10),
        }
    }

    return filledArray
}

type TransactionData = {
    date: Date
    type: string
    amount: number
}

type Props =  TransactionData[]




const transactionHistory = () => {
    const result = generateData()

    return (
        <>
            {result.map((value, i) => {
                return (
                    <div key={i}>
                        <p>{value.date}</p>
                        <p>{value.type}</p>
                        <p>{value.amount}</p>
                    </div>
                )
            })}
        </>
    )
}

export default transactionHistory
