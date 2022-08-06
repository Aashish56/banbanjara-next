import { Schema, model, models, mongoose } from 'mongoose';

let tourUSPSchema = new Schema(
  {
    text:{
        type:String,
        default:''
    },
    symbol:{
        type:String
    },
    description:{
      type:String
    },
    description:{
      type:String
    },
    description:{
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
    collection: "tourUSP",
  }
);

const tourUSP = models.tourUSP || model('tourUSP', tourUSPSchema);

export default tourUSP;
