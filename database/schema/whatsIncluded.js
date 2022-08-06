import { Schema, model, models, mongoose } from 'mongoose';

let schema = new Schema(
  {
    text: {
      type: String,
      default: "",
    },
    symbol:{
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
    collection: "whatsIncluded",
  }
);

const whatsIncluded = models.whatsIncluded || model('whatsIncluded', whatsIncludedSchema);

export default whatsIncluded;
