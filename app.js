const express = require('express'),
      app = express(),
      db = require('./config/db'),
      errorhandler = require('errorhandler'),
      cors = require('cors');

const OrderController = require('./src/order/OrderController');
const CustomerController = require('./src/customer/CustomerController');
const API = '/api';

app.use(errorhandler());
app.use(cors());

app.get("/", (req, res) => res.json({message: "Welcome to Borderguru!"}));

app.use('/api-doc', express.static(__dirname + '/doc/apiDoc'));
app.use(API + '/orders', OrderController);
app.use(API + '/customers', CustomerController);

app.response.error = function error(message) {
    this.json({
        status: {
            code: 1,
            error: message
        }
    });
};
app.response.success = function success(content) {
    this.json({
        status: {
            code: 0,
            message: "OK"
        },
        data: content
    });
};

app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  res.json({'errors': {
    message: err.message
  }});
});

module.exports = app;
