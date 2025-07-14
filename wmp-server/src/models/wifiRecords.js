import mongoose from "mongoose";

const Schema = mongoose.Schema;
const wifiRecordSchema = new Schema({
  // id:{type: mongoose.Types.ObjectId, required: true},
  ssid: { type: String, required: true },
  rssi: { type: Number, required: true },
  time: { type: Date, default: Date.now},
});

const WifiRecord = mongoose.model("WifiRecord", wifiRecordSchema);

export default WifiRecord;