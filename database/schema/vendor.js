import { Schema, model, models, mongoose } from 'mongoose';
const { nanoid } = require("nanoid");

const vendorSchema = new Schema(
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
    companyName: {
      type: String,
      required: true,
      trim: true,
    },
    country: {
      type: String,
      required: true,
    },
    state: {
      type: String,
      required: true,
    },
    city: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
    },
    secondaryAddress: {
      type: String,
    },
    secondaryEmail: {
      type: String,
      // required: true,
      index: {
        unique: true,
        partialFilterExpression: {secondaryEmail: {$type: "string"}}
      },
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
    

    accountno: {
      type: String,
      required: true,
      default: () => nanoid(10),
    },
    profileImage: {
      type: Array,
    },
    bankName: {
      type: String,
    },
    bankAccountHolderName: {
      type: String,
    },
    bankBranchName: {
      type: String,
    },
    bankAccountNumber: {
      type: Number,
      trim: true,
    },
    bankIFSCode: {
      type: String,
      trim: true,
    },
    iban: {
      type: String,
    },
    swiftCode: {
      type: String,
    },
    pan: {
      type: String,
    },
    serviceTaxNumber: {
      type: String,
    },
    paymentTerms: {
      type: String,
    },
    operationCountry: {
      type: String,
    },
    operationState: {
      type: String,
    },
    operationCity: {
      type: String,
    },
    
    verificationToken: {
      type: String,
    },
    verificationDate: {
      type: Date,
    },
    active: {
      type: Boolean,
      default:false
    },
    onBoardActive: {
      type: Boolean,
      default:false

    },
    isVerified:{
      type: Boolean,
      default: false,
    },

  },
  {
    timestamps: {
      createdAt: "vendorCreationDate",
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
    collection: "vendor",
  }
);

const vendor = models.vendor || model('vendor', vendorSchema);

export default vendor;
