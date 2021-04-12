import bodyParser from 'body-parser';
import cors from 'cors';
import express from 'express';
import http from 'http';
import WebSocket from 'ws';

import config from './config/config';
import logging from './config/logging';
import PokemonRoutes from './routes/pokemon-routes';

import './config/mongodb.config';

const NAMESPACE = 'Server';
const router = express();


router.use((req, res, next) => {
  logging.info(NAMESPACE, `METHOD - [${req.method}], URL - [${req.url}], IP - [${req.socket.remoteAddress}]`);
  
  res.on('finish', () => {
    logging.info(NAMESPACE, `METHOD - [${req.method}], URL - [${req.url}], IP - [${req.socket.remoteAddress}], STATUS - [${req.statusCode}]`);
  });

  next();
});

router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());
router.use(cors());

router.use('/pokemons', PokemonRoutes);

const httpServer = http.createServer(router);
const wss = new WebSocket.Server({ server: httpServer });

httpServer.listen(config.server.port, () => logging.info(NAMESPACE, `Server running on ${config.server.hostname} ${config.server.port}`));

wss.on('connection', function connection(ws) {

  ws.send('Welcome new client')

  ws.on('message', function incoming(message) {
    ws.send(`Got your message: ${message}`);
  });
});
