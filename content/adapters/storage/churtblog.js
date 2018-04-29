'use strict';

var BaseAdapter = require('ghost-storage-base');

class MyCustomAdapter extends BaseAdapter{
  constructor() {
    super();
  }

  exists() {

  }

  save() {

  }

  serve() {
    return function customServe(req, res, next) {
      next();
    }
  }

  delete() {

  }

  read() {

  }
}

module.exports = MyCustomAdapter;