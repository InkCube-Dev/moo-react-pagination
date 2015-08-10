
import React from 'react';
import {Paginate} from '../lib/pagination';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      page: 1,
    };
  }
  handleClick(pagination) {
    this.setState({
      page: pagination.page,
    });
  }
  render() {
    return (
      <Paginate
        className='pagination'
        count={100}
        initialPage={this.state.page}
        numberCells={7}
        onClick={this.handleClick.bind(this)} />
    );
  }
}

React.render(<App />, document.getElementById('moo-react-pagination'));
