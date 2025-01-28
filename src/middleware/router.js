const routes = require('../routes/routes')
const DEFAULT_HEADER = { 'Content-Type': 'application/json' }

const handleError = response => {
  return error => {
    response.write(JSON.stringify({ error: 'Internal Server Error!' }))
    response.writeHead(500, DEFAULT_HEADER)
    response.end()
    console.error(error)
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