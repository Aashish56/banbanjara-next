
import { Schema, model, models, mongoose } from 'mongoose';
const { nanoid } = require('nanoid');


const customerSchema = new Schema({
    firstName: {
        type: String,
        required: true,
        trim: true
    },
    lastName: {
        type: String,
        trim: true
    },
    dateOfBirth: {
        type: Date
    },
    isMarried: {
        type: Boolean
    },
    dateOfAnniversary: {
        type: Date
    },
    aadharNumber: {
        type: String,
        trim: true
    },
    gender: {
        type: String
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
    alternativeMobile: {
        type: String,
        trim: true
    },
    isMobileVerified: {
        type: Boolean,
        default: false
    },
    accountno: {
        type: String,
        required: true,
        default: () => nanoid(10)
    },
    profileImage: {
        type: Array
    },
    // aadharFrontImage: {
    //     type: Array
    // },
    // aadharBackImage: {
    //     type: Array
    // },
    isEmailVerified: {
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
        type: Boolean,
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
    // address: {
    //     type: String,
    // },
    // emergencyName: {
    //     type: String,
    //     trim: true
    // },
    // emergencyContact: {
    //     type: Number,
    //     trim: true
    // },
    // emergencyRelation: {
    //     type: String,
    //     trim: true
    // }
}, {
    timestamps: {
        createdAt: 'customerCreationDate',
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
    collection: 'customer'
}
);

const customer = models.customer || model('customer', customerSchema);

export default customer;