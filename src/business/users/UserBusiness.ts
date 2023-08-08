import { UserDataBase } from "../../database/users/UserDataBase"
import { GetUsersInputDTO, GetUsersOutputDTO } from "../../dtos/users/getUsers.dto"
import { LoginInputDTO, LoginOutputDTO } from "../../dtos/users/login.dto"
import { SingUpInputDTO, SingUpOutputDTO } from "../../dtos/users/singUp.dto"
import { BadRequestError } from "../../error/BadRequest"
import { ConflictError } from "../../error/ConflictError"
import { TokenPayload, USER_ROLES, UserDB } from "../../models/users/User"
import { HashManager } from "../../services/HashManager"
import { IdGenerator } from "../../services/IdGenarator"
import { TokenManager } from "../../services/TokenManager"

export class UserBusiness {
  constructor(
    private userDataBase: UserDataBase,
    private idGenerator: IdGenerator,
    private hashManager: HashManager,
    private tokenManager: TokenManager
  ) { }

  //=========== GET USER
  public getUsers = async (input: GetUsersInputDTO): Promise<GetUsersOutputDTO[]> => {

    const { q, token } = input

    // geramos o payload a partir do token
    const payload = this.tokenManager.getPayload(token)

    // validamos a assinatura do token (vem null se inválido)
    if (payload === null) {
      throw new BadRequestError("token inválido")
    }

    // somente admins tem acesso a este recurso
    if (payload.role != USER_ROLES.ADMIN) {
      throw new BadRequestError("somente admins podem acessar esse recurso")
    }

    const resultDB: UserDB[] = await this.userDataBase.getUser(q)

    const output: GetUsersOutputDTO[] = resultDB.map((user) => {
      return {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
        createdAt: user.created_at
      }
    })
    return output

  }

  //=========== SING UP
  public singUp = async (input: SingUpInputDTO): Promise<SingUpOutputDTO> => {

    const { name, email, password } = input

    const newId = this.idGenerator.generate()
    const hashedPassword = await this.hashManager.hash(password)

    const newUserDB: UserDB = {
      id: newId,
      name,
      email,
      password: hashedPassword,
      role: USER_ROLES.NORMAL,
      created_at: new Date().toISOString()
    }
    // verifica se o email já está em uso
    const userExist = await this.userDataBase.findUser(email)
    if (userExist != undefined) {
      throw new ConflictError("'email' já cadastrado")
    }

    // inseri o usuário no banco de dados
    await this.userDataBase.insertUser(newUserDB)

    // modelagem do objeto (payload)
    const tokenPayload: TokenPayload = {
      id: newUserDB.id,
      name: newUserDB.name,
      role: newUserDB.role
    }

    // criação do token string a partir do payload
    const token = this.tokenManager.createToken(tokenPayload)

    // retorno GERADO ( SERVICE )
    const output: SingUpOutputDTO = { token: token }

    return (output)

  }

  //========== LOGIN
  public login = async (input: LoginInputDTO): Promise<LoginOutputDTO> => {

    const { email, password } = input

    const userDB: UserDB = await this.userDataBase.findUser(email)
    if (!userDB) {
      throw new BadRequestError("Usuário não cadastrado")
    }
    const passworValid = await this.hashManager.compare(password, userDB.password)
    if (!passworValid) {
      throw new BadRequestError("Senha invalida")
    }

    // modelagem do objeto (payload)
    const tokenPayload: TokenPayload = {
      id: userDB.id,
      name: userDB.name,
      role: userDB.role
    }

    // criação do token string a partir do payload
    const token = this.tokenManager.createToken(tokenPayload)

    const output: LoginOutputDTO = { token: token }

    return output

  }
}