import { Schema, model, models, mongoose } from 'mongoose';

let collectionSchema = new Schema(
  {
    country: {
      type: String,
      default: '',
    },
    state: {
      type: String,
      default: '',
    },
    city: {
      type: String,
      default: '',
    },
    title: {
      type: String,
      default: ''
    },
    selectCard: {
      type: String,
      default: '',
    },
    title: {
      type: String,
      default: ''
    },
    metaKeyword: {
      type: String,
      default: ''
    },
    description: {
      type: String,
      default: '',
    },
    coverImage: {
      type: String,
      default: '',
    },
    relatedArticleImage: {
      type: String,
      default: '',
    },
    description: {
      type: String
    },
    isDisable: {
      type: Boolean,
      default: false,
    }
  },
  {
    timestamps: {
      createdAt: "created",
      updatedAt: "updated",
    },
    id: false,
    toJSON: {
      getters: true,
      virtuals: true,
    },
    toObject: {
      getters: true,
      virtuals: true,
    },
  },
  {
    collection: "collection",
  }
);

const collection = models.collection || model('collection', collectionSchema);

export default collection;
