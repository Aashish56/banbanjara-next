import { Schema, model, models, mongoose } from 'mongoose';

let productEnquiriesSchema = new Schema(
  {
    product: {
      type: String,
      default: "",
    },
    name: {
      type: String,
      default: "",
    },
    email: {
      type: String,
      default: "",
    },
    description: {
      type: String,
      default: "",
    },
    phone: {
      type: String,
      default: "",
    },
    location: {
      type: String,
      default: "",
    },
    totalPeople: {
      type: String,
      default: "",
    },
    date: {
      type: String,
      default: "",
    },
    status: {
      type: String,
      default: "Pending",
    },
    isDisable: {
      type: Boolean,
      default: false,
    },
    comment: {
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
    collection: "productEnquiries",
  }
);

const productEnquiries = models.productEnquiries || model('productEnquiries', productEnquiriesSchema);

export default productEnquiries;
