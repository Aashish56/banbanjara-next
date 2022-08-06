import { Schema, model, models, mongoose } from 'mongoose';

let teamSchema = new Schema({
    name: {
        type: String,
        default: ""
    },
    isDirector: {
        type: Boolean,
        required: true,
        default: false
    },
    designation: {
        type: String,
        default: ""
    },
    shortDescription: {
        type: String
    },
    description: {
        type: String
    },
    image: {
        type: Array
    },
    facebook: {
        type: String
    },
    twitter: {
        type: String
    },
    instagram: {
        type: String
    },
    linkedin: {
        type: String
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
    collection: 'team'
});

const team = models.team || model('team', teamSchema);

export default team;
