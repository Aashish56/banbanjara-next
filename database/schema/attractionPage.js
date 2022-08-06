import { Schema, model, models, mongoose } from 'mongoose';

const attractionSchema = new Schema({
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
    title: {
        type: String,
    },
    coverImage: {
        type: String,
    },
    isDisable: {
        type: String
    },
    attractionCards: [{
        title: String,
        description: String,
        image: String
    }],
    promontionSideBar: [{
        image: String,
        redirectionUrl: String
    }],
    promotionBar: [{
        image: String,
        redirectionUrl: String
    }],
    faq: [{
        order: String,
        question: String,
        answer: String,
        default: []
    }],
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
    collection: 'attractionPage'
});

const attraction = models.attractionPage || model('attractionPage', attractionSchema);

export default attraction;