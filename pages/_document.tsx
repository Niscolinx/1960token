import { useTheme } from 'next-themes'
import { Html, Head, Main, NextScript } from 'next/document'
import { useState, useEffect } from 'react'

export default function Document() {
    const { theme } = useTheme()
    const [htmlStyle, setHtmlStyle] = useState<{}>()

    useEffect(() => {
        if (theme === 'dark') {

            setHtmlStyle({
                background: '#1a1a2d !important',
            })
        } else {
           setHtmlStyle({
               background: '#ccccd0 !important',
           })
        }
    }, [theme])
    return (
        <Html style={htmlStyle}>
            <Head />
            <title>1960token</title>
            <body>
                <Main />
                <NextScript />
            </body>
        </Html>
    )
}
