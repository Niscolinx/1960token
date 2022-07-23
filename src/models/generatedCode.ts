import { Schema, models, model } from "mongoose"

const generatedCode = new Schema(
    {
        code: {
            type: String,
            required: true,
        },
        isUsed: {
            type: Boolean,
            required: true,
            default: false,
        }
    },
    { timestamps: true }
)

export default models.generatedCode ||
    model('generatedCode', generatedCode)
