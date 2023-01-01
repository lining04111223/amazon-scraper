import express from "express";

import request from "request-promise";

const app = express();
const PORT = process.env.PORT || 8000;
const apiKey = "05052269c75c642ef3bb0827de249a13";

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.get("/products/:productId", async (req, res) => {
  const { productId } = req.params;
  try {
    const response = await request(
      `http://api.scraperapi.com?api_key=${apiKey}&autoparse=true&url=http://www.amazon.com/dp/${productId}`
    );
    res.json(JSON.parse(response));
  } catch (error) {
    res.json(error);
  }
});

app.listen(PORT, () => console.log(`Serving is running on ${PORT}`));
