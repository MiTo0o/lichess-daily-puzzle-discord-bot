import { connect } from "mongoose";

export const connectDatabase = async () => {
    // https://www.typescriptlang.org/docs/handbook/release-notes/typescript-2-0.html#non-null-assertion-operator
    await connect(process.env.MONGO_URI!);
    console.log("Database Connected!")
}