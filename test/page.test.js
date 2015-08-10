
import {expect} from 'chai';
import React from 'react/addons';
import Page from '../src/page';

let TestUtils = React.addons.TestUtils;

describe('<Page />', () => {
  describe('with number', () => {
    let page = <Page number="1" />;
    let component;

    beforeEach(() => {
      component = TestUtils.renderIntoDocument(page);
    });
    it('should set props', () => {
      expect(component.props).to.deep.equal({
        number: '1',
        isActive: false,
        isDisabled: false,
      });
    });
    it('should render tag <li></li>', () => {
      expect(React.findDOMNode(component).tagName).to.equal('LI');
    });
    it('should display number', () => {
      expect(React.findDOMNode(component).textContent).to.equal('1');
    });
    it('should not have any classNames', () => {
      expect(React.findDOMNode(component).className).to.equal('');
    });
  });

  describe('with child content', () => {
    let page = <Page number={100}>Last</Page>;
    let component;

    beforeEach(() => {
      component = TestUtils.renderIntoDocument(page);
    });
    it('should set props', () => {
      expect(component.props).to.deep.equal({
        number: 100,
        children: 'Last',
        isActive: false,
        isDisabled: false,
      });
    });
  });

  describe('with isActive', () => {
    describe('as a boolean', () => {
      let page = <Page number={2} isActive={true}>2</Page>;
      let component;

      beforeEach(() => {
        component = TestUtils.renderIntoDocument(page);
      });

      it('should set props', () => {
        expect(component.props).to.deep.equal({
          number: 2,
          children: '2',
          isActive: true,
          isDisabled: false,
        });
      });
      it('should set className', () => {
        let pageDom = React.findDOMNode(component);
        expect(pageDom.className).to.equal('active');
      });
    });

    describe('as a function', () => {
      function isActive(props) {
        return props.number === 2;
      }
      let page1 = (
        <Page
          number={1}
          isActive={isActive}>
          1
        </Page>
      ), page2 = (
        <Page
          number={2}
          isActive={isActive}>
          2
        </Page>
      );
      let component1, component2;

      beforeEach(() => {
        component1 = TestUtils.renderIntoDocument(page1);
        component2 = TestUtils.renderIntoDocument(page2);
      });
      it('should set isActive as a function', () => {
        expect(typeof component1.props.isActive).to.equal('function');
        expect(typeof component2.props.isActive).to.equal('function');
      });
      it('should set className', () => {
        let pageDom1 = React.findDOMNode(component1);
        let pageDom2 = React.findDOMNode(component2);
        expect(pageDom1.className).to.equal('');
        expect(pageDom2.className).to.equal('active');
      });
    });
  });

  describe('with isDisabled', () => {
    describe('as a boolean', () => {
      let page = <Page number={101} isDisabled={true}>Last</Page>;
      let component;

      beforeEach(() => {
        component = TestUtils.renderIntoDocument(page);
      });

      it('should set props', () => {
        expect(component.props).to.deep.equal({
          number: 101,
          children: 'Last',
          isActive: false,
          isDisabled: true,
        });
      });
      it('should set className', () => {
        let pageDom = React.findDOMNode(component);
        expect(pageDom.className).to.equal('disabled');
      });
    });

    describe('as a function', () => {
      function isDisabled(props) {
        return props.number === 1;
      }
      let page1 = (
        <Page
          number={1}
          isDisabled={isDisabled}>
          First
        </Page>
      ), page2 = (
        <Page
          number={2}
          isDisabled={isDisabled}>
          2
        </Page>
      );
      let component1, component2;

      beforeEach(() => {
        component1 = TestUtils.renderIntoDocument(page1);
        component2 = TestUtils.renderIntoDocument(page2);
      });
      it('should set isDisabled as a function', () => {
        expect(typeof component1.props.isDisabled).to.equal('function');
        expect(typeof component2.props.isDisabled).to.equal('function');
      });
      it('should set className', () => {
        let pageDom1 = React.findDOMNode(component1);
        let pageDom2 = React.findDOMNode(component2);
        expect(pageDom1.className).to.equal('disabled');
        expect(pageDom2.className).to.equal('');
      });
    });
  });

  describe('on click', () => {
    let pageNumber;
    let page = (
      <Page
        number="3"
        onClick={(number) => {
          pageNumber = number;
        }}/>
    );
    let component;

    beforeEach(() => {
      pageNumber = null; // reset
      component = TestUtils.renderIntoDocument(page);
    });
    it('should call page number', (done) => {
      let pageDom = React.findDOMNode(component).getElementsByTagName('A')[0];
      TestUtils.Simulate.click(pageDom);
      expect(pageNumber).to.equal('3');
      done();
    });
  });

  describe('with children', () => {
    let page = <Page number="1">First</Page>;
    let component = TestUtils.renderIntoDocument(page);
    it('should render child', () => {
      expect(React.findDOMNode(component).textContent).to.equal('First');
    });
  });
});
