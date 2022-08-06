
const mongoose = require('mongoose');

var Schema = mongoose.Schema;

const countrySchema = new Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    iso: {
        type: String,
        required: true,
        trim: true
    },
    code: {
        type: Number,
        required: true,
        trim: true
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
    collection: 'country'
}
);

const country = models.country || model('country', countrySchema);

export default country;