import mongoose from 'mongoose';

const transformSchema = new mongoose.Schema({
  imageBefore: {
    type: String,
    default: null,
  },
  imageAfter: {
    type: String,
    default: null,
  },
  descriptionTransform: {
    type: String,
  },
});

const TransformModel = mongoose.model('Transform', transformSchema);

export default TransformModel;
