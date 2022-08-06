import { Schema, model, models, mongoose } from 'mongoose';

const featuredTagSchema = new Schema({
    title: String,
    icon: String
}, {
    timestamps: true
}, {
    collection: 'featuredTag'
}
);

const featuredTag = models.featuredTag || model('featuredTag', featuredTagSchema);

export default featuredTag;
