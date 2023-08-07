import UserModel from '../model/user.js';
import jwt from 'jsonwebtoken';
import nodemailer from 'nodemailer';

const generateToken = (data) => {
  return jwt.sign(data, process.env.JWT_SECRET, { expiresIn: '1h' });
};

const sendResetPasswordEmail = async (user, token) => {
  try {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'get.bulk.leb@gmail.com',
        pass: 'ujwymorrxolrbyxp',
      },
    });

    await transporter.sendMail({
      from: 'get.bulk.leb@gmail.com',
      to: user.email,
      subject: 'Reset Your Password',
      html: `
        <p>Hello ${user.fullname},</p>
        <p>You have requested to reset your password. Please click on the link below to reset your password:</p>
        <a href="http://localhost:3000/reset-password/${user._id}/${token}">Reset Password</a>
        <p>This link will expire in 1 hour.</p>
        <p>If you did not request a password reset, please ignore this email.</p>
        <p>Best regards,</p>
        <p>Your Website Team</p>
      `,
    });

    console.log('Reset password email sent successfully');
  } catch (error) {
    console.log('Error sending reset password email:', error);
    throw error;
  }
};

export const forgotPassword = async (req, res) => {
  const { email } = req.body;

  try {
    const user = await UserModel.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    const resetToken = generateToken({ userId: user._id });
    const resetTokenExpiry = Date.now() + 3600000;
    user.resetToken = resetToken;
    user.resetTokenExpiry = resetTokenExpiry;
    await user.save();

    await sendResetPasswordEmail(user, resetToken);

    res.json({ message: 'Reset password email sent successfully' });
  } catch (error) {
    console.log('Error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};
