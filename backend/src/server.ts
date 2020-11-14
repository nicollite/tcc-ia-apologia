import app from "./app";
import dotenv from "dotenv";
import { install } from "source-map-support";

// Use source map support
install();

dotenv.config();

// Set the port and host
const port = 8080;
const host = "localhost";

// Set the listener for the app
app.listen(port, host, () => {
  console.log(`Listening on ${host}:${port}`);
});
