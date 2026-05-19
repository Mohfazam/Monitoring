import express  from "express";

const app = express();

app.get("/cpu", (req, res) => {
    const startTime = Date.now();
    for(let i = 0; i < 1000000; i++){
        Math.random();
    }

    

    res.json({
        message: "cpu"
    });
    const endTime = Date.now();

    console.log(`Time it took ${endTime - startTime}ms`);
});

app.get("/users", (req, res) => {
    

    res.json({
        message: "user"
    });
});

app.listen(3000, () => {
    "Server Started"
});