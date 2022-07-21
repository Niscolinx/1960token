import react from 'react'

const data = [{ date: Date.now() }]

const transactionHistory = () => {
    let filledArray = new Array(10)
    for (let i = 0; i < filledArray.length; i++) {
        filledArray[i] = { hello: 'goodbye' }
    }
    //let filledArray = new Array(10).fill(null).map(() => ({ hello: 'goodbye' }))

    filledArray[5].hello = 'bye'

    console.log({ filledArray })
    return (
        <>
            {filledArray.map((value) => {
                return <p>{value.hello}</p>
            })}
        </>
    )
}

export default transactionHistory
