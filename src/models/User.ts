import Mongoose from './utils'

const {Schema, model, models} = Mongoose
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
    referral: string
    status: string
    password: string
    referrals: any[]
    pendingWithdrawals: any[]
    pendingDeposits: any[]
    totalWithdrawals: any[]
    totalDeposits: any[]
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
        referral: {
            type: String,
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
        referrals: [
            {
                type: Schema.Types.ObjectId,
                ref: 'userReferrals'
            },
        ],
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
