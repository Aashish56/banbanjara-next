import { Schema, model, models, mongoose } from 'mongoose';

const featuredBlog = require("./featuredBlog");
const blog = require("./blog");
const theme = require("./themes");
const { number } = require("joi");

const tripsThatMatchInterestsSchema = new Schema({
  title: String,
  description: String,
  themes: [
    {
      imageSrc: String,
      imageRedirection: String,
      imageTitle: String,
    },
  ],
});

const nearYouSchema = new Schema({
  bestsellers: { type: String },
  nearYou: { type: String },
  explore: { type: String },
  url: { type: String },
  cardArray: [
    {
      imageSrc: { type: String },
      imageRedirection: { type: String },
      rating: { type: String },
      tourDistance: { type: String },
      tourTitle: { type: String },
      crossedRate: { type: String },
      rate: { type: String },
    },
  ],
});

const manaliToLehLadakhBikeTripSchema = new Schema({
  image: { type: String, required: true },
  title2: { type: String, required: true },
  title3: { type: String, required: true },
  description: { type: String, required: true },
  leftTitle: { type: String, required: true },
  leftUrl: { type: String, required: true },
  cards: [
    {
      title: { type: String },
      averageRating: { type: String },
      days: { type: String },
      image: { type: String },
      mainPrice: { type: Number },
      discount: { type: Number },
      redirectionUrl: { type: String },
    },
  ],
});

const headerSchema = new Schema({
  profile: {
    data: [
      {
        title: { type: String },
        url: { type: String },
        order: { type: String },
      },
    ],
  },
  contact: {
    data: [
      {
        title: { type: String },
        url: { type: String },
        order: { type: String },
        icon: { type: String },
      },
    ],
  },
});

const footerSchema = new Schema({
  subSection: {
    title: { type: String },
    data: [
      {
        title: { type: String },
        url: { type: String },
      },
    ],
  },
  verSection: {
    title: { type: String },
    data: [
      {
        title: { type: String },
        url: { type: String },
      },
    ],
  },
  footerLogo: { type: String },
  followTitle: { type: String },
  list: [
    {
      icon: { type: String },
      url: { type: String },
    },
  ],
  copyrightText: { type: String },
});

const basicPageSchema = new Schema({
  logo: String,
  heading: String,
  subHeading: String,
  imageSlider: [{ image: String }],
  lacation: [{ city: String, state: String, country: String }],
  bannerSmallText: [
    {
      icon: String,
      label1: String,
      label2: String,
    },
  ],
});

const travelTrendsSchema = new Schema({
  title: String,
  description: String,
  featuredArticles: [featuredBlog],
  blogs: [blog],
  showAllText: String,
  showAllUrl: String,
});

const promotionBarSchema = new Schema({
  image1: {
    type: {},
    required: true,
  },
  image1RedirectionUrl: String,
  image2: {
    type: {},
    required: true,
  },
  image2RedirectionUrl: String,
});

const pressReleasesSchema = new Schema({
  title: {
    type: String,
  },
  pressArticles: [
    {
      image: {
        type: {},
      },
      description: {
        type: String,
      },
      shortDescription: {
        type: String,
      },
    },
  ],
});

const singlePartnerSchema = new Schema({
  image: {
    type: {},
  },
  imageRedirection: {
    type: String,
  },
});

const partnersSchema = new Schema({
  title: {
    type: String,
    default: "Our Partners",
  },
  data: [singlePartnerSchema],
});

const jamStackImageSchema = new Schema({
  image: {
    type: {},
  },
});
const destinationOfBanbajara = new Schema({
  heading: {
    type: String,
    default: "no heading",
  },
  subheading: {
    type: String,
    default: "No heading",
  },
  data: [
    {
      dataType: {
        type: String,
        enum: ["dataentry", "surround"],
        default: "surround",
      },
      text: {
        type: String,
      },
    },
  ],
  buttontitle: {
    type: String,
    default: "no title",
  },
  buttonurl: {
    type: String,
    default: "checkit",
  },
});
const jamStackSchema = new Schema({
  heading: {
    type: String,
    default: "Our jamstacks",
  },
  description: {
    type: String,
  },
  buttontext: {
    type: String,
  },
  buttonurl: {
    type: String,
  },
  data: [jamStackImageSchema],
});
const eleventhPageSchema = new Schema({
  heading: {
    type: String,
    // default: 'no heading'
  },
  description: {
    type: String,
    // default: 'no description'
  },
  video: {
    type: String,
  },
});
const findThePerfectExperience1Schema = new Schema({
  heading: { type: String },
  subheading: { type: String },
  cards: [
    {
      imageRedirection: { type: String },
      image: { type: {} },
      title: { type: String },
    },
  ],
});
const findThePerfectExperience2Schema = new Schema({
  title: { type: String },
  cards: [
    {
      imageRedirection: { type: String },
      image: { type: {} },
    },
  ],
});
const tourCardSchema = new Schema({
  title: { type: String },
  navTitle: { type: String },
  navRedirection: { type: String },
  order: { type: Number, default: 1 },
  cards: [
    {
      title: { type: String },
      averageRating: { type: Number },
      days: { type: String },
      image: { type: {} },
      mainPrice: { type: Number },
      discount: { type: Number },
      redirectionUrl: { type: String },
    },
  ],
});
const hotToursSchema = new Schema({
  heading: {
    type: String,
    default: "hottours heading",
  },
  bottomtext: {
    type: String,
    default: "hottours heading",
  },
  bottomtexturl: {
    type: String,
    default: "hottours heading",
  },
  data: [
    {
      imageRedirection: { type: String },
      image: { type: {} },
      driveshort: { type: String },
      imagetitle: { type: String },
    },
  ],
});
const customLinksSchema = {
  text: {
    type: String,
  },
  redirectionUrl: {
    type: String,
  },
};
const customerReviewsDataArraySchema = {
  image: {
    type: String,
  },
  comment: {
    type: String,
  },
};

const CustomerReviewSchemaInside = new Schema({
  cardImage: { type: String },
  imageRedirection: {
    type: String,
  },
  reviewHtml: { type: String },
  seeAllTitle: { type: String },
  seeAllUrl: { type: String },
  reviewsData: [customerReviewsDataArraySchema],
});
const customerReviewsSchema = new Schema({
  title: { type: String },
  cardData: [CustomerReviewSchemaInside],
});

const homePageSchema = new Schema(
  {
    // featuredArticles: [featuredBlog],
    hottours: hotToursSchema,
    eleventhpage: eleventhPageSchema,
    jamstacks: jamStackSchema,
    tripsThatMatchInterests: tripsThatMatchInterestsSchema,
    nearYou: nearYouSchema,
    basicPage: basicPageSchema,
    findThePerfectExperience1: findThePerfectExperience1Schema,
    findThePerfectExperience2: [findThePerfectExperience2Schema],
    tourCards: [tourCardSchema],
    travelTrends: travelTrendsSchema,
    pressRelease: pressReleasesSchema,
    partners: partnersSchema,
    customLinks: [customLinksSchema],
    promotionBar: promotionBarSchema,
    customerReview: customerReviewsSchema,
    Destinations: destinationOfBanbajara,
    footer: footerSchema,
    manaliToLehLadakhBikeTrip: manaliToLehLadakhBikeTripSchema,
    header: headerSchema,
  },
  {
    timestamps: {
      createdAt: "createdAt",
      updatedAt: "updatedAt",
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
    collection: "homePage",
  }
);

const homePage = models.homePage || model('homePage', homePageSchema);

export default homePage;
