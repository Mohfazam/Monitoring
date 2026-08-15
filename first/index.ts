import express  from "express";

import type { Request, Response, NextFunction } from "express";

import client from "prom-client"


const httpRequestDurationMicroSeconds = new client.Histogram({
    name: 'http_request_duration_ms',
    help: 'Duration of HTTP requests in ms',
    labelNames: ['method', 'route', 'code'],
    buckets: [0.1, 0.5, 5, 15, 100, 300, 500, 1000, 3000, 5000]
});

const requestsCounter = new client.Counter({
    name: 'http_requests_total',
    help: 'Total Number of HTTP requests',
    labelNames: ['method', 'route', 'status_code']
});

const activeRequestGauge = new client.Gauge({
    name:'active_request',
    help: 'Number of ative requests',
});

const metricMiddleware = (req: Request, res: Response, next: NextFunction) => {
    const startTime = Date.now();
    activeRequestGauge.inc();

    res.on('finish', () => {
        const endTime = Date.now();
        console.log(`Request took ${endTime - startTime}ms`);

        requestsCounter.inc({
            method: req.method,
            route: req.route ? req.route.path: req.path,
            status_code: res.statusCode
        });

        httpRequestDurationMicroSeconds.observe({
        method: req.method,
        route: req.route ? req.route.path : req.path,
        code: res.statusCode
    }, endTime - startTime);



    });

    

    res.on("close", () => {
    activeRequestGauge.dec();
  });

    next();
};



const app = express();
app.use(metricMiddleware);
app.get("/cpu", async (req, res) => {

    await new Promise(s => setTimeout(s, 5000));
    
    // for(let i = 0; i < 1000000; i++){
    //     let x = Math.random() + 87979797 * 99999 * Math.random();
    // }

    

    res.json({
        message: "cpu"
    });
    
});

app.get("/users", (req, res) => {
    

    res.json({
        message: "user"
    });
});

app.get("/metrics", async (req, res) => {
    const metrics = await client.register.metrics();
    res.set('Content-Type', client.register.contentType);
    res.end(metrics)
});

app.listen(3000, () => {
    console.log("Server Started")
});