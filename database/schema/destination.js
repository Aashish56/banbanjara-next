import { Schema, model, models, mongoose } from 'mongoose';

const tourCardSchema = new Schema({
    title: {
        type: String
    },
    price: {
        type: String
    },
    image: {
        type: String
    },
    location: String
});

const faqSchema = new Schema({
    question: String,
    answer: String
});

const pormotionalSidebarSchema = new Schema({
    image: String,
    link: String
});

const exploreNearbySchema = new Schema({
    title: String,
    image: String
});

const reviewSchema = new Schema({
    rating: Number,
    comment: String
});

const weatherSchema = new Schema({
    month: String,
    max: String,
    min: String
});

const generalInfoSchema = new Schema({
    title: String,
    type: String,
    value: String
});

const schema = new Schema({
    cover: { // Image
        type: String
    },
    title: {
        type: String,
        required: true,
    },
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
    featuredTag: [{
        type: mongoose.Schema.ObjectId,
        ref: 'featuredTag'
    }],
    overview: {
        type: String,
        required: true
    },
    stateCode: {
        type: String
    },
    isDisable: {
        type: Boolean,
        default: false
    },
    tourCards1Title: String,
    tourCards2Title: String,
    tourCards1: [{
        type: mongoose.Schema.ObjectId,
        ref: 'tours'
    }],
    tourCards2: [{
        type: mongoose.Schema.ObjectId,
        ref: 'tours'
    }],
    pormotionalSidebar: [pormotionalSidebarSchema],
    exploreNearby: [exploreNearbySchema],
    pormotionalBar: [pormotionalSidebarSchema],
    reviews: [reviewSchema],
    howToGo: String,
    localWeather: [weatherSchema],
    generalInfo: [generalInfoSchema],
    faq: [faqSchema]
}, {
    timestamps: true
}, {
    collection: 'destination'
});

const tourCard = models.tourCard || model('tourCard', tourCardSchema);

export default tourCard;