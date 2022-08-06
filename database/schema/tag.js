import { Schema, model, models, mongoose } from 'mongoose';

const singleSubTagSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    displayOrder: {
        type: Number,
        required: true
    },
})



let tagSchema = new Schema({
    parentTagTitle: {
        type: String,
        required: true,
    },
    parentTagDisplayOrder: {
        type: Number
    },
    subTags: [singleSubTagSchema]

}, {
    timestamps: {
        createdAt: "created",
        updatedAt: "updated",
    },
    id: false,
    toJSON: {
        getters: true,
        virtuals: true,
    },
    toObject: {
        getters: true,
        virtuals: true,
    },
}, {
    collection: "tag",
});

const tag = models.tag || model('tag', tagSchema);

export default tag;