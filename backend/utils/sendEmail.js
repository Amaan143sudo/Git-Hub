const nodemailer = require("nodemailer");

const sendEmail = async (email, subject, text) => {
  try {
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true, 
      auth: {
        user: "amandanish757@gmail.com", // Aapki email set kar di
        pass: "dfgh jhlh wqyf mqyi",    // Yahan apna 16-digit App Password dalein
      },
    });

    await transporter.sendMail({
      from: '"EventSphere" <amandanish757@gmail.com>',
      to: email,
      subject: subject,
      text: text,
    });

    console.log("Email sent successfully to:", email);
  } catch (error) {
    console.log("Email not sent!", error);
  }
};

module.exports = sendEmail;