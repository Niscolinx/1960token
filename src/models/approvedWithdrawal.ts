import Mongoose from './utils'

const { Schema, model, models } = Mongoose

const approvedWithdrawal = new Schema(
    {
        amount: {
            type: Number,
            required: true,
        },
       
        status: {
            type: String,
            required: true,
            default: 'Pending',
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

