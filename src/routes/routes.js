import { generateInstance } from "../factories/saintFactory.js"

const DEFAULT_HEADER = { 'Content-Type': 'application/json' }
const saintService = generateInstance()

export const routes = {
  '/saint:get': async (request, response) => {
    const id = Number(request.queryString.id)

    if(isNaN(id) || id === 0)
      return (
        response.writeHead(400, DEFAULT_HEADER),
        response.write(JSON.stringify({ error: 'missing or invalid parameter' })),
        response.end()
      )
    
    const data = await saintService.getSaint()

    return (
      response.writeHead(200, DEFAULT_HEADER),
      response.write(JSON.stringify(data)),
      response.end()
    )
  },
  default: async(request, response) => {
    response.write('Hello, your connection with the API is working')
    response.end()
  }
}