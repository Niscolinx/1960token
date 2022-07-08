import axios from 'axios'
import React, {useEffect, useState} from 'react'
import Script from 'next/script'

function trade() {
    const [tradingView, setTradingView] = useState()
    useEffect(() => {
         axios.get('https://s3.tradingview.com/tv.js').then(({data}) => setTradingView(data)).catch(err => console.log(err))
    }, [])


    useEffect(() => {
        console.log({tradingView})
    }, [tradingView])
    

    return (
        <div className='h-[90vh]'>
            <Script
                src='https://s3.tradingview.com/tv.js'
            ></Script>
            Trade
        </div>
    )
}

export default trade
