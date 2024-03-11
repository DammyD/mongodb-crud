import mongoose from "mongoose";

const connectMongoDB = async() => {
    try {
       await mongoose.connect(process.env.MONGODB_URI);
        console.log("Connected to MongoDB");
    } catch (error) {
        comsole.log(error);
    }
};

// A model is basically a structure for our connection

export default connectMongoDB;