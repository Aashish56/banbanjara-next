import { Schema, model, models, mongoose } from 'mongoose';

const stateSchema = new Schema({
    countryId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'country',
        default: null
    },
    name: {
        type: String,
        required: true,
        trim: true
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
    collection: 'state'
}
);

const state = models.state || model('state', stateSchema);

export default state;