'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x2, _x3, _x4) { var _again = true; _function: while (_again) { var object = _x2, property = _x3, receiver = _x4; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x2 = parent; _x3 = property; _x4 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _page = require('./page');

var _page2 = _interopRequireDefault(_page);

var _utility = require('./utility');

var _utility2 = _interopRequireDefault(_utility);

var Paginate = (function (_React$Component) {
  _inherits(Paginate, _React$Component);

  function Paginate(props) {
    _classCallCheck(this, Paginate);

    _get(Object.getPrototypeOf(Paginate.prototype), 'constructor', this).call(this, props);
    this.state = {
      page: props.initialPage
    };
  }

  _createClass(Paginate, [{
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      this.setState({
        page: nextProps.initialPage
      });
    }

    /**
     * Get previous page
     * @param {Number} [floor] Page floor
     * @return {Number}
     */
  }, {
    key: 'getPreviousPage',
    value: function getPreviousPage() {
      var floor = arguments.length <= 0 || arguments[0] === undefined ? 1 : arguments[0];

      var previousPage = this.state.page - 1;
      if (previousPage < floor) {
        previousPage = floor;
      }
      return previousPage;
    }

    /**
     * Get next page
     * @param {Number} [ceiling] Page ceiling
     * @return {Number}
     */
  }, {
    key: 'getNextPage',
    value: function getNextPage(ceiling) {
      var nextPage = this.state.page + 1;
      if (nextPage > ceiling) {
        nextPage = ceiling;
      }
      return nextPage;
    }

    /**
     * Determine if page is active
     * @param  {Object} pageProps Properties from page
     * @return {Boolean}
     */
  }, {
    key: 'getPageIsActive',
    value: function getPageIsActive(pageProps) {
      return pageProps.number === this.state.page;
    }

    /**
     * Determine if page is disabled
     * @param  {Object} pageProps
     * @return {Boolean}
     */
  }, {
    key: 'getPageIsDisabled',
    value: function getPageIsDisabled(pageProps) {
      return pageProps.number === this.state.page;
    }

    /**
     * Calculate offset
     * @return {Number}
     */
  }, {
    key: 'getOffset',
    value: function getOffset() {
      return (this.state.page - 1) * this.props.perPage;
    }

    /**
     * Handle click event by passing on to onClick prop if available
     * @param  {Object} event
     */
  }, {
    key: 'handlePageClick',
    value: function handlePageClick(page) {
      var _this = this;

      this.setState({
        page: page
      }, function () {
        if (_this.props.onClick) {
          var offset = _this.getOffset();
          var data = {
            page: _this.state.page,
            limit: _this.props.perPage,
            offset: offset,
            end: offset + _this.props.perPage
          };
          _this.props.onClick(data);
        }
      });
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      var page = this.state.page;
      var _props = this.props;
      var numberCells = _props.numberCells;
      var count = _props.count;
      var perPage = _props.perPage;

      var totalPages = _utility2['default'].calcTotalPages(count, perPage);

      var _Utility$calcStartEndCells = _utility2['default'].calcStartEndCells(numberCells, page, totalPages);

      var startCell = _Utility$calcStartEndCells.startCell;
      var endCell = _Utility$calcStartEndCells.endCell;

      var cellNumbers = _utility2['default'].generateRange(startCell, endCell);
      var pages = cellNumbers.map(function (p, index) {
        return _react2['default'].createElement(
          _page2['default'],
          {
            number: p,
            key: index,
            isActive: _this2.getPageIsActive.bind(_this2),
            onClick: _this2.handlePageClick.bind(_this2) },
          p
        );
      });
      return _react2['default'].createElement(
        'ul',
        { className: this.props.className },
        _react2['default'].createElement(
          _page2['default'],
          {
            number: 1,
            isDisabled: this.getPageIsDisabled.bind(this),
            onClick: this.handlePageClick.bind(this) },
          this.props.labels.first || 'First'
        ),
        _react2['default'].createElement(
          _page2['default'],
          {
            number: this.getPreviousPage(1),
            isDisabled: this.getPageIsDisabled.bind(this),
            onClick: this.handlePageClick.bind(this) },
          this.props.labels.prev || 'Prev'
        ),
        pages,
        _react2['default'].createElement(
          _page2['default'],
          {
            number: this.getNextPage(totalPages),
            isDisabled: this.getPageIsDisabled.bind(this),
            onClick: this.handlePageClick.bind(this) },
          this.props.labels.next || 'Next'
        ),
        _react2['default'].createElement(
          _page2['default'],
          {
            number: totalPages,
            isDisabled: this.getPageIsDisabled.bind(this),
            onClick: this.handlePageClick.bind(this) },
          this.props.labels.next || 'Last'
        )
      );
    }
  }]);

  return Paginate;
})(_react2['default'].Component);

Paginate.defaultProps = {
  count: 0,
  initialPage: 1,
  labels: {},
  numberCells: 8,
  perPage: 10
};

Paginate.propTypes = {
  count: _react2['default'].PropTypes.number,
  initialPage: _react2['default'].PropTypes.number,
  labels: _react2['default'].PropTypes.object,
  numberCells: _react2['default'].PropTypes.number,
  perPage: _react2['default'].PropTypes.number
};

exports['default'] = Paginate;
module.exports = exports['default'];