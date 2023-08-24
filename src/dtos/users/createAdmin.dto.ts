import z from 'zod'

export interface CreateAdminInputDTO {
  id: string,
  isAdmin: boolean,
  token: string
}

export const CreateAdminSchema = z.object({
  id: z.string(
    {
      required_error: "'id' é obrigatório",
      invalid_type_error: "'id' deve ser do tipo string"
    }).min(2, "'id' deve ter no mínimo 2 caracteres"),
  isAdmin: z.boolean({
    required_error: "'isAdmin' é obrigatório",
    invalid_type_error: "'isAdmin' deve ser do tipo boolean"
  }),
  token: z.string({
    required_error: "'token' é obrigatório",
    invalid_type_error: "'token' deve ser do tipo string"
  }),

}).transform(data => data as CreateAdminInputDTO)