import express  from "express";
import { middleWare } from "./middleware";

const app = express();
app.use(middleWare);
app.get("/cpu", (req, res) => {
    
    for(let i = 0; i < 1000000; i++){
        let x = Math.random() + 87979797 * 99999 * Math.random();
    }

    

    res.json({
        message: "cpu"
    });
    
});

app.get("/users", (req, res) => {
    

    res.json({
        message: "user"
    });
});

app.listen(3000, () => {
    "Server Started"
});