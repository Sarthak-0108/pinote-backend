import mongoose from "mongoose";

const connectToDb = async () => {
    try {
        mongoose.connect(process.env.MONGO_URI)
        console.log("connected to db")
    } catch (error) {
        console.log('failed to connect to database', error)
    }
}

export default connectToDb;