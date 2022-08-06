import { Schema, model, models, mongoose } from 'mongoose';

let themesSchema = new Schema(
  {
    name: {
      type: String,
      default: "",
    },
    description: {
      type: String,
      default: "",
    },
    imageRedirection:{
      type:String, 
      default: "",
    },
    metaTitle: {
      type: String,
    },
    metaKeywords: {
      type: String,
    },
    metaDescription: {
      type: String,
    },
    image: {
      type: Array,
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
    collection: "themes",
  }
);

const themes = models.themes || model('themes', themesSchema);

export default themes;
