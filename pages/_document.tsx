import { useTheme } from 'next-themes'
import { Html, Head, Main, NextScript } from 'next/document'
import { useState, useEffect } from 'react'

const { theme } = useTheme()
const [htmlStyle, setHtmlStyle] = useState<{}>()
export default function Document() {

   
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
