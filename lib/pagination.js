'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _paginate = require('./paginate');

var _paginate2 = _interopRequireDefault(_paginate);

var _page = require('./page');

var _page2 = _interopRequireDefault(_page);

exports['default'] = { Paginate: _paginate2['default'], Page: _page2['default'] };
module.exports = exports['default'];