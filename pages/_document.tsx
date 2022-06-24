import { useTheme } from 'next-themes'
import { Html, Head, Main, NextScript } from 'next/document'
import { useState, useEffect } from 'react'

export default function Document() {
    const { theme } = useTheme()
    const [htmlStyle, setHtmlStyle] = useState<{}>()

    useEffect(() => {
        if (theme === 'dark') {
            console.log('dark theme', { theme })

            setHtmlStyle({
                background: `#1a1a2d`,
                borderRadius: '50px',
            })
        } else {
            console.log('light theme', { theme })
            setHtmlStyle({
                background: `linear-gradient(145deg, #dadadf, #b8b8bb)`,
                boxShadow: `7px 7px 14px #a5a5a8,
             -7px -7px 14px #f3f3f8`,
                borderRadius: '50px',
                color: '#1a1a2d',
            })
        }
    }, [theme])
    return (
        <Html style={{background: 'red !important'}}>
            <Head />
            <title>1960token</title>
            <body>
                <Main />
                <NextScript />
            </body>
        </Html>
    )
}
