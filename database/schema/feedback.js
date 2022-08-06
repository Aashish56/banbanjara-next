
import { Schema, model, models, mongoose } from 'mongoose';


const feedbackSchema = new Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    city: {
        type: String,
        required: true,
        trim: true
    },
    message: {
        type: String,
        required: true
    },
    rating: {
        type: Number,
        required: true
    },
    propertyId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'property',
        default: null
    },
    image: {
        type: Array
    },
    status: {
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
    collection: 'feedback'
}
);

const feedback = models.feedback || model('feedback', feedbackSchema);

export default feedback;