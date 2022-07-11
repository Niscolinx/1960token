import React, { useEffect, useState } from 'react'

function trade() {
    useEffect(() => {
        Array.from(document.getElementsByTagName('iframe')).forEach(
            (iframe) => {
                console.log({ iframe })
                if (iframe.contentWindow)
                    iframe.contentWindow.addEventListener(
                        'load',
                        () => {
                            if (iframe.contentWindow?.document) {
                                const doc = iframe.contentWindow.document
                                iframe.height = doc.body.scrollHeight.toString()
                            }
                        },
                        true
                    )
                if (iframe.contentWindow)
                    iframe.contentWindow.addEventListener(
                        'resize',
                        () => {
                            if (iframe.contentWindow)
                                iframe.height =
                                    iframe.contentWindow.document.body.scrollHeight.toString()
                        },
                        true
                    )
            }
        )
    }, [])

    return (
        <div className='h-[90vh]'>
            <div className='grid mt-4'>
                <iframe
                    src='/tradingView.html'
                    width='100%'
                    style={{ height: '70vh' }}
                />
            </div>
        </div>
    )
}

export default trade
