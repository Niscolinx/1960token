import { Schema, models, model } from "mongoose"

const depositSchema = new Schema(
    {
        amount: {
            type: Number,
            required: true,
        },
        planName: {
            type: String,
            required: true,
        },
        profit: {
            type: Number,
            default: 0
        },
        creator: {
            type: Schema.Types.ObjectId,
            ref: 'users',
            required: true,
        },
    },
    { timestamps: true }
)

export default models.transaction ||
    model('transaction', transaction)
