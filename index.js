const express = require('express');

const HubsRouter = require('./hubs/hubs-router');
const WelcomeRouter = require('./welcome/welcome-router');
const server = express();
const port = 4000

server.use(express.json());
server.use('/api/hubs', HubsRouter)
server.use('/', WelcomeRouter)



// add an endpoint that returns all the messages for a hub
// add an endpoint for adding new message to a hub

server.listen(port, () => {
  console.log(`\n*** Server Running on http://localhost:${port} ***\n`);
});
