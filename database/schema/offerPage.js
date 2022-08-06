import { Schema, model, models, mongoose } from 'mongoose';

let offerPageSchema = new Schema({
    headerImage: {
        type: String,
        default: ''
    },
    heading: {
        type: String,
        default: '',
    },
    // headingTabs: {
    //   type: String,
    //   default: '',
    // },
    offers: {
        offerType: String,
        offer: Array
    },
    directionalBar1: {
        type: String,
        default: ''
    },
    directionalBar2: {
        type: String,
        default: '',
    },
    directionalBarLink1: {
        type: String,
        default: ''
    },
    directionalBarLink2: {
        type: String,
        default: '',
    },
    offersSection: {
        type: Array,
        default: '',
    },
    testimonials: {
        type: String,
        default: '',
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
    collection: "offerPage",
});

const offerPage = models.offerPage || model('offerPage', offerPageSchema);

export default offerPage;