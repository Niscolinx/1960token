import React, { useEffect, useState } from 'react'

function trade() {
    useEffect(() => {
        Array.from(document.getElementsByTagName('iframe')).forEach(
            (iframe) => {
                iframe.contentWindow!.addEventListener(
                    'load',
                    () => {
                        const doc = iframe.contentWindow!.document
                        iframe.height = doc.body.scrollHeight.toString()
                    },
                    true
                )
                iframe.contentWindow!.addEventListener(
                    'resize',
                    () => {
                        iframe.height = (
                            iframe.contentWindow!.document.body.scrollHeight
                        ).toString()
                    },
                    true
                )
            }
        )
    }, [])

    return (
        <div className='h-[90vh]'>

            <iframe src='/tradingView.html' width='100%' style={{height: '60vh'}}/>
        </div>
    )
}

export default trade
