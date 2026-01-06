import nodemailer from "nodemailer";

export const transporter = nodemailer.createTransport({
host: process.env.EMAIL_HOST,
port: Number(process.env.EMAIL_PORT),
  secure: false, // لازم false مع 587
auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
},
});

transporter.verify((error, success) => {
if (error) {
    console.error("Email config error:", error);
} else {
    console.log("Email server is ready ✅");
}
});
