import { Schema, Types, model, models } from 'mongoose'

export interface IUser {
    _id: Object
    username: string
    email: string
    phoneNumber: string
    isMining: boolean
    miningStartedAt: string
    role: string
    totalMined: number
    portfolio: number
    status: string
    password: string
    pendingWithdrawals: Types.ObjectId[]
    pendingDeposits: Types.ObjectId[]
    totalWithdrawals: Types.ObjectId[]
    totalDeposits: Types.ObjectId[]
}

const userSchema = new Schema<IUser>(
    {
        username: {
            type: String,
            required: true,
        },

        email: {
            type: String,
            required: true,
        },
        password: {
            type: String,
            required: true,
        },
        phoneNumber: {
            type: String,
            required: true,
        },
        totalMined: {
            type: Number,
            default: 0.0
        },
        portfolio: {
            type: Number,
            default: 0
        },
        role: {
            type: String,
            default: 'Customer',
            required: true,
        },
        isMining: {
            type: Boolean,
            default: false,
        },
        miningStartedAt: {
            type: String,
        },
        status: {
            type: String,
            required: true,
            default: 'Active',
        },
        pendingDeposits: [
            {
                type: Schema.Types.ObjectId,
                ref: 'pendingDeposit',
            },
        ],
        pendingWithdrawals: [
            {
                type: Schema.Types.ObjectId,
                ref: 'pendingWithdrawal',
            },
        ],
        totalDeposits: [
            {
                type: Schema.Types.ObjectId,
                ref: 'deposit',
            },
        ],
        totalWithdrawals: [
            {
                type: Schema.Types.ObjectId,
                ref: 'withdraw',
            },
        ],
    },
    { timestamps: true }
)

export default models.user || model('user', userSchema)
