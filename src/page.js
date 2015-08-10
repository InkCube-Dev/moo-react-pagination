
import React from 'react';

class Page extends React.Component {

  /**
   * Get class name
   * @return {String}
   */
  getClassName(options) {
    let className = '';
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
  getActiveStatus() {
    if (typeof this.props.isActive === 'function') {
      return this.props.isActive(this.props);
    }
    return this.props.isActive;
  }

  /**
   * Get disabled status
   * @return {Boolean}
   */
  getDisabledStatus() {
    if (typeof this.props.isDisabled === 'function') {
      return this.props.isDisabled(this.props);
    }
    return this.props.isDisabled;
  }

  /**
   * Handle click event by passing on to onClick prop if available
   * @param  {Object} event
   */
  handleClick(event) {
    event.preventDefault();
    if (this.props.onClick) {
      this.props.onClick(this.props.number);
    }
  }

  render() {
    let isDisabled = this.getDisabledStatus();
    let isActive = this.getActiveStatus();
    return (
      <li
        className={this.getClassName({isDisabled, isActive})}>
        <a
          onClick={this.handleClick.bind(this)}
          style={!isDisabled ? {cursor: 'pointer'} : {}}
          disabled={isDisabled}>
          {this.props.children || this.props.number}
        </a>
      </li>
    );
  }
}

Page.propTypes = {
  number: React.PropTypes.oneOfType([
    React.PropTypes.string,
    React.PropTypes.number,
  ]).isRequired,
  onClick: React.PropTypes.func,
  isActive: React.PropTypes.oneOfType([
    React.PropTypes.bool,
    React.PropTypes.func,
  ]),
  isDisabled: React.PropTypes.oneOfType([
    React.PropTypes.bool,
    React.PropTypes.func,
  ]),
};

Page.defaultProps = {
  isActive: false,
  isDisabled: false,
};

export default Page;
