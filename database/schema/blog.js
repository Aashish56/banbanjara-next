import { Schema, model, models, mongoose } from 'mongoose';

const blogSchema = new Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    blogImage: {
        type: {}
    },
    shortDescription: {
        type: String,
        // required: true,
        trim: true
    },
    description: {
        type: String,
        required: true,
        trim: true
    },
    date: {
        type: Date,
        default: () => Date.now()
    },
    metaTitle: {
        type: String
    },
    metaKeywords: {
        type: String
    },
    metaDescription: {
        type: String
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
    collection: 'blog'
}
);

const blog = models.blog || model('blog', blogSchema);

export default blog;