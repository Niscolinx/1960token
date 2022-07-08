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
            <div className="grid h-52">

            <iframe src='/tradingView.html' width='100%' height={100}></iframe>
            </div>
        </div>
    )
}

export default trade
