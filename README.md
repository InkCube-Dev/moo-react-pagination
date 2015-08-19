# MOO Pagination Component for React
Pagination Component for React.js. View example [here](http://moocommerce.github.io/moo-react-pagination/).

## Getting started
1. Install package `npm install moo-react-pagination`.
2. Import package into project file with `import {Paginate} from 'moo-react-pagination';`
3. Use Component in project. Here is an example:

```javascript
import React from 'react';
import {Paginate} from 'moo-react-pagination';
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
          <td>{bird.SightingRecords}</td>
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
              <th>Scientific Name</th>
              <th>Common Name</th>
              <th># Sightings</th>
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
```

## API Documentation
#### count
Length of data.

| propType   | isRequired | defaultProp |
|------------|------------|-------------|
| `Number`   | `false`    | 0           |


### initialPage
Initial start page.

| propType   | isRequired | defaultProp |
|------------|------------|-------------|
| `Number`   | `false`    | 1           |

#### labels
Overwrite default label values.

Example:

```javascript
<Paginate
  count={100}
  labels={{first: '<<', prev: '<', next: '>', last: '>>'}} />
```

| propType   | isRequired |
|------------|------------|
| `Object`   | `false`    |


### numberCells
Number of numbered page cells to show in pagination list.

| propType   | isRequired | defaultProp |
|------------|------------|-------------|
| `Number`   | `false`    | 8           |

### perPage
Results per page.

| propType   | isRequired | defaultProp |
|------------|------------|-------------|
| `Number`   | `false`    | 10          |


## Customize Moo Pagination for React
1. Clone this repository.
2. Run `npm install`.
3. Start hacking.
3. Recompile by running `npm run compile`.

## Run Tests
Run `npm test`.

*Note: test uses JSDOM which requires [io.js](https://iojs.org/en/index.html)*
