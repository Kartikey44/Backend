import express from "express"
import connectDB from "../src/db/index.js";
import dotenv from 'dotenv'
dotenv.config({
    path:'./env'
})

const app = express()

    
connectDB()
    .then(() => {
        app.listen(process.env.PORT || 8000, () =>
        {
            console.log(`server is running at ${process.env.PORT}`)
        })
    })
    .catch((err) => {
        console.log("Connection failed:", err);
    })



// (async () => {
//     try {
//         await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`)
//         app.on("error", () => {
//             console.log("ERROR", error);
//             throw error
//         })
//         app.listen(process.env.PORT, () => {
//             console.log(`server is using ${process.env.PORT}`);
//         })
//     } catch (error) {
//         console.error("ERROR", error)
//         throw err
//     }
// })