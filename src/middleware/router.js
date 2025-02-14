const routes = require('../routes/routes')
const DEFAULT_HEADER = {
  'Content-Type': 'application/json',
}

const handleError = response => {
  return error => {
    response.writeHead(500, DEFAULT_HEADER)
    response.write(JSON.stringify({ error: 'Internal Server Error!' }))
    response.end()
    console.error(error)
  }
}

const handler = (request, response) => {
  const allowedOrigins = ["http://localhost:8888", "http://10.0.1.11:8888"];

  if(allowedOrigins.includes(request.headers.origin)) {
    response.setHeader('Access-Control-Allow-Origin', request.headers.origin)
    response.setHeader('Access-Control-Allow-Headers', '*')
  }

  const URLExtract = extractRequest(request)
  const chosen = routes[URLExtract.path] || routes.default
  request.queryString = { param: URLExtract.param }
  
  return chosen(request, response).catch(handleError(response))
}

const extractRequest = (request) => {
  const { url, method } = request
  const [ first, route, param ] = url.split('/')
  
  const URLKey = `/${route}:${method.toLowerCase()}`
  return ({
    path: URLKey,
    param: param
  })
    
}

module.exports.extractRequest = extractRequest
module.exports.handler = handler