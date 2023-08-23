import express from 'express';
import {registerUser,loginUser, getUser,getUsers ,addUser, createUser, updateuser,
     deleteuser, upload, contact, deleteAllUsers, getTrainerById} from '../controller/user.js';

const router = express.Router();
import { protect } from '../middleware/authmiddleware.js';
router.post("/contact", contact);

router.get('/:id', getUser);
router.post('/create', createUser);
router.get('/', protect,getUsers);
router.put('/:id', updateuser);
router.delete('/:id', deleteuser);
router.post('/register',upload.single("imagePath"),registerUser);
router.post('/login',loginUser);
router.get('/trainers');
router.get('/trainers/:id', getTrainerById);
// router.get('/UsersTrainers',  getUsersTrainers);
router.post("/addUser",addUser);
router.delete("/", deleteAllUsers);

export default router;
