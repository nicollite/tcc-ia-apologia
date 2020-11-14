import express from "express";
import { PredictionServiceClient, protos } from "@google-cloud/automl";
import cors from "cors";
import bodyParser from "body-parser";

const app = express();

app.use(cors());
app.use(bodyParser.json());

app.post("/", async (req, res) => {
  console.log({ body: req.body });

  // Get the text
  const { text } = req.body;

  // Instance the client and call the auto ml api
  const client = new PredictionServiceClient();
  const [predictionResponse] = await client.predict({
    name: client.modelPath(
      process.env.PROJECT_ID,
      process.env.COMPUTE_REGION,
      process.env.MODEL_ID,
    ),
    payload: {
      textSnippet: {
        content: text,
        mimeType: "text/plain",
      },
    },
  });

  // Send the automl response
  res.send(predictionResponse);
});

export default app;
