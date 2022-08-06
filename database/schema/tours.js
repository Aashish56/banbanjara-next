import { Schema, model, models, mongoose } from 'mongoose';

const variantSchema = new Schema({
  image: "",
  title: { type: String, required: true },
  unlimitedPeople: { type: Boolean, default: false },
  minAdult: { type: Number },
  maxAdult: { type: Number },
  pricePerAdult: { type: Number },
  vendorAmountPerAdult: { type: Number },
  inclusions: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "inclusion",
      default: null,
    },
  ],
  childAllowed: { type: Boolean, default: true },
  children: {
    deependant: { type: Number },
    independant: { type: Number },
  },
  vendorAmountPerChild: { type: Number },
});
let tourSchema = new Schema(
  {
    // tab-1
    cardImage: {
      type: String,
      default: "",
    },
    cardCapsion: {
      type: String,
      default: "",
    },
    title: {
      type: String,
      default: "",
    },
    bookingConfirmation: {
      type: String,
      default: "",
    },
    priceType: {
      type: String,
      default: "",
    },
    stay: {
      type: Boolean,
      default: false,
    },
    contactNumber: {
      type: String,
      default: "",
    },
    productAction: {
      type: Array,
      default: [],
    },
    days: {
      type: String,
      default: "",
    },
    night: {
      type: String,
      default: "",
    },
    hours: {
      type: String,
      default: "",
    },
    minute: {
      type: String,
      default: "",
    },
    description: {
      type: String,
      default: "",
    },

    // tab-2
    galleryImages: {
      type: Array,
      default: [],
    },

    // tab-3
    inclusion: {
      type: Array,
      default: [],
    },
    quickFacts: {
      type: Array,
      default: [],
    },
    whatsIncluded: {
      type: Array,
      default: [],
    },
    tourGraphics: {
      type: Array,
      default: [],
    },
    tourUSP: {
      type: Array,
      default: [],
    },
    thingsToKnow: {
      type: Array,
      default: [],
    },
    policies: {
      type: Array,
      default: [],
    },
    tags: {
      type: Array,
      default: [],
    },
    averageRating: {
      type: String,
      default: "",
    },
    extraEnclusion: {
      type: String,
      default: "",
    },

    // tab-4
    country: {
      type: Object,
      default: {},
    },
    state: {
      type: Object,
      default: {},
    },
    city: {
      type: Object,
      default: {},
    },
    startPoint: {
      type: Object,
      default: {},
    },
    endPoint: {
      type: Object,
      default: {},
    },

    // tab-5
    mainPrice: {
      type: String,
      default: "",
    },
    discount: {
      type: String,
      default: "",
    },
    basicPrice: {
      type: String,
      default: "",
    },

    // tab-6
    slug: {
      type: String,
      default: "",
    },
    metaTitle: {
      type: String,
      default: "",
    },
    metaKeywords: {
      type: String,
      default: "",
    },
    metaDescription: {
      type: String,
      default: "",
    },
    OgTitle: {
      type: String,
      default: "",
    },
    OgDescription: {
      type: String,
      default: "",
    },
    OgTags: {
      type: Array,
      default: [],
    },

    // tab-7
    adImage: {
      type: String,
      default: "",
    },
    adUrl: {
      type: String,
      default: "",
    },
    adOpenIn: {
      type: String,
      default: "",
    },

    // extra
    isDisable: {
      type: Boolean,
      default: false,
    },
    relatedTours: {
      type: Array,
      default: [],
    },
    variants: [variantSchema],
    dynamicPricing: [
      {
        pricingType: {
          type: String,
          enum: ["DATE_RANGE", "MONTH", "WEEK", "ALL_MONTH"],
          default: "DATE_RANGE",
        },
        startDate: {
          type: Date,
          default: null,
        },
        endDate: {
          type: Date,
          default: null,
        },
        month: {
          type: String,
          enum: [
            "JANUARY",
            "FEBRUARY",
            "MARCH",
            "APRIL",
            "MAY",
            "JUNE",
            "JULY",
            "AUGUST",
            "SEPTEMBER",
            "OCTOBER",
            "NOVEMBER",
            "DECEMBER",
          ],
          default: null,
        },
        week: {
          type: String,
          enum: [
            "SUNDAY",
            "MONDAY",
            "TUESDAY",
            "WEDNESDAY",
            "THURSDAY",
            "FRIDAY",
            "SATURDAY",
          ],
          default: null,
        },
        allMonth: {
          type: String,
          enum: [
            "1",
            "2",
            "3",
            "4",
            "5",
            "6",
            "7",
            "8",
            "9",
            "10",
            "11",
            "12",
            "13",
            "14",
            "15",
            "16",
            "17",
            "18",
            "19",
            "20",
            "21",
            "22",
            "23",
            "24",
            "25",
            "26",
            "27",
            "28",
            "29",
            "30",
            "31",
          ],
          default: null,
        },
        variants: [variantSchema],
      },
    ],
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
    collection: "tours",
  }
);

const tours = models.tours || model('tours', tourSchema);

export default tours;