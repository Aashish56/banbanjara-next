const Schema = mongoose.Schema;

const schema = new Schema(
  {
    cover: Array,
    title: { type: String, required: true },
    featuredTags:[]
  },
  {
    timestamps: {
      createdAt: 'createdAt',
      updatedAt: 'updatedAt',
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
    collection: 'destinationPage',
  }
);

module.exports = schema;
