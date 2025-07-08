import express from "express";
import { createServer } from "node:http";
import dotenv from "dotenv";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";
import { Server } from "socket.io";
// import connect_to_db from "./configs/connnection-configs.js";
import cors from "cors";

dotenv.config()

const application = express();
application.use(cors());
const server = createServer(application);
const socketio = new Server(server);

const __dirname = dirname(fileURLToPath(import.meta.url));

// application.use(express.static(join(__dirname, "public")))

application.get("/", (req, res) => {
    res.sendFile(join(__dirname, "/serving/index.html"));
});

socketio.on("connection", (socket) => {
    console.log("Một người dùng đã kết nối");
    socket.broadcast.emit('hi');
    socket.on("disconnect", () => {
        console.log("Người dùng đã ngắt kết nối");
    });
    socket.on("chat message", (msg) => {
        socketio.emit('chat message', msg);
        console.log("Thông điệp: " + msg);
    });
}); 
server.listen(process.env.PORT, () => {
    console.log("Server đang chạy ở cổng " + process.env.PORT);
})

// application.use(express.urlencoded({extended:true}));
// application.use(express.json());
// process.on('Cảnh báo', error => console.warn(error.stack));
// connect_to_db(process.env.dbURL);

// application.listen(process.env.PORT, () => {
//     console.log("Server đang chạy trên cổng " + process.env.PORT)
// })