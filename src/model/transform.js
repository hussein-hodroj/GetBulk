import mongoose from 'mongoose';

const transformSchema = new mongoose.Schema({
  imageBeforeWork: {
    type: String,
    // required: true,
    default:null,
  },
  imageAfterWork: {
    type: String,
    // required: true,
    default:null,
  },

  descriptionTransform: { 
    type: String,
    // required: true,
  },
});

const TransformModel = mongoose.model('Transform', transformSchema);

export default TransformModel;
