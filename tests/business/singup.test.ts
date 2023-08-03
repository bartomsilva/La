import { UserBusiness } from "../../src/business/UserBusiness"
import { HashManagerMock } from "../mocks/HashManagerMock"
import { IdGeneratorMock } from "../mocks/IdGeneratorMock"
import { TokenManagerMock } from "../mocks/TokenManagerMock"
import { UserDataBaseMock } from "../mocks/UserDataBaseMock"
import { SingUpInputDTO, SingUpSchema } from "../../src/dtos/users/singUp.dto"
import { ZodError } from "zod"

describe("Teste da signup", () => {

  const userBusiness = new UserBusiness(
    new UserDataBaseMock(),
    new IdGeneratorMock(),
    new HashManagerMock(),
    new TokenManagerMock()
  )

  test("deve retornar um token", async () => {
    const input: SingUpInputDTO = {

      name: "Linda Roberts",
      email: "linda@email.com",
      password: "Linda123@"
    }
    const output = await userBusiness.singUp(input)
    expect(output).toEqual({ token: "token-mock" })
  })

  test("deve retornar error em name" , async ()=>{
    try {
      const input: SingUpInputDTO = {

        name: "L",
        email: "linda@email",
        password: "Linda123@"
      }

      SingUpSchema.parse(input)

    } catch (error) {
      if(error instanceof ZodError) {
        expect(error.issues[0].message).toBe("'name' deve ter no mínimo 2 caracteres")
      }
    }
  })

  test("deve retornar error: email invalido", async ()=>{
    try {
      const input: SingUpInputDTO = {

        name: "Linda Roberts",
        email: "linda@email",
        password: "Linda123@"
      }

      SingUpSchema.parse(input)

    } catch (error) {
      if(error instanceof ZodError) {
        expect(error.issues[0].message).toBe("'email' invalido")
      }
    }
  })
  test("deve retornar erro na password", async ()=>{
    try {
      const input: SingUpInputDTO = {

        name: "Linda Roberts",
        email: "linda@email.com",
        password: "Linda123"
      }

      SingUpSchema.parse(input)

    } catch (error) {
      if(error instanceof ZodError) {
        expect(error.issues[0].message).toBe("'password' deve ter entre 6 e 15 caracteres, incluindo números, letras minusculas e no mínimo uma letra maiuscula, e um caracter especial")
      }
    }
  })


})