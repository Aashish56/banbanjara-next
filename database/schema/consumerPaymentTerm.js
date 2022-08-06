import { Schema, model, models, mongoose } from 'mongoose';

let consumerPaymentTermSchema = new Schema(
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
    collection: "consumerPaymentTerm",
  }
);

const consumerPaymentTerm = models.consumerPaymentTerm || model('consumerPaymentTerm', consumerPaymentTermSchema);

export default consumerPaymentTerm;
