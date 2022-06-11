import { Connection } from 'mongoose'

declare module '*.svg' {
    const content:any
    export default content
}


declare module NodeJS {
    interface Global {
        mongoose: Connection
        _mongoClientPromise: Connection
    }
}
