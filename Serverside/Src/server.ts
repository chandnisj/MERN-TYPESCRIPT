import express from "express";
const app = express();
const port = 5000;

app.get("/", (req, res) => {
  res.send("Hello world");
});

app.listen(port, () => {
  console.log(`server listening on ${port}`);
});
//4ww886Mufdhq1Eog