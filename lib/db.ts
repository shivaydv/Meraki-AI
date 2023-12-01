import mongoose from "mongoose";

const connect = async () => {
  try {
    await mongoose.connect(String(process.env.MONGO_URL));
    console.log("Database Connected Succesfully");
  } catch (error) {
    console.log(error);
  }
};

export default connect;
