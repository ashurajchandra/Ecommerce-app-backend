import { Request, Response, NextFunction } from "express"
import CustomError from "../errors/custom-error"

export const errorHandler = (error: Error, req: Request, res:Response, next: NextFunction) => {
    const isProdEnv = process.env.NODE_ENV === 'production';
      if(error instanceof CustomError) {
        return res.status(error.statusCode).json({
            msg: error.message,
            data: isProdEnv ? null: error.stack
        })
      }
      return res.status(500).json({
        msg: error.message,
        data: isProdEnv ? null: error.stack
    })
}