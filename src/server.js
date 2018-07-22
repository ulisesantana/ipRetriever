import express from 'express';
import logger from 'morgan';
import bodyParser from 'body-parser';
import requestIp from 'request-ip';


export default function Server() {
  const PORT = 3000;
  const log = console.log;
  const api = express();

  // Setting up the API
  api.use(logger('dev'));
  api.use(requestIp.mw());
  api.use(bodyParser.urlencoded({
    extended: false,
    type: 'application/x-www-form-urlencoded'
  }));
  api.use(bodyParser.json());
  api.set('view engine', 'pug');

  // API Routes
  api.get('/', (req, res, next) => {
    res.render('ip', { title: 'Your IP Address', ip: req.clientIp});
  });

  api.listen(PORT, () => log(`REST API listening on port ${PORT}.`));
  return api;
}