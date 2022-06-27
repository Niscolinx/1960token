import { Schema, Types, model, models } from 'mongoose'

export interface IUser {
    _id: Object;
    username: string
    email: string
    phoneNumber: string
    isMining: boolean
    miningStart: string
    miningSession: string
    role: string
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
            required: true
        },

        email: {
            type: String,
            required: true
        },
        phoneNumber: {
            type: String,
            required: true
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
        miningStart: {
            type: String,
        },
        status: {
            type: String,
            required: true,
            default: 'Active',
        },

        password: {
            type: String,
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

export default models.User || model('User', userSchema)


