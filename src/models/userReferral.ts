import Mongoose from './utils'

const { Schema } = Mongoose

const userReferral = new Schema(
    {
        username: {
            type: Number,
            required: true,
        },
       
        creator: {
            type: Schema.Types.ObjectId,
            ref: 'users',
            required: true,
        },
    },
    { timestamps: true }
)

module.exports = mongoose.model('userRerral', userReferral)
