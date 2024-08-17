import mongoose from "mongoose";

export async function connectDb() {
   try {
      await mongoose.connect(process.env.MONGO_URL!);
      const connection = mongoose.connection;
      connection.on('connected', () => {
         console.log("Mongodb connected successfully ")
      })

      connection.on('error', (err) => {
         console.log("Mongodb connection error ", err.message)
      })
   } catch (error: any) {
      console.log("Mongodb connection error ", error.message)
   }
}