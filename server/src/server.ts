import { PrismaClient } from "@prisma/client";
import express from "express";
import dotenv from "dotenv"
import cors from "cors"
import cookieParser from "cookie-parser"
import authRoutes from "./routes/authRoutes"

dotenv.config()
const app = express()
const PORT= process.env.PORT || 3001


const corsOptions={
    origin:"http://localhost:3000",
    credentials:true,
    methods:["GET","POST","PUT","DELETE","OPTIONS"],
    allowedHeaders:["Content-Type","Authorization"]
}

app.use(cors(corsOptions))
app.use(express.json())
app.use(cookieParser())

export const prisma= new PrismaClient();

app.use("/api/auth",authRoutes);
app.get("/", (req, res) => {
    res.send("Hello World!");
})

app.listen(PORT,()=>{
   console.log(`Server is running on port ${PORT}`) 
})

process.on('SIGINT',async()=>{
    await prisma.$disconnect()
    process.exit()
})

