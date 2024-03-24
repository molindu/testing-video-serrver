// const app = require("express")();
// const server = require("http").createServer(app);
// const cors = require("cors");

// const io = require("socket.io")(server, {
// 	cors: {
// 		origin: "*",
// 		methods: [ "GET", "POST" ]
// 	}
// });

// app.use(cors());

// const PORT = process.env.PORT || 3000;

// app.get('/', (req, res) => {
// 	res.send('Running');
// });

// io.on("connection", (socket) => {
// 	socket.emit("me", socket.id);

// 	socket.on("disconnect", () => {
// 		socket.broadcast.emit("callEnded")
// 	});

// 	socket.on("callUser", ({ userToCall, signalData, from, name }) => {
// 		io.to(userToCall).emit("callUser", { signal: signalData, from, name });
// 	});

// 	socket.on("answerCall", (data) => {
// 		io.to(data.to).emit("callAccepted", data.signal)
// 	});
// });

// server.listen(PORT, () => console.log(`Server is running on port ${PORT}`));

// const functions = require("firebase-functions");
// const express = require("express");
// const cors = require("cors");
// const { Server } = require("socket.io");

// const app = express();
// app.use(cors());

// // Define your routes
// app.get("/", (req, res) => {
//   res.send("Running");
// });

// // Set up Socket.io server
// const server = express()
//   .use(app)
//   .listen();

// const io = new Server(server, {
//   cors: {
//     origin: "*",
//     methods: ["GET", "POST"]
//   }
// });

// io.on("connection", (socket) => {
//   socket.emit("me", socket.id);

//   socket.on("disconnect", () => {
//     socket.broadcast.emit("callEnded")
//   });

//   socket.on("callUser", ({ userToCall, signalData, from, name }) => {
//     io.to(userToCall).emit("callUser", { signal: signalData, from, name });
//   });

//   socket.on("answerCall", (data) => {
//     io.to(data.to).emit("callAccepted", data.signal)
//   });
// });

// Define HTTP trigger for your Express app
// exports.app = functions.https.onRequest(app);

const path = require("path");
const { createServer } = require("http");

const express = require("express");
const { getIO, initIO } = require("./socket");

const app = express();

app.use("/", express.static(path.join(__dirname, "static")));

const httpServer = createServer(app);

let port = process.env.PORT || 5000;

initIO(httpServer);

httpServer.listen(port);
console.log("Server started on ", port);

getIO();
