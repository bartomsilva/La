import z, { string } from "zod"
import { USER_ROLES } from "../../models/User"

export interface GetUsersInputDTO {
  q: string
  token: string
}

export interface GetUsersOutputDTO {
  id: string,
  name: string,
  email: string,
  role: USER_ROLES,
  createdAt: string
}

export const GetUsersSchema = z.object({
  q: z.string().min(1).optional(),
  token: z.string().min(1), // adicionamos token também no schema
}).transform(data => data as GetUsersInputDTO)