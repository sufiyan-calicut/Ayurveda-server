import mongoose from 'mongoose';
const {Schema} = mongoose;

const bannerSchema = new Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true,
    trim: true
  },
  imageUrl: {
    type: String,
    required: true,
    trim: true
  },
  isBlocked: {
    type: Boolean,
    required: true,
    default: false
  }
});

const Banner = mongoose.model('Banner', bannerSchema);
export default Banner;
