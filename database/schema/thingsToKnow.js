import { Schema, model, models, mongoose } from 'mongoose';

let thingsToKnowSchema = new Schema(
  {
    title: {
      type: String,
      default: "",
    },
    subTitle: {
      type: String,
      default: "",
    },
    symbol: {
      type: String,
    },
    isDisable: {
      type: Boolean,
      default: false,
    },
    displayOrder: {
      type: Number,
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
    collection: "thingsToKnow",
  }
);

const thingsToKnow = models.thingsToKnow || model('thingsToKnow', thingsToKnowSchema);

export default thingsToKnow;
