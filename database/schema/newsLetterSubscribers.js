import { Schema, model, models, mongoose } from 'mongoose';

let newsLetterSubscribersSchema = new Schema({
    email: {
        type: String,
        required: true
    },
    type: {
        type: String,
        required: true
    },
    status: {
        type: Boolean,
        required: true,
        default: true
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
},
    {
        collection: 'newsLetterSubscribers'
    }
);

const newsLetterSubscribers = models.newsLetterSubscribers || model('newsLetterSubscribers', newsLetterSubscribersSchema);

export default newsLetterSubscribers;
