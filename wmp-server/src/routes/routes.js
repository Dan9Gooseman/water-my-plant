import express from "express";
import WifiRecordController from "../controllers/WifiRecordController.js";

export default function createWifiRouter(io) {
    const wifiRouter = express.Router();
    const wifiRecordController = new WifiRecordController(io);

    wifiRouter.post("/add-wifi", wifiRecordController.createWifiRecord);
    wifiRouter.get("/get-wifi", wifiRecordController.getWifiRecord);

    return wifiRouter;
}
