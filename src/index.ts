import express from "express"
import cors from "cors"
import dotenv from 'dotenv'

dotenv.config()

const server = express()
server.use(express.json())
server.use(cors())

const PORT = Number(process.env.PORT) || 3000 
server.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`)
})


