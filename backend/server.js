
const dotenv =require("dotenv")
const app= require("./app");


const connectDatabase=require("./config/database")

//config
dotenv.config();

//CONNECTING TO DATABASE
connectDatabase();


const PORT = process.env.PORT || 5000;

const server = app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
