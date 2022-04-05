import dotenv from "dotenv";
import { connect } from "mongoose";

dotenv.config();

export const connectDatabase = async () => {
  await connect(process.env.MONGO_URI as string);
  console.log("Database Connected!");
};
