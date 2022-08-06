import { Schema, model, models, mongoose } from 'mongoose';

let offersSchema = new Schema({
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
        default: ''
    },
    offerType: {
        label: String,
        value: String
    },
    productId: {
        type: String,
        default: '',
    },
    couponCode: {
        type: String,
        default: ''
    },
    usageLimit: {
        type: String,
        default: ''
    },
    userId: {
        type: String,
        default: '',
    },
    discountType: {
        type: String,
        default: ''
    },
    discount: {
        type: String,
        default: ''
    },
    validity: {
        type: String,
        default: ''
    },
    validityStartDate: {
        type: String,
        default: ''
    },
    validityEndDate: {
        type: String,
        default: ''
    },
    image: {
        type: String,
        default: '',
    },
    description: {
        type: String
    },
    isDisable: {
        type: Boolean,
        default: false,
    }
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
    collection: "offers",
});

const offers = models.offers || model('offers', offersSchema);

export default offers;