import type { Request, Response, NextFunction } from "express";

export function middleWare(req: Request, res: Response, next: NextFunction) {
  const startTime = Date.now();
    res.on("finish", () => {
        const endTime = Date.now();

        console.log(`Time it took ${endTime - startTime}ms for ${req.method} methond for the route ${req.path} with status ${res.statusCode}`);
    });


    next();
    

}
