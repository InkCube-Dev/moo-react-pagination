'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var Page = (function (_React$Component) {
  _inherits(Page, _React$Component);

  function Page() {
    _classCallCheck(this, Page);

    _get(Object.getPrototypeOf(Page.prototype), 'constructor', this).apply(this, arguments);
  }

  _createClass(Page, [{
    key: 'getClassName',

    /**
     * Get class name
     * @return {String}
     */
    value: function getClassName(options) {
      var className = '';
      if (options.isActive) {
        className += 'active ';
      }
      if (options.isDisabled) {
        className += 'disabled ';
      }
      className = className.slice(0, -1);
      return className;
    }

    /**
     * Get active status
     * @return {Boolean}
     */
  }, {
    key: 'getActiveStatus',
    value: function getActiveStatus() {
      if (typeof this.props.isActive === 'function') {
        return this.props.isActive(this.props);
      }
      return this.props.isActive;
    }

    /**
     * Get disabled status
     * @return {Boolean}
     */
  }, {
    key: 'getDisabledStatus',
    value: function getDisabledStatus() {
      if (typeof this.props.isDisabled === 'function') {
        return this.props.isDisabled(this.props);
      }
      return this.props.isDisabled;
    }

    /**
     * Handle click event by passing on to onClick prop if available
     * @param  {Object} event
     */
  }, {
    key: 'handleClick',
    value: function handleClick(event) {
      event.preventDefault();
      if (this.props.onClick) {
        this.props.onClick(this.props.number);
      }
    }
  }, {
    key: 'render',
    value: function render() {
      var isDisabled = this.getDisabledStatus();
      var isActive = this.getActiveStatus();
      return _react2['default'].createElement(
        'li',
        {
          className: this.getClassName({ isDisabled: isDisabled, isActive: isActive }),
          style: this.props.style },
        _react2['default'].createElement(
          'a',
          {
            onClick: this.handleClick.bind(this),
            style: !isDisabled ? { cursor: 'pointer' } : {},
            disabled: isDisabled },
          this.props.children || this.props.number
        )
      );
    }
  }]);

  return Page;
})(_react2['default'].Component);

Page.propTypes = {
  number: _react2['default'].PropTypes.oneOfType([_react2['default'].PropTypes.string, _react2['default'].PropTypes.number]).isRequired,
  onClick: _react2['default'].PropTypes.func,
  isActive: _react2['default'].PropTypes.oneOfType([_react2['default'].PropTypes.bool, _react2['default'].PropTypes.func]),
  isDisabled: _react2['default'].PropTypes.oneOfType([_react2['default'].PropTypes.bool, _react2['default'].PropTypes.func])
};

Page.defaultProps = {
  isActive: false,
  isDisabled: false,
  style: {}
};

exports['default'] = Page;
module.exports = exports['default'];