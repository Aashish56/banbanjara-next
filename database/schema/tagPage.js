import { Schema, model, models, mongoose } from 'mongoose';

let tagPageSchema = new Schema({
    country: {
        currency: String,
        flag: String,
        isoCode: String,
        label: String,
        latitude: String,
        longitude: String,
        name: String,
        phonecode: String
    },
    state: {
        countryCode: String,
        isoCode: String,
        label: String,
        latitude: String,
        longitude: String,
        name: String,
        value: String,
    },
    city: {
        countryCode: String,
        label: String,
        latitude: String,
        longitude: String,
        name: String,
        stateCode: String,
        value: String
    },
    title: String,
    category: {
        value: String,
        label: String
    },
    tours: Array,
    promotionalBar: Array,
    tag: String,
    frontUrl: String,
    metaTitle: String,
    metaKeyword: String,
    metaDescription: String,
    image: String,
    cardImage: String,
    faq: {
        type: Array,
        default: []
    },
    description: String,
    isDisable: {
        type: Boolean,
        default: false,
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
    collection: "tagPage",
});

const tagPage = models.tagPage || model('tagPage', tagPageSchema);

export default tagPage;