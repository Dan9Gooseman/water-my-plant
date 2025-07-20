import WifiRecord from "../models/wifiRecords.js";

class WifiRecordController {
    constructor(io) {
        this.io = io;
        this.createWifiRecord = this.createWifiRecord.bind(this);
    }
    async createWifiRecord(req, res) {
        try {
            const data = req.body;
            const record = new WifiRecord(data);
            await record.save();
            this.io.emit("wifi-data", record);
            res.status(200).json({message: "Saved ", record});
        } catch (err) {
            console.log(err);
            res.status(500).json({ message: "Cannot save data ", error: err.message });
        }
    }

    async getWifiRecord(req, res) {
        try {
            const data = await WifiRecord.find().sort({ time: -1}).limit(50);
            res.status(200).json({data: data.reverse()});
        } catch (error) {
            res.status(500).json({message: "Cannot get data ", error: error.message});
        }
    }

}

export default WifiRecordController;