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
       
        referral: {
            type: Schema.Types.ObjectId,
            ref: 'users',
            required: true,
        },
    },
    { timestamps: true }
)

export default models.userReferral || model('userReferral', userReferral)

