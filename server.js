const path = require("path");
const express = require("express");

const app = express();
const publicDir = path.join(__dirname, "public");

app.use(express.static(publicDir));

app.get("*", (req, res) => {
  const file = path.join(publicDir, "index.html");
  res.sendFile(file);
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`ZedEvents website on port ${port}`);
});
