import UserModel from '../model/user.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken'; 

export const resetPassword = async (req, res) => {
  const { userId, token } = req.params;
  const { password } = req.body;

  try {
    const user = await UserModel.findById(userId);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    if (decodedToken.userId !== userId) {
      return res.status(400).json({ message: 'Invalid token' });
    }

    if (!user.resetToken || user.resetToken !== token || user.resetTokenExpiry < Date.now()) {
      return res.status(400).json({ message: 'Invalid or expired reset token' });
    }

  
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    user.password = hashedPassword;
    user.resetToken = undefined;
    user.resetTokenExpiry = undefined;

    await user.save();

    res.json({ message: 'Password reset successful' });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};
