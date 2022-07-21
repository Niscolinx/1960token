import { Schema, models, model } from "mongoose"

const transaction = new Schema(
    {
        amount: {
            type: Number,
            required: true,
        },
        status: {
            type: String,
            required: true,
        },
        type: {
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

export default models.transaction ||
    model('transaction', transaction)
