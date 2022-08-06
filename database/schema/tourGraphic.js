import { Schema, model, models, mongoose } from 'mongoose';

let tourGraphicSchema = new Schema(
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
    collection: "tourGraphic",
  }
);

const tourGraphic = models.tourGraphic || model('tourGraphic', tourGraphicSchema);

export default tourGraphic;
