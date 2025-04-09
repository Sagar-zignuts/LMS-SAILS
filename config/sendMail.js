const nodemailer = require("nodemailer");
require("dotenv").config();

module.exports = {
  sendMail: {
    transpoter: nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASSWORD,
      },
    }),
    sendWelcomeMessage: async function (email, username) {
      const mailOption = {
        from: process.env.SENDER_MAIL,
        to: email,
        message: `Hello ${username},\n\nWelcome to our Library Management System! Your account has been successfully created.`,
      };

      try {
        await this.transpoter.sendMail(mailOption);
        console.log("Email sent successfully");
      } catch (error) {
        console.error("Error sending email:", error);
      }
    },
  },
};
