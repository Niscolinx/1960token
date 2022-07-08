import axios from 'axios'
import React, {useEffect, useState} from 'react'

function trade() {

    useEffect(() => {
         axios.get('https://s3.tradingview.com/tv.js').then(data => console.log({data})).catch(err => console.log(err))
    }, [])

    return <div className='h-[90vh]'>Trade</div>
}

export default trade
