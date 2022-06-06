const dev = process.env.NODE_ENV === 'production'

export const serverUrl = dev ? 'https://www.1960token.com' : 'http://localhost:3000'