import { Schema, model, models, mongoose } from 'mongoose';

let priceTypeSchema = new Schema(
  {
    name: {
      type: String,
      default: "",
    },
    description: {
      type: String,
      default: "",
    },
    metaTitle: {
      type: String,
    },
    metaKeywords: {
      type: String,
    },
    metaDescription: {
      type: String,
    },
    isDisable: {
      type: Boolean,
      default: false,
    },
    displayOrder: {
      type: String,
    },
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
    collection: "priceType",
  }
);

const priceType = models.priceType || model('priceType', priceTypeSchema);

export default priceType;
