//Including Mongoose model...
import { Schema, model, models, mongoose } from 'mongoose';
//creating object 
ObjectId = Schema.ObjectId;

//Schema for Header
var headerSchema = new Schema({

    title: {
        type: String,
        required: true
    },
    order: {
        type: String,
        required: true
    },
    link: {
        type: String,
        required: true,
        ref: 'user'
    },

}, { collection: 'header' });

const header = models.header || model('header', headerSchema);

export default header;