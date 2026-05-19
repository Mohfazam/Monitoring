import type { Request, Response, NextFunction } from "express";

export function middleWare(req: Request, res: Response, next: NextFunction) {
  const startTime = Date.now();
    next();
  const endTime = Date.now();

  console.log(`Time it took ${endTime - startTime}ms`);
}
