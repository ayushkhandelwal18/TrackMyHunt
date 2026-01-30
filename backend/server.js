//This file serves as the main entry point, where the server is started.
const dotenv =require("dotenv")
const app= require("./app");


const connectDatabase=require("./config/database")

//config
dotenv.config();

//CONNECTING TO DATABASE
connectDatabase();


const server=app.listen(process.env.PORT,()=>{
    console.log(`Server is running on http://localhost:${process.env.PORT}`);
})
