import express from 'express';
import logger from 'morgan';
import bodyParser from 'body-parser';
import forwarded from 'forwarded-for';
import JSON from 'circular-json';

export default function Server() {
  const PORT = 6000;
  const log = console.log;
  const api = express();

  // Setting up the API
  api.use(logger('dev'));
  api.use(bodyParser.urlencoded({
    extended: false,
    type: 'application/x-www-form-urlencoded'
  }));
  api.use(bodyParser.json());
  api.set('view engine', 'pug');
  api.set('trust proxy', 'loopback');

  // API Routes
  api.get('/', (req, res, next) => {
    const address = forwarded(req, req.headers);
    res.render('ip', { title: 'Your IP Address', ip: address.ip});
  });
  api.get('/request', (req, res, next) => {
    res.status(200).send(JSON.stringify(req, null, 2));
  });

  api.listen(PORT, () => log(`REST API listening on port ${PORT}.`));
  return api;
}