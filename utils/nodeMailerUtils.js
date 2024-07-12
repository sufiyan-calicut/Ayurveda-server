import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
dotenv.config();

// Create a transporter object using SMTP transport
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

// Function to generate a random OTP
const generateOTP = () => {
  return Math.floor(100000 + Math.random() * 900000);
};

// Function to send an email
export const sendEmail = async to => {
  const otp = generateOTP(); // Generate OTP
  const subject = 'Your OTP Code';
  //   const text = `Your OTP code is: ${otp}`;
  const html = `
    <div style="font-family: Arial, sans-serif; padding: 20px; background-color: #f9f9f9; border-radius: 10px; max-width: 600px; margin: auto; border: 1px solid #ddd;">
      <h1 style="text-align: center; color: #4CAF50;">Ayurveda</h1>
      <p>Ayurveda has sent you an OTP to complete your registration. Please use the following OTP to proceed:</p>
      <div style="text-align: center; margin: 20px 0;">
        <span style="display: inline-block; padding: 15px 25px; border-radius: 10px; background-color: #4CAF50; color: white; font-size: 24px; font-weight: bold;">${otp}</span>
      </div>
      <p>If you did not request this OTP, please ignore this email.</p>
      <p>Thank you for choosing Ayurveda!</p>
      <hr>
      <p style="font-size: 12px; color: #888;">This is an automated message, please do not reply.</p>
    </div>
  `;

  const mailOptions = {
    from: 'sufiyanemcalicut@gmail.com',
    to,
    subject,
    html
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log('Email sent: ' + info.response);

    return otp;
  } catch (error) {
    console.error('Error sending email: ', error.message);
    throw new Error(error);
  }
};
