import { Schema, model, models, mongoose } from 'mongoose';

let contactSchema = new Schema(
  {
    name: {
      type: String,
      default: "",
    },
    email: String,
    phone: String
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
    collection: "contact",
  }
);

const contact = models.contact || model('contact', contactSchema);

export default contact;
