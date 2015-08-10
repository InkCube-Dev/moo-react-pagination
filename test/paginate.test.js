
import {expect} from 'chai';
import React from 'react/addons';
import Paginate from '../src/paginate';

let TestUtils = React.addons.TestUtils;

describe('<Paginate />', () => {
  describe('with count', () => {
    let paginate = <Paginate count={100} />;
    let component;

    beforeEach(() => {
      component = TestUtils.renderIntoDocument(paginate);
    });
    it('should set props', () => {
      expect(component.props).to.deep.equal({
        count: 100,
        initialPage: 1,
        perPage: 10,
        numberCells: 8,
      });
    });
    it('should set default page state', () => {
      expect(component.state.page).to.equal(1);
    });
    it('should render tag <ul></ul>', () => {
      expect(React.findDOMNode(component).tagName).to.equal('UL');
    });
    it('should render list of pages', () => {
      expect(React.findDOMNode(component).getElementsByTagName('LI').length)
        .to.equal(12);
    });
    it('should render first page', () => {
      expect(React.findDOMNode(component)
        .getElementsByTagName('LI')[0].textContent).to.equal('First');
    });
    it('should render last page', () => {
      let pageList = React.findDOMNode(component).getElementsByTagName('LI');
      expect(pageList[pageList.length - 1].textContent).to.equal('Last');
    });
    it('should render previous page', () => {
      expect(React.findDOMNode(component)
        .getElementsByTagName('LI')[1].textContent).to.equal('Prev');
    });
    it('should render next page', () => {
      let pageList = React.findDOMNode(component).getElementsByTagName('LI');
      expect(pageList[pageList.length - 2].textContent).to.equal('Next');
    });
    it('should set active page', () => {
      let pageList = React.findDOMNode(component).getElementsByTagName('LI');
      expect(pageList[2].className).to.equal('active'); // page 1
    });
    it('should not set active status to non-active pages', () => {
      let pageList = React.findDOMNode(component).getElementsByTagName('LI');
      for (let i in pageList) {
        if (i < 2 || i > 2) {
          expect(pageList[i].className).to.not.contain('active');
        }
      }
    });
    it('should disable first & previous page', () => {
      let pageList = React.findDOMNode(component).getElementsByTagName('LI');
      expect(pageList[0].className).to.equal('disabled'); // first page
      expect(pageList[1].className).to.equal('disabled'); // previous page
    });
    it('should not disable non-active pages', () => {
      let pageList = React.findDOMNode(component).getElementsByTagName('LI');
      for (let i in pageList) {
        if (i > 2) {
          expect(pageList[i].getAttribute('disabled')).to.equal(null);
        }
      }
    });
  });

  describe('with className', () => {
    let paginate = <Paginate className="paginate" />;
    let component = TestUtils.renderIntoDocument(paginate);
    it('should set className', () => {
      expect(React.findDOMNode(component).className).to.equal('paginate');
    });
  });

  describe('on click', () => {
    let pageNumber;
    let paginate = (
      <Paginate
        count={100}
        perPage={10}
        onClick={(page) => {
          pageNumber = page.page;
        }}/>
    );
    let component;

    beforeEach(() => {
      pageNumber = null; // reset
      component = TestUtils.renderIntoDocument(paginate);
    });
    it('should call page number', (done) => {
      let pageDoms = React.findDOMNode(component).getElementsByTagName('A');
      TestUtils.Simulate.click(pageDoms[4]); // Click page 3
      expect(pageNumber).to.equal(3);
      done();
    });
  });
});
