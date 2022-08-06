import { Schema, model, models, mongoose } from 'mongoose';

const reviewSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true
    },
    file: {
        type: String
    },
    type: {
        type: String
    },
    cards: [{
        redirectionUrl: {
            type: String,
            required: true,
        },
        icon: {
            type: String,
            required: true,
        },
        title: {
            type: String,
            required: true,
        },
        order: {
            type: String,
            required: true,
        }
    }]
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
    collection: 'review'
});

const review = models.review || model('review', reviewSchema);

export default review;