import Mongoose from './utils'

const { Schema, model, models } = Mongoose
export interface IUser {
    _id: Object
    username: string
    email: string
    phoneNumber: string
    isMining: boolean
    miningStartedAt: string
    role: string
    referralBonus: number
    tokensMined: number
    videoMined: number
    portfolio: number
    upliner: string
    status: string
    password: string
    referrals: any[]
    referralLink: string
    usdtAddress: string
    pendingWithdrawals: any[]
    approvedWithdrawals: any[]
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
        upliner: {
            type: String,
        },
        referralBonus: {
            type: Number,
            default: 0,
        },
        tokensMined: {
            type: Number,
            default: 0,
        },
        videoMined: {
            type: Number,
            default: 0,
        },

        portfolio: {
            type: Number,
            default: 0,
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
        referralLink: {
            type: String,
        },
        usdtAddress: {
            type: String,
        },
        referrals: [
            {
                username: String,
                level: Number,
            },
        ],
        approvedWithdrawals: [
            {
                type: Schema.Types.ObjectId,
                ref: 'approvedWithdrawal',
            },
        ],
        pendingWithdrawals: [
            {
                type: Schema.Types.ObjectId,
                ref: 'pendingWithdrawal',
            },
        ]
    },
    { timestamps: true }
)

export default models.user || model('user', userSchema)
