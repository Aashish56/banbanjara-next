import { Schema, model, models, mongoose } from 'mongoose';

const reviewManagementSchema = new Schema({
    tour: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "tours",
        default: null,
    },
    description: {
        type: String,
        required: true
    },
    isDisable: {
        type: String
    },
    user: {
        type: String,
        required: true
    },
    order: {
        type: String,
        required: true,
    },
    stars: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
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
    collection: 'reviewManagement'
});
const reviewManagement = models.reviewManagement || model('reviewManagement', reviewManagementSchema);

export default reviewManagement;