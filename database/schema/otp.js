
import { Schema, model, models, mongoose } from 'mongoose';

const otpSchema = new Schema({
    mobile: {
        type: Number,
        required: true
    },
    otp: {
        type: Number,
        required: true
    },
    isExpired: {
        type: Boolean,
        default: false
    }
}, {
    timestamps: {
        createdAt: 'created',
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
    collection: 'otp'
}
);

const otp = models.otp || model('otp', otpSchema);

export default otp;