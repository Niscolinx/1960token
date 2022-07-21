import Mongoose from './utils'

const { Schema, model, models } = Mongoose

const approvedWithdrawal = new Schema(
    {
        amount: {
            type: Number,
            required: true,
        },
        planName: {
            type: String,
            required: true,
        },
        status: {
            type: String,
            required: true,
            default: 'Pending',
        },
        currency: {
            type: String,
        },
        creator: {
            type: Schema.Types.ObjectId,
            ref: 'users',
            required: true,
        },
    },
    { timestamps: true }
)

export default models.approvedWithdrawal || model('approvedWithdrawal', approvedWithdrawal)

