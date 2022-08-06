import { Schema, model, models, mongoose } from 'mongoose';

let contactusSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    mobile: {
        type: String
    },
    subject: {
        type: String
    },
    message: {
        type: String
    },
    isResolved: {
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
    collection: 'contactus'
}
);

const contactus = models.contactus || model('contactus', contactusSchema);

export default contactus;