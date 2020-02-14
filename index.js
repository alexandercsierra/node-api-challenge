const express = require('express');
const server = express();
const apiRouter = require('./api/apiRouter')

server.use(express.json());
server.use('/api', logger, apiRouter);

server.get('/', (req, res)=>{
    res.send('<h1>Welcome to the Sprint Challenge</h1>')
})


function logger(req, res, next) {
    console.log(`${req.method} request to ${req.originalUrl}`)
    next();
}

port = process.env.PORT || 5000;
server.listen(port, ()=>console.log(`listening on port ${port}`))