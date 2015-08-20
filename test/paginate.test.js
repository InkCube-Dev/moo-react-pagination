
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
        labels: {},
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

  describe('with no count', () => {
    let paginate = <Paginate count={0} />;
    let component = TestUtils.renderIntoDocument(paginate);
    let pageList = React.findDOMNode(component).getElementsByTagName('LI');
    it('should disable first page', () => {
      expect(pageList[0].className).to.equal('disabled');
    });
    it('should disable prev page', () => {
      expect(pageList[1].className).to.equal('disabled');
    });
    it('should disable next page', () => {
      expect(pageList[pageList.length - 2].className).to.equal('disabled');
    });
    it('should disable last page', () => {
      expect(pageList[pageList.length - 1].className).to.equal('disabled');
    });
  });

  describe('with className', () => {
    let paginate = <Paginate className="paginate" />;
    let component = TestUtils.renderIntoDocument(paginate);
    it('should set className', () => {
      expect(React.findDOMNode(component).className).to.equal('paginate');
    });
  });

  describe('with custom labels', () => {
    describe('with custom first page', () => {
      let paginate = <Paginate labels={{first: '<<'}} />;
      let component = TestUtils.renderIntoDocument(paginate);
      let lists = React.findDOMNode(component).getElementsByTagName('LI');
      it('should render custom first page', () => {
        expect(lists[0].textContent).to.equal('<<');
      });
    });
    describe('with custom prev page', () => {
      let paginate = <Paginate labels={{prev: '<'}} />;
      let component = TestUtils.renderIntoDocument(paginate);
      let lists = React.findDOMNode(component).getElementsByTagName('LI');
      it('should render custom prev page', () => {
        expect(lists[1].textContent).to.equal('<');
      });
    });
    describe('with custom next page', () => {
      let paginate = <Paginate labels={{next: '>'}} />;
      let component = TestUtils.renderIntoDocument(paginate);
      let lists = React.findDOMNode(component).getElementsByTagName('LI');
      it('should render custom next page', () => {
        expect(lists[lists.length - 2].textContent).to.equal('>');
      });
    });
    describe('with custom last page', () => {
      let paginate = <Paginate labels={{last: '>>'}} />;
      let component = TestUtils.renderIntoDocument(paginate);
      let lists = React.findDOMNode(component).getElementsByTagName('LI');
      it('should render custom last page', () => {
        expect(lists[lists.length - 1].textContent).to.equal('>>');
      });
    });
  });

  describe('on click', () => {
    let pageNumber, limit, offset, end;
    let paginate = (
      <Paginate
        count={100}
        perPage={10}
        onClick={(page) => {
          pageNumber = page.page;
          limit = page.limit;
          offset = page.offset;
          end = page.end;
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
    it('should call limit', (done) => {
      expect(limit).to.equal(10);
      done();
    });
    it('should call offset', (done) => {
      expect(offset).to.equal(20);
      done();
    });
    it('should call end', (done) => {
      expect(end).to.equal(30);
      done();
    });
  });
});
