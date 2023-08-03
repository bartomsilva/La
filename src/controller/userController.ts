import { Request, Response } from "express"
import { SingUpSchema } from "../dtos/users/singUp.dto"
import { UserBusiness } from "../business/UserBusiness";
import { handlerError } from "../error/handlerError";
import { GetUsersSchema } from "../dtos/users/getUsers.dto";
import { LoginSchema } from "../dtos/users/login.dto";

export class UserController {
  constructor(private userBusiness: UserBusiness) { }


  //========== GET USERS
  public getUsers = async (req: Request, res: Response): Promise<void> => {
    try {

      const input = GetUsersSchema.parse({
        q: req.query.q, 
        token: req.headers.authorization
      })
      
      const output = await this.userBusiness.getUsers(input)

      res.status(200).send(output)

    } catch (error) {
      handlerError(res, error)
    }
  }

  //=========== SING UP
  public singUp = async (req: Request, res: Response): Promise<void> => {

    try {
      const input = SingUpSchema.parse({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password
      })

      const output = await this.userBusiness.singUp(input);

      res.status(201).send(output)

    } catch (error) {
      handlerError(res, error)
    }
  }

  //========== LOGIN
  public login = async (req: Request, res: Response): Promise<void> => {
    try {

      const input =  LoginSchema.parse({
        email: req.body.email,
        password: req.body.password
      })

      const output = await this.userBusiness.login(input)

      res.status(200).send(output)

    } catch (error) {
      handlerError(res, error)
    }
  }
}