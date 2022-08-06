import { Schema, model, models, mongoose } from 'mongoose';

let quickFactSchema = new Schema(
  {
    text:{
        type:String,
        default:''
    },
    symbol:{
        type:String
    },
    isDisable: {
      type: Boolean,
      default: false,
    },
    displayOrder:{
      type: Number,

    }
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
    collection: "quickFact",
  }
);

const quickFact = models.quickFact || model('quickFact', quickFactSchema);

export default quickFact;
