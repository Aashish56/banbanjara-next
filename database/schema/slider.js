import { Schema, model, models, mongoose } from 'mongoose';

let sliderSchema = new Schema({
    name: {
        type: String,
        default: ""
    },
    description: {
        type: String,
        default: ""
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
    image: {
        type: Array
    },
    isDisable: {
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
    collection: 'slider'
});

const slider = models.slider || model('slider', sliderSchema);

export default slider;
