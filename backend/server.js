const express = require("express");
const http = require("http");
const socketio = require("socket.io");
const AWS = require("aws-sdk");

AWS.config.update({ region: "ap-south-1" });
const s3 = new AWS.S3();

const app = express();
const server = http.createServer(app);
const io = socketio(server, { cors: { origin: "*" } });

app.get("/", (req, res) => {
  res.send("Bird Monitoring Backend Running");
});

// simulate bird image upload
app.get("/upload", async (req, res) => {
  const params = {
    Bucket: "free-bird-images-bucket",
    Key: `bird-${Date.now()}.txt`,
    Body: "Bird detected",
  };
  await s3.upload(params).promise();
  res.send("Image uploaded to S3");
});

io.on("connection", (socket) => {
  setInterval(() => {
    socket.emit("bird-event", {
      bird: "Sparrow",
      time: new Date(),
      feedLevel: Math.floor(Math.random() * 100),
    });
  }, 5000);
});

server.listen(3000, () =>
  console.log("Server running on port 3000")
);
