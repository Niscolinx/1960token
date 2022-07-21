import { Schema, models, model } from "mongoose"

const withdrawal = new Schema(
    {
        amount: {
            type: Number,
            required: true,
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

export default models.withdrawal ||
    model('withdrawal', withdrawal)
