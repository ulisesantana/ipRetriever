'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = Server;

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _morgan = require('morgan');

var _morgan2 = _interopRequireDefault(_morgan);

var _bodyParser = require('body-parser');

var _bodyParser2 = _interopRequireDefault(_bodyParser);

var _requestIp = require('request-ip');

var _requestIp2 = _interopRequireDefault(_requestIp);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function Server() {
  const PORT = 4000;
  const log = console.log;
  const api = (0, _express2.default)();

  // Setting up the API
  api.use((0, _morgan2.default)('dev'));
  api.use(_requestIp2.default.mw());
  api.use(_bodyParser2.default.urlencoded({
    extended: false,
    type: 'application/x-www-form-urlencoded'
  }));
  api.use(_bodyParser2.default.json());
  api.set('view engine', 'pug');

  // API Routes
  api.get('/', (req, res, next) => {
    res.render('ip', { title: 'Your IP Address', ip: req.clientIp });
  });

  api.listen(PORT, () => log(`REST API listening on port ${PORT}.`));
  return api;
}