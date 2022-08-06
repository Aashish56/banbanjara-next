import { Schema, model, models, mongoose } from 'mongoose';

let parentTagsSchema = new Schema(
  {
    name: {
      type: String,
      default: '',
    },
    displayOrder: {
      type: String,
      default: '',
    },
    category: {
      type: Object,
      default: {},
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
    collection: "parentTags",
  }
);

const parentTags = models.parentTags || model('parentTags', parentTagsSchema);

export default parentTags;
