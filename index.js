const express = require("express");
const app = express();
const cors = require('cors');
const dotenv = require("dotenv")
dotenv.config();
const PORT = process.env.PORT || 3000;
const fs = require('fs');
const path = require('path');

app.use(cors({
    origin: "*"
}))

app.use(express.json());

app.post("/newfile", async function(req,res) {
try {
    const date = new Date;
    const currentDate=`${date.getDate()}-${date.getMonth()}-${date.getFullYear()}`;
    const currentTime= `${date.getHours()}-${date.getMinutes()}-${date.getSeconds()}`;
    
    
    const timestamp = Date.now();

   fs.mkdir('Text folder', (err) => {
        if (err) {
            console.log(err);
        } else {
            fs.writeFile(`./Text folder/${currentDate}-${currentTime}.txt`, new Intl.DateTimeFormat('en-US', { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit' }).format(timestamp), (err) => {
                if (err) {
                    console.log(err);
                } else {
                    console.log('Successfully created file.');
                }
            });
        }
    })
    res.json({
        message:"File Created"
    })
} catch (error) {
    console.log(error)
}
})

app.get("/folder",async function (req,res) {
    let filesArray = [],

     n =-1;

    fs.readdirSync(`./Text folder`).forEach((file)=> {
        n++;
        filesArray[n] = file;
    });
    try {
        console.log(filesArray);
        res.json(filesArray)
    } catch (error) {
        console.log(error)
    }
   
})

app.listen(PORT, function () {
    console.log(`The app is listening in port ${PORT}`)
})