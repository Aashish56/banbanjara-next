import { Schema, model, models, mongoose } from 'mongoose';

const menuModuleSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    parent: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'menuModule',
        default: null
    },
    grandParent: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'menuModule',
        default: null
    },
    status: {
        type: Boolean,
        default: true
    },
    description: {
        type: String,
        required: true
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
    collection: 'menuModule'
}
);

const menuModule = models.menuModule || model('menuModule', menuModuleSchema);

export default menuModule;