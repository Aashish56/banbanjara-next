import { Schema, model, models, mongoose } from 'mongoose';
const { nanoid } = require("nanoid");

const tourLogSchema = new Schema(
  {
    tourId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "tours",
      default: null,
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      default: null,
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
    collection: "tourLog",
  }
);

const tourLog = models.tourLog || model('tourLog', tourLogSchema);

export default tourLog;
