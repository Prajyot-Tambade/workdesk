import mongoose from "mongoose";

export const connect = async() => {
  try {
    mongoose.connect(process.env.MONGO_URI!, {
      dbName: "workdesk",
      
    }) 
    // connection object for listing to db events
    const connection = mongoose.connection
  } catch (error) {
    console.error('Error conecting Database: ', error)
  }
}