import { Schema, model, models, mongoose } from 'mongoose';

let policiesSchema = new Schema(
  {
    text: {
      type: String,
      default: "",
    },
    symbol: {
      type: String,
    },
    description: {
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
    collection: "policies",
  }
);

const policies = models.policies || model('policies', policiesSchema);

export default policies;
