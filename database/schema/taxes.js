import { Schema, model, models, mongoose } from 'mongoose';

let taxesSchema = new Schema(
  {
    taxValue: {
      type: Number,
    },

    isDisable: {
      type: Boolean,
      default: false,
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
    collection: "taxes",
  }
);

const taxes = models.taxes || model('taxes', taxesSchema);

export default taxes;

