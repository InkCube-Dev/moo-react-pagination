# MOO Pagination Component for React
Pagination Component for React.js. View example [here](http://moocommerce.github.io/moo-react-pagination/).

## Getting started
1. Install package `npm install moo-react-pagination`.
2. Import package into project file with `import {Paginate} from 'moo-react-pagination';`
3. Use Component in project. Here is an example:

  ```javascript
  import React from 'react';
  import {Paginate} from 'moo-react-pagination';

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
  ```

## API Documentation
### Labels
Use `labels` prop to customize labels.

```javascript
<Paginate
  count={100}
  labels={{first: '<<', prev: '<', next: '>', last: '>>'}} />
```

## Customize Moo Pagination for React
1. Clone this repository.
2. Run `npm install`.
3. Start hacking.
3. Recompile by running `npm run compile`.

## Run Tests
Run `npm test`.

*Note: test uses JSDOM which requires [io.js](https://iojs.org/en/index.html)*
