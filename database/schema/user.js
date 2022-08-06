
import { Schema, model, models, mongoose } from 'mongoose';
const { nanoid } = require('nanoid');

const userSchema = new Schema({
    firstName: {
        type: String,
        required: true,
        trim: true
    },
    lastName: {
        type: String,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true
    },
    password: {
        type: String,
        required: true
    },
    mobile: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    accountno: {
        type: String,
        required: true,
        default: () => nanoid(10)
    },
    userRole: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'userRole',
        default: null
    },
    image: {
        type: Array
    },
    verified: {
        type: Boolean,
        default: false
    },
    verificationToken: {
        type: String
    },
    verificationDate: {
        type: Date
    },
    forgetPasswordToken: {
        type: String
    },
    active: {
        type: Number,
        default: true
    },
    lastLoginTime: {
        type: Date
    },
    country: {
        type: String,
    },
    state: {
        type: String
    },
    city: {
        type: String
    },
    address: {
        type: String,
    }
}, {
    timestamps: {
        createdAt: 'userCreationDate',
        updatedAt: 'updated'
    },
    id: false,
    toJSON: {
        getters: true,
        virtuals: true
    },
    toObject: {
        getters: true,
        virtuals: true
    }
}, {
    collection: 'user'
}
);

const user = models.user || model('user', userSchema);

export default user;