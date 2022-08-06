import { Schema, model, models, mongoose } from 'mongoose';

const propertySchema = new Schema({
    iAm: {
        type: String,
        required: true,
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        required: true,
    },
    name: {
        type: String,
        trim: true
    },
    propertyCode: {
        type: String,
        trim: true
    },
    propertTag: {
        type: String
    },
    for: {
        type: String
    },
    pType: {
        type: String
    },
    postingAs: {
        type: String
    },
    pCity: {
        type: String
    },
    nameOfProject: {
        type: String
    },
    locality: {
        type: String
    },
    propertyDetails: {
        type: Array
    },
    landZone: {
        type: String
    },
    idealForBusinesses: {
        type: String
    },
    status: {
        type: Number,
        default: 0
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
    collection: 'property'
}
);

const property = models.property || model('property', propertySchema);

export default property;