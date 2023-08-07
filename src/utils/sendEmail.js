import nodemailer from "nodemailer";
// import dotenv from "dotenv";

// dotenv.config();
const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 465,
  secure: true,
  auth: {
    user: 'get.bulk.leb@gmail.com', 
    pass: 'ixktrbmlrnmtunpm', 
    // user: process.env.NOREPLY_EMAIL,
    // pass: process.env.NOREPLY_Password,
  }, 
});

// Function to send an email
export const sendEmail = async (to, subject, text) => { 
  try {
    const info = await transporter.sendMail({
      from: "your-email@example.com",
      to,
      subject,
      text, 
    });

    console.log("Email sent:", info.messageId);
    return true;
  } catch (error) {
    console.error("Error sending email:", error);
    return false;
  }
};
