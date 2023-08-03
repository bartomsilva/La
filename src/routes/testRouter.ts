import express, { Request, Response } from "express"
export const testRouter = express.Router()

testRouter.get("/", (req: Request, res: Response) => {
  res.send('foi dada a largada....')
})
