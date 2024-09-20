import mongoose from "mongoose";

const connectToDatabase = async () => {
  const MONGODB_URI = process.env.MONGODB_URI;

  if (!MONGODB_URI) {
    console.log("⚠️ Missing MONGODB_URI in .env file");
    process.exit(1);
  }

  try {
    const database = await mongoose.connect(MONGODB_URI);
  } catch (error) {
    console.log("⚠️ Unable to connect to the database.", error);
  }

  console.log("⚡ Database connected");
};

export default connectToDatabase;
