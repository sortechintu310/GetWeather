import axios from "axios";
import bodyParser from "body-parser";
import express from  "express";
import dotenv from "dotenv";


dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended:true}));

const apiKey = process.env.APIKEY;
const units = 'metric';

app.post("/getWheather",async (req,res)=>{
    let city = req.body.cityy;
    try{
        const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=${units}&appid=${apiKey}`);
        const result = response.data; //Axios gives data as a js object so no need to json.parse()
        res.render("index.ejs",{data: result});

    }catch(err){
        console.error(err.messsage);
        res.render("error.ejs");
    }
});

app.get("/",async (req,res)=>{
    try{
        const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=Delhi&units=${units}&appid=${apiKey}`);
        const result = response.data; //Axios gives data as a js object so no need to json.parse()
        res.render("index.ejs",{data: result});

    }catch(err){
        console.error(err.messsage);
    }
});

app.listen(port,()=>{
    console.log(`Listening on ${port}....`);
});