import nodemailer from "nodemailer";
import config from "../config";
import { DELIVERY_OPTIONS } from "@repo/types";

const sendEmail = async (options) => {
  try {
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      auth: {
        user: config.EMAIL,
        pass: config.EMAIL_APP_PASSWORD,
      },
    });
    const mailOptions = {
      from: "tapshare<tapshare@gmail.com>",
      to: options.to,
      subject: options.subject,
      text: options.text,
    };

    transporter
      .sendMail(mailOptions)
      .then((info) => {
        console.log("Email sent: " + info.response);
      })
      .catch((err) => {
        console.log(err);
      });
  } catch (error) {
    console.log(error);
  }
};
export default sendEmail;
