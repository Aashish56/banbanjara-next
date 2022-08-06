import { Schema, model, models, mongoose } from 'mongoose';

let itinerariesSchema = new Schema(
  {
    tourId:{
        // type:mongoose.Schema.Types.ObjectId,
        type:String,
        ref:'tour'
    },
    description:{
        type:String
    },
    title: {
      type: String,
    },
    image:{
      type:String
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
    collection: "itineraries",
  }
);

const itineraries = models.itineraries || model('itineraries', itinerariesSchema);

export default itineraries;
