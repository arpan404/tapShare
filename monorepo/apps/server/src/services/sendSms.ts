import config from "../config";
import Twilio from "twilio";
import { DELIVERY_OPTIONS } from "../types";

const twilio = Twilio(config.TWILIO_SID, config.TWILIO_TOKEN, {
  lazyLoading: true,
});

const sendSMS = async (options: DELIVERY_OPTIONS) => {
  try {
    return await twilio.messages.create({
      body: `tapShare: ${options.text}`,
      from: config.TWILIO_NUMBER,
      to: `${options.to}`,
    });
  } catch (error) {
    console.log(error);
  }
};
export default sendSMS;
