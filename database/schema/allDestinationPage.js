import { Schema, model, models, mongoose } from 'mongoose';

const allDestinationSchema = new Schema({
    country: { type: String },
    state: { type: String },
    city: { type: String },
    title: {
        type: String,
    },
    coverImage: {
        type: String,
    },
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
    collection: 'allDestinationPage'
});

const allDestination = models.allDestinationPage || model('allDestinationPage', allDestinationSchema);

export default allDestination;

