const express = require("express");
const { createProxyMiddleware } = require("http-proxy-middleware");
const app = express();
const cors = require("cors");
app.use(cors());

app.use(
  "/n2yo",
  createProxyMiddleware({
    target: "https://api.n2yo.com",
    changeOrigin: true,
    pathRewrite: {
      "^/n2yo": "", // Remove /n2yo from the request URL
    },
  })
);

app.get("/hello", (req, res) => {
  res.send("Hello");
});

app.listen(5000, () => {
  console.log("Proxy server running on http://localhost:5000");
});
