import { Schema, model, models, mongoose } from 'mongoose';

const landingPageSchema = new Schema({
  title: {
    type: String,
  },
  price: {
    type: String,
  },
  image: {
    type: String,
  },
  location: String,
});

const listingCardSchema = new Schema({
  title: String,
  image: String,
  review: String,
  location: String,
  quickfact: String,
  price: String,
});

const faqSchema = new Schema({
  question: String,
  answer: String,
});

const listingCardSchema2 = new Schema({
  image: String,
  text: String,
  link: String,
  distance: String,
  location: String,
  knownfor: String,
  covidCases: String,
  title: String,
});

const listingCardSchema3 = new Schema({
  heading: String,
  image: String,
  text: String,
  subHeading: String,
});

const relatedArticlesSchema = new Schema({
  image: String,
  text: String,
  link: String,
});

const pormotionalSidebarSchema = new Schema({
  image: String,
  link: String,
});

const exploreNearbySchema = new Schema({
  title: String,
  image: String,
});

const reviewSchema = new Schema({
  rating: Number,
  comment: String,
});

const relatedLinksSchema = new Schema({
  link: String,
});

const weatherSchema = new Schema({
  month: String,
  max: String,
  min: String,
});

const generalInfoSchema = new Schema({
  title: String,
  type: String,
  value: String,
});

const schema = new Schema(
  {
    cover: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    countryCode: {
      type: String,
    },
    country: {
      currency: String,
      flag: String,
      isoCode: String,
      label: String,
      latitude: String,
      longitude: String,
      name: String,
      phonecode: String,
    },
    state: {
      countryCode: String,
      isoCode: String,
      label: String,
      latitude: String,
      longitude: String,
      name: String,
      value: String,
    },
    city: {
      countryCode: String,
      label: String,
      latitude: String,
      longitude: String,
      name: String,
      stateCode: String,
      value: String,
    },
    stateCode: {
      type: String,
    },
    featuredTag: [
      {
        type: mongoose.Schema.ObjectId,
        ref: "featuredTag",
      },
    ],
    overview: {
      type: String,
      required: true,
    },
    tourCards1: [
      {
        type: mongoose.Schema.ObjectId,
        ref: "tours",
      },
    ],
    tourCards2: [
      {
        type: mongoose.Schema.ObjectId,
        ref: "tours",
      },
    ],
    isDisable: {
      type: Boolean,
      default: false,
    },
    tourCards1Title: String,
    tourCards2Title: String,
    listingCard1: [listingCardSchema],
    listingCard2: [listingCardSchema2],
    listingCard3: [listingCardSchema3],
    relatedArticles: [relatedArticlesSchema],
    pormotionalSidebar: [pormotionalSidebarSchema],
    exploreNearby: [exploreNearbySchema],
    pormotionalBar: [pormotionalSidebarSchema],
    reviews: [reviewSchema],
    howToGo: String,
    localWeather: [weatherSchema],
    generalInfo: [generalInfoSchema],
    relatedLinks1: [relatedLinksSchema],
    relatedLinks2: [relatedLinksSchema],
    faq: [faqSchema],
  },
  {
    timestamps: true,
  },
  {
    collection: "landingPage",
  }
);

const landingPage = models.landingPage || model('landingPage', landingPageSchema);

export default landingPage;
