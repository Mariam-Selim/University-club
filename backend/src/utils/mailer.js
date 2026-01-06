import nodemailer from "nodemailer";
import dotenv from "dotenv";
dotenv.config({ path: "../../.env" }); // مسار صحيح للملف من utils

// اختبري القيم
console.log("EMAIL_USER:", process.env.EMAIL_USER);
console.log("EMAIL_PASS:", process.env.EMAIL_PASS ? "DEFINED" : "NOT DEFINED");

// إنشاء transporter
const transporter = nodemailer.createTransport({
host: "smtp.gmail.com",
port: 465,
secure: true,
auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
},
});

export const sendWelcomeEmail = async (name, email) => {
try {
    const mailOptions = {
    from: `"The Loop Team" <${process.env.EMAIL_USER}>`,
    to: email,
    subject: "Welcome to The Loop!",
    html: `
        <h1>Hello ${name} 👋</h1>
        <p>Welcome to The Loop! Our team is excited to have you on board.</p>
        <p>Feel free to explore, join activities, and connect with the community.</p>
        <p>Best regards,<br/><b>The Loop Team</b></p>
    `,
    };

    await transporter.sendMail(mailOptions);
    console.log(`Email sent to ${email}`);
} catch (error) {
    console.error("Error sending welcome email:", error.message);
}
};
