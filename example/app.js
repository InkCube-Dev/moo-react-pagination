import React from 'react';
import {Paginate} from '../lib/pagination';
import {sigthings} from './data';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      page: 1,
      perPage: 5,
      offset: 0,
      end: 5,
    };
  }
  handleClick(pagination) {
    let {page, offset, end} = pagination;
    this.setState({
      page,
      offset,
      end,
    });
  }
  render() {
    let {offset, end} = this.state;
    let birds = sigthings.slice(offset, end).map((bird, index) => {
      return (
        <tr key={index}>
          <td>{bird.Species.ScientificName}</td>
          <td>{bird.Species.AcceptedCommonName}</td>
          <td className="text-center">{bird.SightingRecords}</td>
        </tr>
      );
    });
    return (
      <div>
        <Paginate
          className="pagination"
          count={sigthings.length}
          initialPage={this.state.page}
          numberCells={7}
          perPage={this.state.perPage}
          onClick={this.handleClick.bind(this)} />
        <table className="birds table">
          <thead>
            <tr>
              <th width="250px">Scientific Name</th>
              <th width="250px">Common Name</th>
              <th width="100px" className="text-center"># Sightings</th>
            </tr>
          </thead>
          <tbody>
            {birds}
          </tbody>
        </table>
      </div>
    );
  }
}

React.render(<App />, document.getElementById('moo-react-pagination'));
