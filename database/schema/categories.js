import { Schema, model, models, mongoose } from 'mongoose';

let categorySchema = new Schema(
  {
    name: {
      type: String,
      default: '',
    },
    displayOrder: {
      type: String,
      default: '',
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
    collection: "categories",
  }
);

const categories = models.categories || model('categories', categorySchema);

export default categories;