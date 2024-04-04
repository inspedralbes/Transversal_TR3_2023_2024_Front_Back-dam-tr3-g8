const express = require("express");
const http = require("http");
const cors = require("cors");
const app = express();
const server = http.createServer(app);
app.use(express.json({ strict: false }))
app.use(cors(
  {
    "origin": "*",
    "methods": "GET,HEAD,PUT,PATCH,POST,DELETE",
    "preflightContinue": false,
    "optionsSuccessStatus": 204
  }
))


const PORT = 3822;



server.listen(PORT, async () => {
  //iniciem les connexions a mongo per no alentir les operacions mes endavant

  console.log(`Server is running on http://localhost:${PORT}`);
});
