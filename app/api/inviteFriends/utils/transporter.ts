import * as nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();
export const transporter = nodemailer.createTransport({
  service: "Gmail",
  auth: {
    user: process.env.MAIL,
    pass: process.env.PASSWORD,
  },
  secure: true, // Set to true if using port 465
  port: 465, // Specify the port; use 587 for TLS/STARTTLS
});


// Optional: Test the connection
transporter.verify((error, success) => {
  if (error) {
    console.error("Error verifying transporter:", error);
  } else {
    console.log("Transporter is ready to send emails.");
  }
});

// Dev.fireefurry@123