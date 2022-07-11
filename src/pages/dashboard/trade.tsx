import React, { useEffect, useState } from 'react'
import {useRouter} from 'next/router'

function trade() {
    const router = useRouter()
    useEffect(() => {

    })
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
                        iframe.height =
                            iframe.contentWindow!.document.body.scrollHeight.toString()
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
                    src={`/tradingView.html`}
                    width='100%'
                    style={{ height: '70vh' }}
                />
            </div>
        </div>
    )
}

export default trade
