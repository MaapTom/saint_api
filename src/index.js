const http = require('http')
const { handler } = require('./middleware/router')

const PORT = process.env.PORT

http.createServer(handler)
    .listen(PORT, () => console.log('Server is running at', PORT))