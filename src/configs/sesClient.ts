import { SESClient } from "@aws-sdk/client-ses";
import * as dotenv from "dotenv";

dotenv.config();

const sesClient = new SESClient({ region: process.env.REGION });
export { sesClient };
