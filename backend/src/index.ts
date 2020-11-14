import { https } from "firebase-functions";
import endpointsApp from "./app";
import dotenv from "dotenv";
import { install } from "source-map-support";

// Use source map support
install();

dotenv.config();

export const endpoints = https.onRequest(endpointsApp);
