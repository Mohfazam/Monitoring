import express  from "express";

import type { Request, Response, NextFunction } from "express";

import promClient from "prom-client"
import client from "prom-client"


const requestsCounter = new client.Counter({
    name: 'http_requests_total',
    help: 'Total Number of HTTP requests',
    labelNames: ['method', 'route', 'status_code']
});

const requestCountMiddleware = (req: Request, res: Response, next: NextFunction) => {
    const startTime = Date.now();

    res.on('finish', () => {
        const endTime = Date.now();
        console.log(`Request took ${endTime - startTime}ms`);

        requestsCounter.inc({
            method: req.method,
            route: req.route ? req.route.path: req.path,
            status_code: res.statusCode
        });
    });

    next();
};


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

app.get("/metric", (req, res) => {

})

app.listen(3000, () => {
    "Server Started"
});