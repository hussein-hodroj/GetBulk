import TransformModel from '../model/transform.js';
import multer from 'multer';

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    try {
      cb(null,"public/uploads/usersImages/")
    } catch (error) {
      console.error('Error:', error.message);
    }
  },
  filename: (req, file, cb) => {
    try {
      if (file) {
        cb(null, file.originalname);
      } else {
        cb(null, null); 
      }
    } catch (error) {
      console.error('Error:', error.message);
    }
  }
});
export const upload = multer({ storage: storage });


export const getAllTransforms = async (req, res) => {
    try {
      const transforms = await TransformModel.find();
      res.status(200).json(transforms);
    } catch (error) {
      console.error('Error retrieving transforms:', error);
      res.status(500).send('Server Error');
    }
  };

  export const getTransforms = async (req, res) => {
    try {
      const transform = await TransformModel.findById(req.params.id);


      if(!transform) return res.status(404).json('transform Not Found');

      res.status(200).json(transform);
    } catch (error) {
      console.error('Error retrieving transform:', error);
      res.status(500).send('Server Error');
    }
  };

  export const createTransforms = async (req, res) => {
    const { descriptionTransform } = req.body;

const newTransform = new TransformModel({
  descriptionTransform,
  imageBeforeWork: req.files['imageBeforeWork'][0]?.originalname,
  imageAfterWork: req.files['imageAfterWork'][0]?.originalname,
});

  
    try {
      await newTransform.save();
  
      res.status(200).json({
        _id: newTransform._id,
        descriptionTransform: newTransform.descriptionTransform,
        imageBeforeWork: newTransform.imageBeforeWork ? newTransform.imageBeforeWork : null,
        imageAfterWork: newTransform.imageAfterWork ? newTransform.imageAfterWork : null,
      });
    } catch (error) {
      res.status(500).json(error);
    }
  };
  
  
  
  
  
  
  
  

  export const updateTransform = async (req, res) => {
    const { id } = req.params;
    const { imageBeforeWork, imageAfterWork, descriptionTransform } = req.body;
  
    try {

      const updateTransform = await TransformModel.findByIdAndUpdate(
        id,
        { imageBeforeWork, imageAfterWork, descriptionTransform },
        { new: true }
      );

      if(!updateTransform) return res.status(404).json('transform Not Found');

      res.status(201).json(updateTransform);
    } catch (error) {
      console.error('Error updating transform:', error);
      res.status(500).send('Server Error');
    }
  };

  export const deleteTransform = async (req, res) => {
    const { id } = req.params;

  try {

   const transform =  await TransformModel.findByIdAndDelete(id);

   if(!transform) return res.status(404).json('transform Not Found');

    res.status(200).send('transform deleted successfully');
  } catch (error) {
    console.error('Error deleting transform:', error);
    res.status(500).send('Server Error');
  }
};