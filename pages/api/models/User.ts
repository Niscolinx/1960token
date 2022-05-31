import { Schema } from 'mongoose'

interface IUser {
    username: string;
    email: string;
    role: string;
    status: string;
    password: string;
    pendingWithdrawals: object[];
    pendingDeposits: object[];
    totalWithdrawals: object[];
    totalDeposits: object[];
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

        role: {
            type: String,
            default: 'Customer',
            required: true,
        },

        status: {
            type: String,
            required: true,
            default: 'Active',
        },

        password: {
            type: String,
            required: true,
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

module.exports = mongoose.model('users', userSchema)
