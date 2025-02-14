const { generateInstance } = require("../factories/saintFactory.js")

const DEFAULT_HEADER = { 
  'Content-Type': 'application/json',
}
const saintService = generateInstance()

const routes = {
  '/saint:get': async (request, response) => {
    const id = Number(request.queryString.param)

    if(isNaN(id) || id === 0)
      return (
        response.writeHead(400, DEFAULT_HEADER),
        response.write(JSON.stringify({ error: 'missing or invalid parameter' })),
        response.end()
      )
    
    const data = await saintService.getSaint(id) ?? false;
    
    if(!data) {
      return (
        response.writeHead(404, DEFAULT_HEADER),
        response.write(JSON.stringify({ error: 'Saint not found' })),
        response.end()
      )
    };

    return (
      response.writeHead(200, DEFAULT_HEADER),
      response.write(JSON.stringify(data)),
      response.end()
    )
  },
  '/list:get': async(request, response) => {
    const date = request.queryString.param.split('-');
    const isDateValid = new Date(`${date[1]}/${date[0]}/2000`);

    if(isNaN(isDateValid) || !date) {
      return (
        response.writeHead(400, DEFAULT_HEADER),
        response.write(JSON.stringify({ error: 'missing or invalid parameter' })),
        response.end()
      )
    }

    const data = await saintService.listSaintsBy(isDateValid.getDate(), isDateValid.getMonth() + 1) ?? false;

    if(!data) {
      return (
        response.writeHead(404, DEFAULT_HEADER),
        response.write(JSON.stringify({ error: 'There any saints in this date' })),
        response.end()
      )
    }

    return (
      response.writeHead(200, DEFAULT_HEADER),
      response.write(JSON.stringify(data)),
      response.end()
    )

  },
  '/:get': async(request, response) => {
    response.write('Hello, your connection with the API is working')
    response.end()
  },
  default: async(request, response) => {
    response.writeHead(400, DEFAULT_HEADER),
    response.write("Bad Request, you've tryed to access: " + request.url + " with method: " + request.method)
    response.end()
  }
}

module.exports = routes