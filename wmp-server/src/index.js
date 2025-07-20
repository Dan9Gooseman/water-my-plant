import express from "express";
import dotenv from "dotenv";
import { Server } from "socket.io";
import connect_to_db from "./configs/connnection-configs.js";
import cors from "cors";
import { createServer } from "node:http";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";
import WifiRecord from "./models/wifiRecords.js";
import process from "node:process";
// import WifiRecordController from "./controllers/WifiRecordController.js";
import createWifiRouter from "./routes/routes.js";

dotenv.config()
const __dirname = dirname(fileURLToPath(import.meta.url));

const application = express();
application.use(cors());
application.use(express.json());
application.use(express.urlencoded({extended:true}));
// application.use(express.static(join(__dirname, "public")))
application.use(express.static(__dirname + "/public"));


//server & socket init
const server = createServer(application);
const io = new Server(server);
process.on("warning", warning => console.warn(warning.name + "|" + warning.message + "|" + warning.stack));

connect_to_db(process.env.dbURL);
io.on("connection", async (socket) => {
    console.log("Client connected.");

    //send past data
    const latestData = await WifiRecord.find().sort({ time: -1}).limit(50);
    socket.emit("initial-data", latestData.reverse());

    //listen to esp
    socket.on("wifi-data", async (data) => {
        const record = new WifiRecord(data);
        await record.save();

        io.emit("wifi-data", record);
        console.log("New data recieved: ", data);
    })

    socket.on("disconnect", () => {
        console.log("Client disconnected.");
    });
});

//route handling
// const wifiRouter = express.Router();
// const wifiRecordController = new WifiRecordController(io);

// wifiRouter.post("/add-wifi", wifiRecordController.createWifiRecord);
// wifiRouter.get("/get-wifi", wifiRecordController.getWifiRecord);
// application.use("/api/wifi", wifiRouter);
const wifiRouter = createWifiRouter(io);
application.use("/api/wifi", wifiRouter);

server.listen(process.env.PORT, process.env.IP , () => {
    console.log("Server running on port " + process.env.PORT);
})
