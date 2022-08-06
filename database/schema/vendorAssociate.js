import { Schema, model, models, mongoose } from 'mongoose';
const { nanoid } = require("nanoid");

const vendorAssociateSchema = new Schema(
  {
    firstName: {
      type: String,
      required: true,
      trim: true,
    },
    lastName: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
    },
    mobile: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    secondaryMobile: {
      type: String,
      unique: true,
      trim: true,
    },
    designation: {
      type: String,
    },
    active: {
      type: Boolean,
      default:false
    },
    vendorId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "vendor",
      default: null,
    },
  },
  {
    timestamps: {
      createdAt: "vendorAssociateCreationDate",
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
    collection: "vendorAssociate",
  }
);

const vendorAssociate = models.vendorAssociate || model('vendorAssociate', vendorAssociateSchema);

export default vendorAssociate;
