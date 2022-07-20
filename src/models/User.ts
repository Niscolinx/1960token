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
    referralBonus: number
    tokensMined: number
    videoMined:number
    portfolio: number
    upliner: string
    status: string
    password: string
    referrals: any[]
    referralLink: string
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
        upliner: {
            type: String,
        },
        referralBonus: {
            type: Number,
            default: 0
        },
        tokensMined: {
            type: Number,
            default: 0
        },
        videoMined: {
            type: Number,
            default: 0
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
                username: String,
                level: Number
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
