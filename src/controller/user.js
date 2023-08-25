
import UserModel from '../model/user.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import asyncHandler from 'express-async-handler';
import { sendEmail } from '../utils/sendEmail.js';
import multer from 'multer';


export const addUser = async (req, res) => {
  try {
    const { fullname, email, address, age, phonenumber } = req.body;

    // Create a new user instance
    const newUser = new UserModel({
      fullname,
      email,
      address,
      age,
      phonenumber,
      role: 'trainer',
    });

    // Save the user to the database
    const savedUser = await newUser.save();

    res.status(201).json(savedUser);
  } catch (error) {
    console.error('Error registering user:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};



// export const contact=async(req,res)=>{
//   const {fullname,subject,email} = req.body;
//   console.log(req.body);
//  try {
//    if(!fullname) return res.status(404).json("fullname not found");
//    if(!subject) return res.status(404).json("Empty Message");
//    if(!email) return res.status(404).json("email not find");
//   const contactemail=await sendEmail("h_r_s_1994@hotmail.com",fullname,email,subject)
//   res.status(200).json(contactemail);
//  }
//  catch(error){res.status(500).json(error);}
//  }
 
export const contact = async (req, res) => {
  const { fullname, subject, email } = req.body;
  console.log(req.body);

  try {
    if (!fullname) return res.status(404).json("Full name not found");
    if (!subject) return res.status(404).json("Empty message");
    if (!email) return res.status(404).json("Email not found");

    const message = `
      Full Name: ${fullname}
      Email: ${email}
      Subject: ${subject}
    `;

    const contactEmail = await sendEmail("h_r_s_1994@hotmail.com", "Contact Form Submission", message);
    res.status(200).json(contactEmail);
  } catch (error) {
    res.status(500).json(error);
  }
};



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
        cb(null, null); // Set filename to null if no file
      }
    } catch (error) {
      console.error('Error:', error.message);
    }
  }
});
export const upload = multer({ storage: storage });


export const getUsers = async (req, res) => {
  try {
    const users = await UserModel.find();
    res.status(200).send(users);
  } catch (error) {
    res.status(500).send('Error retrieving users');
  }
};


export const getUser = async (req, res) => {
  try {
    const users = await UserModel.findById(req.params.id);

    if (!users) return res.status(404).send('User Not found');

    res.status(200).send(users);
  } catch (error) {
    res.status(500).send('Error retrieving users');
  }
};

export const updateuser = async (req, res) => {
  const { fullname, email, password, address, phonenumber, age, role ,imagePath} = req.body;
  try {
     console.log("id=>",req.params.id)
    const users = await UserModel.findById(req.params.id);
      console.log("user=>",users)
    if (!users) return res.status(404).send('User Not found');

    await UserModel.findByIdAndUpdate(req.params.id, { fullname, email, password, address, phonenumber, age, role,imagePath });
    res.status(201).send('User updated successfully');
  } catch (error) {
    res.status(500).send('Error updating user');
  }
};

export const deleteuser = async (req, res) => {

  try {

    const users = await UserModel.findById(req.params.id);

    if (!users) return res.status(404).send('User Not found');
    
    await UserModel.findByIdAndDelete(req.params.id);
    res.status(200).send('User deleted successfully');
  } catch (error) {
    res.status(500).send('Error deleting user');
  }
};

export const registerUser = asyncHandler(async (req, res) => {
  const { fullname, email, password, address, phonenumber, age, role } = req.body;

  // Validation
  if (!fullname || !email || !password || !address || !phonenumber || !age || !role) {
    return res.status(400).json("Please fill in all fields");
  }

  // Check if the user already exists
  const userExists = await UserModel.findOne({ email });
  if (userExists) {
   return res.status(400).json("User already exists");
  }

  // Hash the password using bcrypt
  const saltRounds = 10;
  const hashedPassword = await bcrypt.hash(password, saltRounds);

  // Create user
  const newUser = new UserModel({
    fullname,
    email,
    password: hashedPassword,
    address,
    phonenumber,
    age,
    role,
    imagePath: req?.file?.originalname,
  });

  //const registereduser = {token:generateToken(newUser._id),...newUser}
  try {
    await newUser.save()
    // Respond with the newly created user data
   
    res.status(200).json({
      _id: newUser._id,
      fullname: newUser.fullname,
      email: newUser.email,
      address: newUser.address,
      phonenumber: newUser.phonenumber,
      age: newUser.age,
      role: newUser.role,
      imagePath: newUser.imagePath?newUser.imagePath:null,
      token: generateToken(newUser._id),
    });

  } catch (error) {
    res.status(500).json(error);
    
  }
});


export const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  // Check for user email
  const user = await UserModel.findOne({ email });

  try
  {
  if (!user) {
    return res.status(404).json("Email not Found");
   }
  // Check the password and decrypt it
  if (user && (await bcrypt.compare(password, user.password))) {
    res.status(200).json({
      _id: user._id,
      fullname: user.fullname,
      email: user.email,
      address: user.address,
      phonenumber: user.phonenumber,
      age: user.age,
      role: user.role,
      token: generateToken(user._id),
    });
  } else {
    res.status(400).json("Wrong email or password");
    
  }
}catch(error)
{
  res.status(500).json(error);
}
});

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { 
    expiresIn: '30d' });
};
// export const getUsersTrainers = async (req, res) => {
//   try {
//     const users = await UserModel.find({ role: 'trainer' });
//     return res.status(200).json(users);
//   } catch (error) {
//     return res.status(500).json({ error: 'An error occurred while fetching users.' });
//   }
// };


export const getTrainers = async (req, res) => {
  try {
    const trainers = await UserModel.find({ role: UserRoles.TRAINER });
    res.status(200).send(trainers);
  } catch (error) {
    res.status(500).send('Error retrieving trainers');
  }
};

export const deleteAllUsers = async (req, res) => {
  try {
    await UserModel.deleteMany(); // Delete all documents from the collection
    res.status(200).send('All users deleted successfully');
  } catch (error) {
    res.status(500).send('Error deleting all users');
  }
};


export const createUser = asyncHandler(async (req, res) => {
  const { fullname, email, password, address, phonenumber, age, role } = req.body;

  // Validation
  if (!fullname || !email || !password || !address || !phonenumber || !age || !role) {
    return res.status(400).json("Please fill in all fields");
  }

  // Check if the user already exists
  const userExists = await UserModel.findOne({ email });
  if (userExists) {
   return res.status(400).json("User already exists");
  }

  // Hash the password using bcrypt
  const saltRounds = 10;
  const hashedPassword = await bcrypt.hash(password, saltRounds);

  // Create user
  const newUser = new UserModel({
    fullname,
    email,
    password: hashedPassword,
    address,
    phonenumber,
    age,
    role,
    imagePath: req?.file?.originalname,
  });

  //const registereduser = {token:generateToken(newUser._id),...newUser}
  try {
    await newUser.save()
    // Respond with the newly created user data
   
    res.status(200).json({
      _id: newUser._id,
      fullname: newUser.fullname,
      email: newUser.email,
      address: newUser.address,
      phonenumber: newUser.phonenumber,
      age: newUser.age,
      role: newUser.role,
      imagePath: newUser.imagePath?newUser.imagePath:null,
      token: generateToken(newUser._id),
    });

  } catch (error) {
    res.status(500).json(error);
    
  }
});

export const getTrainerById = asyncHandler(async (req, res) => {
  const trainerId = req.params.id; // Get the trainerId from the request parameters

  try {
    const trainer = await UserModel.findById(trainerId);

    if (!trainer) {
      return res.status(404).json({ message: 'Trainer not found' });
    }

    res.status(200).json(trainer);
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving trainer', error: error.message });
  }
});