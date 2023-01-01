import dotenv from "dotenv";
dotenv.config();
import express from "express";

import request from "request-promise";

const app = express();
const PORT = process.env.PORT || 8000;
const apiKey = process.env.apiKey;

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello World");
});

//get product details
app.get("/products/:productId", async (req, res) => {
  const { productId } = req.params;
  //const { apiKey } = req.query;
  try {
    const response = await request(
      `http://api.scraperapi.com?api_key=${apiKey}&autoparse=true&url=http://www.amazon.com/dp/${productId}`
    );
    res.json(JSON.parse(response));
  } catch (error) {
    res.json(error);
  }
});

//get product reviews
app.get("/products/:productId/reviews", async (req, res) => {
  const { productId } = req.params;
  //const { apiKey } = req.query;
  try {
    const response = await request(
      `http://api.scraperapi.com?api_key=${apiKey}&autoparse=true&url=http://www.amazon.com/product-reviews/${productId}`
    );
    res.json(JSON.parse(response));
  } catch (error) {
    res.json(error);
  }
});

//get product offers
app.get("/products/:productId/offers", async (req, res) => {
  const { productId } = req.params;
  //const { apiKey } = req.query;
  try {
    const response = await request(
      `http://api.scraperapi.com?api_key=${apiKey}&autoparse=true&url=http://www.amazon.com/gp/offer-listing/${productId}`
    );
    res.json(JSON.parse(response));
  } catch (error) {
    res.json(error);
  }
});

//get search results
app.get("/search/:searchQuery", async (req, res) => {
  const { searchQuery } = req.params;
  //const { apiKey } = req.query;
  try {
    const response = await request(
      `http://api.scraperapi.com?api_key=${apiKey}&autoparse=true&url=http://www.amazon.com/s?k=/${searchQuery}`
    );
    res.json(JSON.parse(response));
  } catch (error) {
    res.json(error);
  }
});

app.listen(PORT, () => console.log(`Serving is running on ${PORT}`));
