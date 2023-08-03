import express from "express"

import { UserController } from "../../controller/users/UserController"
import { UserBusiness } from "../../business/users/UserBusiness"
import { UserDataBase } from "../../database/users/UserDataBase"
import { IdGenerator } from "../../services/IdGenarator"
import { HashManager } from "../../services/HashManager"
import { TokenManager } from "../../services/TokenManager"

export const userRouter = express.Router()

const userController = new UserController
  (
    new UserBusiness(
      new UserDataBase(),
      new IdGenerator(),
      new HashManager(),
      new TokenManager()
    ),
  )

//================== GET USER
userRouter.get("/", userController.getUsers)

//================== SING UP
userRouter.post("/singup", userController.singUp)

//=================== LOGIN
userRouter.post("/login", userController.login)
