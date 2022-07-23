import { Schema, models, model } from "mongoose"

const generatedCode = new Schema(
    {
        code: {
            type: Number,
            required: true,
        }
    },
    { timestamps: true }
)

export default models.generatedCode ||
    model('generatedCode', generatedCode)
