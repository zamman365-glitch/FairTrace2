require("dotenv").config();
const express = require("express");
const cors = require("cors");
const http = require("http");
const { Server } = require("socket.io");

const connectDB = require("./config/db");

const uploadRoutes = require("./routes/uploadRoutes");
const auditRoutes = require("./routes/auditRoutes");
const reportRoutes = require("./routes/reportRoutes");
const progressSocket = require("./sockets/progressSocket");

const app = express();
const server = http.createServer(app);

const io = new Server(server, {
  cors: { origin: "*" }
});

/* DB */
connectDB();

/* Middlewares */
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/* Socket */
progressSocket(io);

/* Root Route */
app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "Bias Autopsy Engine API Running",
    port: process.env.PORT || 5000
  });
});

/* API Routes */
app.use("/api", uploadRoutes);
app.use("/api", auditRoutes);
app.use("/api", reportRoutes);

/* 404 */
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "Route not found"
  });
});

/* Error Handler */
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({
    success: false,
    message: "Internal Server Error"
  });
});

/* Start Server */
const PORT = process.env.PORT || 5000;

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});