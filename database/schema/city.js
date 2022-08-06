
import { Schema, model, models, mongoose } from 'mongoose';

const citySchema = new Schema({
    countryId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'country',
        default: null
    },
    stateId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'state',
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
    collection: 'city'
}
);

const city = models.city || model('city', citySchema);

export default city;