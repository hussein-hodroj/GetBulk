import UserModel from '../model/user.js';
import bcrypt from 'bcryptjs';

export const editPassword = async (req, res) => {
  const { userId, oldPassword, newPassword } = req.body;

  try {
    const user = await UserModel.findById(userId);

    if (!user) {
      return res.status(404).json("User not found");
    }

    if (!(await bcrypt.compare(oldPassword, user.password))) {
      return res.status(400).json("Old password is incorrect");
    }

    if (newPassword.length < 8 || !/\d/.test(newPassword) || !/[A-Z]/.test(newPassword) || !/[a-z]/.test(newPassword)) {
      return res.status(400).json("New password must contain at least 8 characters, including at least one uppercase letter, one lowercase letter, and one digit");
    }

    const saltRounds = 10;
    const hashedNewPassword = await bcrypt.hash(newPassword, saltRounds);

    user.password = hashedNewPassword;
    await user.save();

    res.status(200).json("Password updated successfully");
  } catch (error) {
    res.status(500).json(error);
  }
};
