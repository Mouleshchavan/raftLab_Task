const express =require("express")
const app = express();
// const mysql = require("mysql2")
const cors = require("cors")

require("./db/conn")
const router = require("./routes/router")
const port = 3000;

app.get("/",(req,res)=>{
    res.send("server start")
})

app.use(express.json());
app.use(cors());
app.use(router);

app.listen(port,()=>{
    console.log("server starts at port no:"+port)
})