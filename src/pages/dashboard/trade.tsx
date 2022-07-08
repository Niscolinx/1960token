import axios from 'axios'
import React, { useEffect, useState } from 'react'
import Script from 'next/script'
import TradingViewWidget, { Themes } from 'react-tradingview-widget'


function trade() {
    const [tradingView, setTradingView] = useState({})

    // useEffect(() => {
    //      axios.get('https://s3.tradingview.com/tv.js').then(({data}) => setTradingView(data)).catch(err => console.log(err))
    // }, [])

    console.log('window', tradingView)

    return (
        <div className='h-[90vh]'>
            <iframe src='/tradingView.html' width='100%'></iframe>
            Trade
        </div>
    )
}

export default trade
