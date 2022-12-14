
import { Schema, model, models, mongoose } from 'mongoose';

const addressSchema = new Schema({
    address: {
        type: String,
        required: true,
        trim: true
    },
    city: {
        type: String,
        required: true,
        trim: true
    },
    state: {
        type: String
    },
    pinCode: {
        type: Number,
        required: true,
        trim: true
    },
    mobile: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        trim: true
    },
    timming: {
        type: String,
        required: true,
        trim: true
    },
    date: {
        type: Date,
        default: () => Date.now()
    },
    active: {
        type: Boolean,
        default: true
    }
}, {
    timestamps: {
        createdAt: 'createdAt',
        updatedAt: 'updatedAt'
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
    collection: 'address'
}
);

const addresses = models.address || model('address', addressSchema);

export default addresses;