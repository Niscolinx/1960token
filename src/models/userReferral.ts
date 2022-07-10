import Mongoose from './utils'

const { Schema, model, models } = Mongoose

const userReferral = new Schema(
    {
        username: {
            type: Number,
            required: true,
        },
        level: {
            type: Number,
            required: true
        },
       
   
    },
    { timestamps: true }
)

export default models.user || model('userReferral', userReferral)

