import TransformModel from '../model/transform.js';

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

    if (!transform) return res.status(404).json('Transform Not Found');

    res.status(200).json(transform);
  } catch (error) {
    console.error('Error retrieving transform:', error);
    res.status(500).send('Server Error');
  }
};

export const createTransforms = async (req, res) => {
  const { descriptionTransform } = req.body;

  const imageBeforeFilename = req.files['imageBefore'][0]?.originalname;
  const imageAfterFilename = req.files['imageAfter'][0]?.originalname;
  

  const newTransform = new TransformModel({
    descriptionTransform,
    imageBefore: imageBeforeFilename,
    imageAfter: imageAfterFilename,
  });

  try {
    await newTransform.save();
    res.status(201).json(newTransform);
  } catch (error) {
    res.status(500).json(error);
  }
};


export const updateTransform = async (req, res) => {
  const { id } = req.params;
  const { descriptionTransform } = req.body;

  try {
    let updateFields = {
      descriptionTransform,
    };

   
    if (req.files['imageBefore'] && req.files['imageBefore'][0]) {
      updateFields.imageBefore = req.files['imageBefore'][0].originalname;
    }
    if (req.files['imageAfter'] && req.files['imageAfter'][0]) {
      updateFields.imageAfter = req.files['imageAfter'][0].originalname;
    }

    const updatedTransform = await TransformModel.findByIdAndUpdate(
      id,
      { $set: updateFields },
      { new: true }
    );

    if (!updatedTransform) {
      return res.status(404).json({ error: 'Transform Not Found' });
    }

    res.status(200).json(updatedTransform);
  } catch (error) {
    console.error('Error updating transform:', error);
    res.status(500).json({ error: 'Server Error' });
  }
};




export const deleteTransform = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedTransform = await TransformModel.findByIdAndDelete(id);

    if (!deletedTransform) return res.status(404).json('Transform Not Found');

    res.status(200).send('Transform deleted successfully');
  } catch (error) {
    console.error('Error deleting transform:', error);
    res.status(500).send('Server Error');
  }
};
