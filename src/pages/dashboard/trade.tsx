import axios from 'axios'
import React, {useEffect, useState} from 'react'

function trade() {

    useEffect(async() => {
        const res = await axios.get('https://s3.tradingview.com/tv.js')
        return res
    }, [])

    return <div className='h-[90vh]'>Trade</div>
}

export default trade
