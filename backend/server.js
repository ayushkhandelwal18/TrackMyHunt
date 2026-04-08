const dotenv = require("dotenv");
dotenv.config();

const app = require("./app");
const connectDatabase = require("./config/database");

// CONNECTING TO DATABASE
connectDatabase();


const PORT = process.env.PORT || 5000;

const server = app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
