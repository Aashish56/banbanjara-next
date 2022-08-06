
import { Schema, model, models, mongoose } from 'mongoose';

const wishListSchema = new Schema({
    propertyId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'property',
        default: null
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        default: null
    },
    status: {
        type: Boolean,
        default: true
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
    collection: 'wishList'
}
);

const wishList = models.wishList || model('wishList', wishListSchema);

export default wishList;