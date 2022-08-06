
//Including Mongoose model...
const moment = require('moment');
import { Schema, model, models, mongoose } from 'mongoose';

//Schema for user
var authTokenSchema = new Schema({

    email: {
        type: String,
        required: true
    },
    accountno: {
        type: String,
        required: true
    },
    userId: {
        type: ObjectId,
        required: true,
        ref: 'user'
    },
    token: {
        type: String,
        required: true
    },
    created_at: {
        type: Date,
        required: true
    },
    superAdminAccess: {
        type: Boolean
    }

}, { collection: 'authToken' });

const authT = models.authToken || model('authToken', authTokenSchema);

export default authT;