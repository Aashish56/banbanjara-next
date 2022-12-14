import { Schema, model, models, mongoose } from 'mongoose';
const { nanoid } = require('nanoid');


const reqCallbackSchema = new Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        trim: true
    },
    phone: {
        type: Number,
        required: true
    },
    message: {
        type: String,
        required: true,
        trim: true
    },
    propertyId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'property',
        default: null
    },
    isVisit: {
        type: Boolean,
        required: true
    },
    status: {
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
    collection: 'reqCallback'
}
);

const reqCallback = models.reqCallback || model('reqCallback', reqCallbackSchema);

export default reqCallback;
