import { Schema, model, models, mongoose } from 'mongoose';

let inclusionSchema = new Schema(
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
    image: {
      type: Array,
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
    collection: "inclusion",
  }
);

const inclusion = models.inclusion || model('inclusion', inclusionSchema);

export default inclusion;
