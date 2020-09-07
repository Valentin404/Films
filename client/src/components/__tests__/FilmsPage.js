import React, { Component } from "react";
import ReactDOM from 'react-dom'
import FilmsPage from '../FilmsPage'
import {MemoryRouter as Router} from "react-router-dom";
import {render} from '@testing-library/react'

import "@testing-library/jest-dom/extend-expect";


// test('loginForm', ()=>{
   
//     const {debug} = render(<Router><FilmsPage location={{pathname: '/'}}/></Router>)
//     debug()
// })





// jest.mock('../FilmsPage');
// const mockHistory = {push: jest.fn()}
// // const location = {pathname: '/'};
// // location={location}
// test('isLoading not bool', async ()=> {
//     const ComponentFilmsPage = render(<Router><FilmsPage/></Router>)
//     console.log(ComponentFilmsPage)
//     expect(ComponentFilmsPage).toMatchSnapshot()


//     expect(mockHistory.push).toHaveBeenCalledTimes(1)
//     expect(mockHistory.push).toHaveBeenCalledWith('/')
// })





jest.mock('../FilmsPage');
const mockLogin = jest.fn();
const mockHistory = {push: jest.fn()}

// const location = {pathname: '/'};
// login={mockLogin} history={mockHistory}
// location={location} 

test('test', async ()=>{
    const {container , debug} = render(
        <Router>
            <FilmsPage  login={mockLogin} history={mockHistory}/>
        </Router>
    )
    debug()
    expect(container).toMatchSnapshot()
})










// it("Component should call componentWillReceiveProps on update", () => {
//     const spy = sinon.spy(Component.prototype, "componentWillReceiveProps");
//     const wrapper = shallow(<Component {...props} />);

//     expect(spy.calledOnce).to.equal(false);
//     wrapper.setProps({ prop: 2 });
//     expect(spy.calledOnce).to.equal(true);
// });

























// import {axe, toHaveNoViolations} from 'jest-axe'

// expect.extend(toHaveNoViolations)

// test('signup form must be accessible', async () => {
//     // const result = await axe(container)
//     expect(result).toHaveNoViolations()
// })
