import { Schema, model, models, mongoose } from 'mongoose';

const pImageSchema = new Schema({
    propertyId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'property',
        default: null
    },
    mainImage: {
        type: Array
    },
    exteriorView: {
        type: Array
    },
    livingRoom: {
        type: Array
    },
    badrooms: {
        type: Array
    },
    bathrooms: {
        type: Array
    },
    kitchen: {
        type: Array
    },
    floorPlan: {
        type: Array
    },
    masterPlan: {
        type: Array
    },
    other: {
        type: Array
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
    collection: 'pImage'
}
);

const pImage = models.pImage || model('pImage', pImageSchema);

export default pImage;