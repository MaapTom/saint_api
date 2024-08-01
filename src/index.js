import http from 'http'
import { routes } from './routes/routes.js'

const PORT = process.env.PORT
const DEFAULT_HEADER = { 'Content-Type': 'application/json' }

const handleError = response => {
  return error => {
    console.error(error)
    response.writeHead(500, DEFAULT_HEADER)
    response.write(JSON.stringify({ error: 'Internal Server Error!' }))
    response.end()
  }
}

const handler = (request, response) => {
  const { url, method } = request
  const [ first, route, id ] = url.split('/')
  request.queryString = { id: id }

  const key = `/${route}:${method.toLowerCase()}`

  const chosen = routes[key] || routes.default
  return chosen(request, response).catch(handleError(response))
}

http.createServer(handler)
    .listen(PORT, () => console.log('Server is running at', PORT))