import { SendEmailCommand } from "@aws-sdk/client-ses";
import { sesClient } from "../configs/sesClient";
import throttledQueue from "throttled-queue";

const throttle = throttledQueue(1, 1000, true);

export const createSendEmail = (email: string) => {
  const params = {
    Destination: {
      ToAddresses: [email],
    },
    Message: {
      Body: {
        Html: {
          Charset: "UTF-8",
          Data: `
                    < h1>Hi,<h1>
                    <p>Welcome to Shuru!<p>
                    `,
        },
        Text: {
          Charset: "UTF-8",
          Data: "Hi,/n Welcome to Shuru!",
        },
      },
      Subject: {
        Charset: "UTF-8",
        Data: `Shuru '24`,
      },
    },
    Source: "techteam.sa@srmist.edu.in",
  };

  throttle(() => {
    try {
      return sesClient.send(new SendEmailCommand(params));
    } catch (err) {
      console.log(`Error sending email to ${email}`, err);
    }
  });
};
