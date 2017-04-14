import React from 'react';
import TestUtils from 'react-addons-test-utils'
import ReactDOM from 'react-dom';
import App from './App';

describe('App tests', ()=>{
  it('renders without crashing', () => {
    const div = document.createElement('div')    
    ReactDOM.render(<App/>, div)
  })
  it('renders welcome message', () => {
      const wrapper = TestUtils.renderIntoDocument(<App />)
      let h2 = TestUtils.findRenderedDOMComponentWithTag(wrapper, 'h2')
      expect(ReactDOM.findDOMNode(h2).textContent).toMatch('Welcome')
  })
});
