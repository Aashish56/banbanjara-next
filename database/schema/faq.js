import { Schema, model, models, mongoose } from 'mongoose';

let itinerarySchema = new Schema(
  {
    tourId:{
        // type:mongoose.Schema.Types.ObjectId,
        type:String,
        ref:'tour'
    },
    answer:{
        type:String
    },
    question: {
      type: String,
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
    collection: "itinerary",
  }
);

const itinerary = models.itinerary || model('itinerary', itinerarySchema);

export default itinerary;
