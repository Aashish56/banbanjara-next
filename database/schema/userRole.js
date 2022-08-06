
import { Schema, model, models, mongoose } from 'mongoose';
const { nanoid } = require('nanoid');

const userRoleSchema = new Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    rights: {
        type: Array,
        required: true
    },
    status: {
        type: Boolean,
        default: true
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        default: null
    },
    updatedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        default: null
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
    collection: 'userRole'
}
);

const userRole = models.userRole || model('userRole', userRoleSchema);

export default userRole;