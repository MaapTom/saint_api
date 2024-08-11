const routes = require('../routes/routes')
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
  const URLExtract = extractRequest(request)
  const chosen = routes[URLExtract.path] || routes.default
  request.queryString = { id: URLExtract.paramId }
  
  return chosen(request, response).catch(handleError(response))
}

const extractRequest = (request) => {
  const { url, method } = request
  const [ first, route, id ] = url.split('/')
  
  const URLKey = `/${route}:${method.toLowerCase()}`

  return ({
    path: URLKey,
    paramId: id
  })
    
}

module.exports.extractRequest = extractRequest
module.exports.handler = handler