import axios from 'axios'
import React, { useEffect, useState } from 'react'
import Script from 'next/script'
import TradingViewWidget, { Themes } from 'react-tradingview-widget'


function trade() {

    useEffect(() => {
        Array.from(document.getElementsByTagName('iframe')).forEach(
            (iframe) => {
                iframe.contentWindow.addEventListener(
                    'load',
                    () => {
                        const doc = iframe.contentWindow.document
                        iframe.height = doc.body.scrollHeight
                    },
                    true
                )
                iframe.contentWindow.addEventListener(
                    'resize',
                    () => {
                        iframe.height =
                            iframe.contentWindow.document.body.scrollHeight + 40
                    },
                    true
                )
            }
        )
    }, [])

    return (
        <div className='h-[90vh]'>
            <iframe src='/tradingView.html' width='100%'></iframe>
            Trade
        </div>
    )
}

export default trade
