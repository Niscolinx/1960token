import { Schema, models, model } from "mongoose"


const pendingWithdrawal = new Schema(
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
        currency: {
            type: String,
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

export default models.pendingWithdrawal ||
    model('pendingWithdrawal', pendingWithdrawal)

