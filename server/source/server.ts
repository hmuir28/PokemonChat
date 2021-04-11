import bodyParser from 'body-parser';
import config from './config/config';
import express from 'express';
import http from 'http';
import logging from './config/logging';
import WebSocket from 'ws';

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

router.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');

  if (req.method === 'OPTIONS') {
    res.header('Access-Control-Allow-Methods', 'GET PATCH DELETE POST PUT');
    return res.status(200).json({});
  }

  next();
});

router.use((req, res, next) => {
  const error = new Error('not found');

  return res.status(404).json({
    message: error.message,
  });
});

const httpServer = http.createServer(router);
const wss = new WebSocket.Server({ server: httpServer });

httpServer.listen(config.server.port, () => logging.info(NAMESPACE, `Server running on ${config.server.hostname} ${config.server.port}`));

wss.on('connection', function connection(ws) {

  ws.send('Welcome new client')

  ws.on('message', function incoming(message) {
    console.log('message: %s', message);
    console.log('<<<<<<<<<');
    ws.send(`Got your message: ${message}`);
  });
});
