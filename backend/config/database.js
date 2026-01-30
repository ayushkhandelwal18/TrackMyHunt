const mongoose=require("mongoose");
const connectDatabase=()=>{
    mongoose.connect(process.env.DATABASE_URL).then(
        (data)=>{
            console.log(`Mongodb connected with servers: ${data.connection.host}`);
        });
}
module.exports=connectDatabase
    