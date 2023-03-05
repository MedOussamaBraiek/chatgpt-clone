// 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
require("dotenv").config();
const { Configuration, OpenAIApi } = require("openai");
const express = require("express");
const configuration = new Configuration({
  organization: "org-DbkFFXcZcPz8uc2EelZnAfon",
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
const port = 5000;

app.use(bodyParser.json());
app.use(cors());

app.post("/", async (req, res) => {
  const { message } = req.body;
  console.log(message);
  const response = await openai.createCompletion({
    model: "text-davinci-003",
    prompt: `${message}`,
    max_tokens: 100,
    temperature: 0.5,
  });
  console.log(response.data.choices[0].text);
  res.json({
    message: response.data.choices[0].text,
  });
});

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`);
});
