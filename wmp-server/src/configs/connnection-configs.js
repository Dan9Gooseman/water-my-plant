import mongoose from "mongoose";

export default async function connect_to_db(dbURL) {
    try {
        await mongoose.connect(dbURL)
        console.log("Kế nối database thành công");
        console.log("--------------------------");
    }
    catch(error) {
        console.log("Kết nối database thất bại");
        console.log(error);
        console.log("-------------------------");
    }
}