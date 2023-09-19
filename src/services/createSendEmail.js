"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createSendEmail = void 0;
const client_ses_1 = require("@aws-sdk/client-ses");
const sesClient_1 = require("../configs/sesClient");
const throttled_queue_1 = __importDefault(require("throttled-queue"));
const throttle = (0, throttled_queue_1.default)(1, 1000, true);
const createSendEmail = (email) => {
    const params = {
        Destination: {
            ToAddresses: [email],
        },
        Message: {
            Body: {
                Html: {
                    Charset: "UTF-8",
                    Data: `
                    <h1>Hi,<h1>
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
            return sesClient_1.sesClient.send(new client_ses_1.SendEmailCommand(params));
        }
        catch (err) {
            console.log(`Error sending email to ${email}`, err);
        }
    });
};
exports.createSendEmail = createSendEmail;
