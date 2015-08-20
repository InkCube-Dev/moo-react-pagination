
import React from 'react';
import Page from './page';
import Utility from './utility';

class Paginate extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      page: props.initialPage,
    };
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      page: nextProps.initialPage,
    });
  }

  /**
   * Get previous page
   * @param {Number} [floor] Page floor
   * @return {Number}
   */
  getPreviousPage(floor = 1) {
    let previousPage = this.state.page - 1;
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
  getNextPage(ceiling) {
    let nextPage = this.state.page + 1;
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
  getPageIsActive(pageProps) {
    return pageProps.number === this.state.page;
  }

  /**
   * Determine if page is disabled
   * @param  {Number} page
   * @param  {Object} pageProps property provided by Page
   * @return {Boolean}
   */
  getPageIsDisabled(page, pageProps) {
    return pageProps.number === page;
  }

  /**
   * Calculate offset
   * @return {Number}
   */
  getOffset() {
    return (this.state.page - 1) * this.props.perPage;
  }

  /**
   * Handle click event by passing on to onClick prop if available
   * @param  {Object} event
   */
  handlePageClick(page) {
    this.setState({
      page: page,
    }, () => {
      if (this.props.onClick) {
        let offset = this.getOffset();
        let data = {
          page: this.state.page,
          limit: this.props.perPage,
          offset,
          end: offset + this.props.perPage,
        };
        this.props.onClick(data);
      }
    });
  }

  render() {
    let {page} = this.state;
    let {numberCells, count, perPage} = this.props;
    let totalPages = Utility.calcTotalPages(count, perPage);
    let {startCell, endCell} = Utility.calcStartEndCells(numberCells, page, totalPages);
    let cellNumbers = Utility.generateRange(startCell, endCell);
    let pages = cellNumbers.map((p, index) => {
      return (
        <Page
          number={p}
          key={index}
          isActive={this.getPageIsActive.bind(this)}
          onClick={this.handlePageClick.bind(this)}>
          {p}
        </Page>
      );
    });
    let previousPage = this.getPreviousPage(1);
    let nextPage = this.getNextPage(totalPages);
    return (
      <ul className={this.props.className}>
        <Page
          number={1}
          isDisabled={this.getPageIsDisabled.bind(this, 1)}
          onClick={this.handlePageClick.bind(this)}>{this.props.labels.first || 'First'}</Page>
        <Page
          number={previousPage}
          isDisabled={this.getPageIsDisabled.bind(this, previousPage)}
          onClick={this.handlePageClick.bind(this)}>{this.props.labels.prev || 'Prev'}</Page>
        {pages}
        <Page
          number={nextPage}
          isDisabled={this.getPageIsDisabled.bind(this, nextPage)}
          onClick={this.handlePageClick.bind(this)}>{this.props.labels.next || 'Next'}</Page>
        <Page
          number={totalPages}
          isDisabled={this.getPageIsDisabled.bind(this, totalPages)}
          onClick={this.handlePageClick.bind(this)}>{this.props.labels.last || 'Last'}</Page>
      </ul>
    );
  }
}

Paginate.defaultProps = {
  count: 0,
  initialPage: 1,
  labels: {},
  numberCells: 8,
  perPage: 10,
};

Paginate.propTypes = {
  count: React.PropTypes.number,
  initialPage: React.PropTypes.number,
  labels: React.PropTypes.object,
  numberCells: React.PropTypes.number,
  perPage: React.PropTypes.number,
};

export default Paginate;
